<template>
  <NuxtLayout>
    <LayoutBreadcrumpsProvider :breadcrumbs="breadcrumbs" />

    <LayoutAccount>
      <template #header>
        {{ $t('wishlist.title') }}
      </template>
      <div class="account-wishlist">
        <WishlistView small />
      </div>
    </LayoutAccount>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/auth'

const $t = useGlobalI18n()
const localePath = useLocalePath()

definePageMeta({
  middleware: 'auth',
})

const auth = useAuthStore()
watch(
  () => auth.isLogged,
  () => {
    if (!auth.isLogged) navigateTo(localePath('/wishlist'))
  },
  { immediate: true },
)

useSeoTitle($t('wishlist.title'))

const breadcrumbs = computed(() => [
  { label: $t('breadcrumbs.account'), link: '/account' },
  { label: $t('wishlist.title'), link: '/account/wishlist' },
])
</script>

<style lang="scss" scoped>
.account-wishlist {
  margin-top: 20px;
}
</style>
