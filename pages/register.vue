<template>
  <NuxtLayout>
    <LayoutBreadcrumpsProvider :breadcrumbs="breadcrumbs" />

    <div class="register-content">
      <AuthRegisterForm @registered="() => navigateTo('/login')" />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const $t = useGlobalI18n()

useSeoMeta({
  title: () => $t('account.registerTitle'),
})

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
