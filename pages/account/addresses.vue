<template>
  <NuxtLayout>
    <LayoutBreadcrumpsProvider :breadcrumbs="breadcrumbs" />

    <LayoutAccount class="account-addresses">
      <template #header>
        {{ $t('custom.addresses') }}
      </template>
      <div class="account-addresses__container">
        <AccountDefaultAddress type="shipping" />
        <AccountDefaultAddress type="billing" />
      </div>
    </LayoutAccount>
  </NuxtLayout>
</template>

<script setup lang="ts">
const { t: $t } = useI18n({ useScope: 'global' })

useSeoMeta({
  title: () => $t('custom.addresses'),
})

definePageMeta({
  middleware: 'auth',
})

const breadcrumbs = computed(() => [
  { label: $t('breadcrumbs.account'), link: '/account' },
  { label: $t('custom.addresses'), link: '/account/addresses' },
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
