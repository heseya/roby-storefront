<template>
  <NuxtLayout>
    <LayoutBreadcrumpsProvider :breadcrumbs="breadcrumbs" />

    <OrganizationRegisterForm @registered="() => navigateTo(localePath('/login'))" />
  </NuxtLayout>
</template>

<script setup lang="ts">
const $t = useGlobalI18n()
const localePath = useLocalePath()

useSeoTitle($t('account.registerTitle'))

const breadcrumbs = computed(() => [
  { label: $t('account.registerTitle'), link: '/register-organization' },
])
</script>

<style lang="scss" scoped>
.tmp {
}
</style>
