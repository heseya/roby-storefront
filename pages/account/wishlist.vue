<template>
  <NuxtLayout>
    <LayoutBreadcrumpsProvider :breadcrumbs="breadcrumbs" />

    <LayoutAccount>
      <template #header>
        {{ $t('custom.wishlist') }}
      </template>
      <div class="account-wishlist">
        <WishlistView small />
      </div>
    </LayoutAccount>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/auth'

const { t: $t } = useI18n({ useScope: 'global' })

definePageMeta({
  middleware: 'auth',
})

const auth = useAuthStore()
watch(
  () => auth.isLogged,
  () => {
    if (!auth.isLogged) navigateTo('/wishlist')
  },
  { immediate: true },
)

useSeoMeta({
  title: () => $t('custom.wishlist'),
})

const breadcrumbs = computed(() => [
  { label: $t('breadcrumbs.account'), link: '/account' },
  { label: $t('custom.wishlist'), link: '/account/wishlist' },
])
</script>

<style lang="scss" scoped>
.account-wishlist {
  margin-top: 20px;
}
</style>
