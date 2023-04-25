<template>
  <LayoutAccount>
    <template #header>
      {{ t('title') }}
    </template>
    <AccountSettingsCard />
  </LayoutAccount>
</template>

<i18n lang="json">
{
  "pl": {
    "title": "Ustawienia konta"
  }
}
</i18n>

<script setup lang="ts">
const t = useLocalI18n()

useHead({
  title: t('title'),
})

useBreadcrumbs([
  { label: 'Moje konto', link: '/account' },
  { label: 'Ustawienia konta', link: '/settings' },
])
</script>

<style lang="scss" scoped></style>
