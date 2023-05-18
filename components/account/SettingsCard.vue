<template>
  <div v-if="!errorMessage" class="settings-card">
    <h4 class="settings-card__header">{{ $t('custom.myData') }}</h4>
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
      <p>{{ $t('form.password') }}</p>
      <p>{{ '*'.repeat(12) }}</p>
      <p
        class="settings-card__action settings-card__action--text"
        @click="isChangePasswordModalVisible = true"
      >
        {{ t('changePassword') }}
      </p>
    </div>

    <div v-if="userConsentsDto">
      <AccountConsentsList
        :value="userConsentsDto"
        :force-required="true"
        :show-save-btn="true"
        @error="(e) => (errorMessage = formatError(e))"
        @submit="saveConsent"
      />
    </div>
    <div class="settings-card__delete-account" @click="isDeleteAccountModalVisible = true">
      {{ $t('custom.deleteAccount') }}
    </div>
  </div>

  <LayoutInfoBox v-if="errorMessage" type="danger" class="settings-card__error">
    {{ errorMessage }}
  </LayoutInfoBox>

  <AccountEditNameModal v-model:open="isEditNameModalVisible" />
  <AccountChangePasswordModal v-model:open="isChangePasswordModalVisible" />
  <AccountDeleteAccountModal v-model:open="isDeleteAccountModalVisible" />
</template>

<i18n lang="json">
{
  "pl": {
    "changePassword": "Zmień hasło",
    "sucessUpdate": "Zaktualizowano zgody użytkownika."
  }
}
</i18n>

<script setup lang="ts">
import { UserConsentDto } from '@heseya/store-core'
import PencilLine from '@/assets/icons/pencil-line-filled.svg?component'
import { useUserStore } from '@/store/user'

const t = useLocalI18n()
const { t: $t } = useI18n({ useScope: 'global' })
const formatError = useErrorMessage()
const { notify } = useNotify()
const heseya = useHeseya()
const userStore = useUserStore()

const errorMessage = ref('')

const user = useUser()

const isEditNameModalVisible = ref<boolean>(false)
const isChangePasswordModalVisible = ref<boolean>(false)
const isDeleteAccountModalVisible = ref<boolean>(false)

const userConsentsDto = ref<UserConsentDto>({})
const saveConsent = async (consents: UserConsentDto) => {
  try {
    const user = await heseya.UserProfile.update({ consents })
    userStore.setUser(user)
    userConsentsDto.value = consents
    notify({
      title: t('sucessUpdate'),
      type: 'success',
    })
  } catch (e) {
    errorMessage.value = formatError(e)
  }
}

onMounted(() => {
  userConsentsDto.value =
    user.value?.consents.reduce(
      (acc, item) => ({ ...acc, [item.id]: item.value }),
      {} as UserConsentDto,
    ) || {}
})
</script>
<style lang="scss" scoped>
.settings-card {
  display: grid;
  gap: 10px;

  &__header {
    font-size: 16px;
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

    @media ($max-viewport-12) {
      font-size: 16px;
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
