<template>
  <NuxtLayout>
    <LayoutBreadcrumpsProvider :breadcrumbs="breadcrumbs" />

    <div class="register-content">
      <AuthRegisterForm @registered="() => $router.push('/login')" />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const $t = useGlobalI18n()

useSeoMeta({
  title: () => $t('custom.registerTitle'),
})

const breadcrumbs = computed(() => [{ label: $t('custom.registerTitle'), link: '/register' }])
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
