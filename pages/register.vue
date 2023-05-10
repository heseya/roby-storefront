<template>
  <NuxtLayout>
    <LayoutBreadcrumpsProvider :breadcrumbs="breadcrumbs" />

    <div class="register-content">
      <AuthRegisterForm @registered="() => $router.push('/login')" />
    </div>
  </NuxtLayout>
</template>

<i18n lang="json">
{
  "pl": {
    "title": "Rejestracja"
  }
}
</i18n>

<script setup lang="ts">
const t = useLocalI18n()

useSeoMeta({
  title: () => t('title'),
})

const breadcrumbs = computed(() => [{ label: t('title'), link: '/register' }])
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
