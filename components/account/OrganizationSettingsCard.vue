<template>
  <div class="settings-card">
    <h4 class="settings-card__header">{{ $t('account.organizationData') }}</h4>

    <div class="settings-card__container">
      <p>
        <strong
          >{{ organization?.billing_address.company_name }}
          {{ organization?.billing_address.name }}</strong
        >
      </p>
      <p>{{ organization?.billing_email }}</p>
      <p>{{ $t('form.vat') }} {{ organization?.billing_address.vat }}</p>
      <br />

      <p>
        {{ organization?.billing_address.address }}<br />
        {{ organization?.billing_address.zip }} {{ organization?.billing_address.city }}
      </p>
    </div>

    <AccountConsentsListForm :value="currentUserConsents" force-required @submit="saveConsent" />
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "sucessUpdate": "Zaktualizowano zgody organizacji."
  },
  "en": {
    "sucessUpdate": "Organization consents have been updated."
  }
}
</i18n>

<script setup lang="ts">
import type { UserConsentDto } from '@heseya/store-core'
import { useUserStore } from '~/store/user'

const t = useLocalI18n()
const $t = useGlobalI18n()
const formatError = useErrorMessage()
const { notify } = useNotify()
const heseya = useHeseya()
const userStore = useUserStore()
const organization = useOrganization()

const currentUserConsents = computed<UserConsentDto>(
  () =>
    organization.value?.consents.reduce(
      (acc, item) => ({ ...acc, [item.id]: item.value }),
      {} as UserConsentDto,
    ) || {},
)

const saveConsent = async (consents: UserConsentDto) => {
  try {
    if (organization.value?.id) {
      const updatedOrganization = await heseya.UserProfile.My.Organization.update({
        consents,
      })

      userStore.setOrganization({
        ...updatedOrganization,
        shipping_addresses: organization.value?.shipping_addresses,
      })
      notify({
        title: t('sucessUpdate'),
        type: 'success',
      })
    } else {
      notify({
        title: 'Organization ID is missing',
        type: 'error',
      })
    }
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
