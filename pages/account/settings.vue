<template>
  <NuxtLayout>
    <LayoutBreadcrumpsProvider :breadcrumbs="breadcrumbs" />

    <LayoutAccount class="account-settings">
      <template #header>
        {{ $t('account.settings') }}
      </template>

      <AccountSettingsCard />
    </LayoutAccount>
  </NuxtLayout>
</template>

<script setup lang="ts">
const $t = useGlobalI18n()

useSeoTitle($t('account.settings'))

definePageMeta({
  middleware: 'auth',
})

const breadcrumbs = computed(() => [
  { label: $t('breadcrumbs.account'), link: '/account' },
  { label: $t('account.settings'), link: '/account/settings' },
])
</script>

<style lang="scss" scoped></style>
