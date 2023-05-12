<template>
  <NuxtLayout>
    <LayoutBreadcrumpsProvider :breadcrumbs="breadcrumbs" />

    <LayoutAccount class="account-settings">
      <template #header>
        {{ t('title') }}
      </template>

      <AccountSettingsCard />
    </LayoutAccount>
  </NuxtLayout>
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

useSeoMeta({
  title: () => t('title'),
})

definePageMeta({
  middleware: 'auth',
})

const breadcrumbs = computed(() => [
  { label: $t('breadcrumbs.account'), link: '/account' },
  { label: t('title'), link: '/account/settings' },
])
</script>

<style lang="scss" scoped></style>
