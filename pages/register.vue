<template>
  <NuxtLayout>
    <LayoutBreadcrumpsProvider :breadcrumbs="breadcrumbs" />

    <OrganizationRegisterForm
      v-if="IS_B2B_REGISTRATION"
      @registered="() => navigateTo(localePath('/login'))"
    />
    <div v-else class="register-content">
      <AuthRegisterForm @registered="() => navigateTo(localePath('/login'))" />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const $t = useGlobalI18n()
const localePath = useLocalePath()

// TODO: dynamic from env or smth
const IS_B2B_REGISTRATION = true

useSeoTitle($t('account.registerTitle'))

const breadcrumbs = computed(() => [{ label: $t('account.registerTitle'), link: '/register' }])
</script>

<style lang="scss" scoped>
.register-content {
  padding: 16px;
  width: 100%;

  @media ($viewport-11) {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
    margin-bottom: 100px;
  }
}
</style>
