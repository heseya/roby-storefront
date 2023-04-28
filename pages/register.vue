<template>
  <div class="register-content">
    <LayoutBreadcrumpsProvider :breadcrumbs="[{ label: t('title'), link: '/register' }]" />
    <AuthRegisterForm @registered="() => $router.push('/login')" />
  </div>
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

useHead({
  title: t('title'),
})
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
