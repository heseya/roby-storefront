<template>
  <NuxtLayout>
    <LayoutBreadcrumpsProvider :breadcrumbs="breadcrumbs" />

    <LayoutAccount class="account-settings">
      <template #header>
        {{ $t('custom.settings') }}
      </template>

      <AccountSettingsCard />
    </LayoutAccount>
  </NuxtLayout>
</template>

<script setup lang="ts">
const { t: $t } = useI18n({ useScope: 'global' })

useSeoMeta({
  title: () => $t('custom.settings'),
})

definePageMeta({
  middleware: 'auth',
})

const breadcrumbs = computed(() => [
  { label: $t('breadcrumbs.account'), link: '/account' },
  { label: $t('custom.settings'), link: '/account/settings' },
])
</script>

<style lang="scss" scoped></style>
