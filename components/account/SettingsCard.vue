<template>
  <div v-if="!errorMessage" class="settings-card">
    <h4 class="settings-card__header">Moje dane</h4>
    <div class="settings-card__container">
      <p>{{ user?.name }}</p>
      <p>{{ user?.email }}</p>
      <LayoutIcon
        class="settings-card__action"
        :icon="PencilLine"
        @click="isEditNameModalVisible = true"
      />
    </div>
    <div class="settings-card__container">
      <p>{{ t('password') }}</p>
      <p>{{ '*'.repeat(12) }}</p>
      <p
        class="settings-card__action settings-card__action--text"
        @click="isChangePasswordModalVisible = true"
      >
        Zmień hasło
      </p>
    </div>

    <div>
      <FormCheckbox
        v-for="consent in consents"
        :key="consent.id"
        :model-value="
          user?.consents.find((userConsent) => userConsent.id === consent.id)?.value || false
        "
        :name="consent.name"
        :rules="consent.required ? 'required' : ''"
        :disabled="user?.consents.find((userConsent) => userConsent.id === consent.id)?.value"
        @update:model-value="(v) => setConsentValue(consent.id, v)"
      >
        <span v-html="consent.description_html"></span>
      </FormCheckbox>
      <LayoutButton v-if="isAnyConsentsNotRequired" class="settings-card__button"
        >Zapisz Zgody</LayoutButton
      >
    </div>
    <div class="settings-card__delete-account" @click="isDeleteAccountModalVisible = true">
      Usuń Konto
    </div>
  </div>

  <LayoutInfoBox v-if="errorMessage" type="danger" class="settings-card__error">
    {{ errorMessage }}
  </LayoutInfoBox>

  <AccountEditNameModal v-if="user" v-model:open="isEditNameModalVisible" :user="user" />
  <AccountChangePasswordModal v-model:open="isChangePasswordModalVisible" />
  <AccountDeleteAccountModal v-model:open="isDeleteAccountModalVisible" />
</template>

<i18n lang="json">
{
  "pl": {
    "password": "Hasło"
  }
}
</i18n>

<script setup lang="ts">
import { formatApiError } from '@heseya/store-core'
import PencilLine from '@/assets/icons/pencil-line-filled.svg?component'

const t = useLocalI18n()
const heseya = useHeseya()

const errorMessage = ref('')

const user = useUser()

const isEditNameModalVisible = ref<boolean>(false)
const isChangePasswordModalVisible = ref<boolean>(false)
const isDeleteAccountModalVisible = ref<boolean>(false)

const { data: consents } = useAsyncData('consents', async () => {
  try {
    const consents = await heseya.Consents.get()
    return consents.data
  } catch (e: any) {
    errorMessage.value = formatApiError(e).text
  }
})

const setConsentValue = (consentId: string, value: boolean) => {
  if (user.value) {
    const consent = user.value.consents.find((userConsent) => userConsent.id === consentId)
    if (consent) consent.value = value
  }
}

const isAnyConsentsNotRequired = computed(
  () => !!consents.value?.filter((consent) => !consent.required).length,
)
</script>
<style lang="scss" scoped>
.settings-card {
  display: grid;
  gap: 10px;

  &__header {
    margin-top: 10px;
  }

  &__button {
    width: max-content;
  }

  &__container {
    border: 1px solid $gray-color-300;
    padding: 16px;
    position: relative;
  }

  &__delete-account {
    margin-top: 10px;
    font-weight: bold;
    text-decoration: underline;
    cursor: pointer;
    width: fit-content;

    &:hover {
      opacity: 0.7;
    }
  }

  &__action {
    cursor: pointer;
    color: $blue-color;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(-30%, -35%);

    &:hover {
      opacity: 0.7;
    }

    &--text {
      text-decoration: underline;
      font-size: 12px;
    }
  }

  &__error {
    color: $error-color;
    font-weight: bold;
    text-align: center;
  }
}
</style>
