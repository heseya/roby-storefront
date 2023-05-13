<template>
  <NuxtLayout>
    <LayoutBreadcrumpsProvider :breadcrumbs="breadcrumbs" />

    <LayoutAccount class="account-addresses">
      <template #header>
        {{ t('title') }}
      </template>
      <div class="account-addresses__container">
        <AccountDefaultAddress type="shipping" />
        <AccountDefaultAddress type="billing" />
      </div>
    </LayoutAccount>
  </NuxtLayout>
</template>

<i18n lang="json">
{
  "pl": {
    "title": "Adresy"
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
  { label: t('title'), link: '/account/addresses' },
])
</script>

<style lang="scss" scoped>
.account-addresses {
  &__container {
    display: grid;
    gap: 5px;
    margin-top: 22px;
  }
}
</style>
