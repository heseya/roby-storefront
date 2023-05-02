<template>
  <LayoutAccount class="account-settings">
    <LayoutBreadcrumpsProvider :breadcrumbs="breadcrumbs" />

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
const { t: $t } = useI18n({ useScope: 'global' })

useHead({
  title: t('title'),
})

const breadcrumbs = computed(() => [
  { label: $t('breadcrumbs.account'), link: '/account' },
  { label: t('title'), link: '/account/settings' },
])
</script>

<style lang="scss" scoped></style>
