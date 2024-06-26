<template>
  <div class="settings-card">
    <h4 class="settings-card__header">{{ $t('account.myData') }}</h4>

    <div class="settings-card__container">
      <p>{{ user?.name }}</p>
      <p>{{ user?.email }}</p>

      <div class="settings-card__row settings-card__row--small">
        <p v-if="user?.phone">
          <img :src="PhoneIcon" class="settings-card__icon" loading="lazy" />
          {{ user?.phone }}
        </p>
        <p v-if="user?.birthday_date">
          <img :src="CalendarIcon" class="settings-card__icon" loading="lazy" />
          {{ user?.birthday_date }}
        </p>
      </div>

      <LayoutIcon
        class="settings-card__action"
        :icon="PencilLine"
        :size="16"
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

    <AccountConsentsListForm :value="currentUserConsents" force-required @submit="saveConsent" />

    <div class="settings-card__delete-account" @click="isDeleteAccountModalVisible = true">
      {{ $t('account.deleteAccount') }}
    </div>
  </div>

  <AccountEditNameModal v-model:open="isEditNameModalVisible" />
  <AccountChangePasswordModal v-model:open="isChangePasswordModalVisible" />
  <AccountDeleteAccountModal v-model:open="isDeleteAccountModalVisible" />
</template>

<i18n lang="json">
{
  "pl": {
    "changePassword": "Zmień hasło",
    "sucessUpdate": "Zaktualizowano zgody użytkownika."
  },
  "en": {
    "changePassword": "Change password",
    "sucessUpdate": "User consents have been updated."
  }
}
</i18n>

<script setup lang="ts">
import type { UserConsentDto } from '@heseya/store-core'

import PencilLine from '@/assets/icons/pencil-line-filled.svg?component'
import PhoneIcon from '@/assets/icons/phone.svg'
import CalendarIcon from '@/assets/icons/calendar.svg'

import { useUserStore } from '@/store/user'

const t = useLocalI18n()
const $t = useGlobalI18n()
const formatError = useErrorMessage()
const { notify } = useNotify()
const heseya = useHeseya()
const userStore = useUserStore()

const user = useUser()

const isEditNameModalVisible = ref<boolean>(false)
const isChangePasswordModalVisible = ref<boolean>(false)
const isDeleteAccountModalVisible = ref<boolean>(false)

const currentUserConsents = computed<UserConsentDto>(
  () =>
    user.value?.consents.reduce(
      (acc, item) => ({ ...acc, [item.id]: item.value }),
      {} as UserConsentDto,
    ) || {},
)

const saveConsent = async (consents: UserConsentDto) => {
  try {
    const user = await heseya.UserProfile.update({ consents })
    userStore.setUser(user)
    notify({
      title: t('sucessUpdate'),
      type: 'success',
    })
  } catch (e) {
    notify({
      title: formatError(e),
      type: 'error',
    })
  }
}
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

  &__row {
    display: flex;
    gap: 24px;

    &--small {
      font-size: 0.8em;
    }
  }

  &__icon {
    height: 1em;
    width: 1em;
    opacity: 0.6;
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
    color: $blue-color-500;
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);

    &:hover {
      opacity: 0.7;
    }

    &--text {
      text-decoration: underline;
      font-size: 12px;
    }
  }

  &__error {
    color: var(--error-color);
    font-weight: bold;
    text-align: center;
  }
}
</style>
