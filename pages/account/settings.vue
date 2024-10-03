<template>
  <NuxtLayout>
    <LayoutBreadcrumpsProvider :breadcrumbs="breadcrumbs" />

    <LayoutAccount class="account-settings">
      <template #header>
        {{ properHeader }}
      </template>
      <AccountOrganizationSettingsCard v-if="isOrganization" />

      <AccountSettingsCard v-if="!isOrganization" />
    </LayoutAccount>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useUserStore } from '~/store/user'

const $t = useGlobalI18n()
const user = useUserStore()

useSeoTitle($t('account.settings'))

definePageMeta({
  middleware: 'auth',
})

const isOrganization = computed(() => user.organization)
const properHeader = computed(() => {
  return isOrganization ? $t('account.organizationSettings') : $t('account.settings')
})

const breadcrumbs = computed(() => [
  { label: $t('breadcrumbs.account'), link: '/account' },
  { label: properHeader.value, link: '/account/settings' },
])
</script>

<style lang="scss" scoped></style>
