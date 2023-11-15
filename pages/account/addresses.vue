<template>
  <NuxtLayout class="content--no-bottom-padding">
    <LayoutBreadcrumpsProvider :breadcrumbs="breadcrumbs" />

    <LayoutAccount class="account-addresses">
      <template #header>
        {{ $t('account.addresses') }}
      </template>
      <div class="account-addresses__container">
        <AccountDefaultAddress type="shipping" />
        <AccountDefaultAddress type="billing" />
      </div>
    </LayoutAccount>
  </NuxtLayout>
</template>

<script setup lang="ts">
const $t = useGlobalI18n()

useSeoTitle($t('account.addresses'))

definePageMeta({
  middleware: 'auth',
})

const breadcrumbs = computed(() => [
  { label: $t('breadcrumbs.account'), link: '/account' },
  { label: $t('account.addresses'), link: '/account/addresses' },
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
