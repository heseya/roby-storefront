<template>
  <NuxtLayout>
    <LayoutBreadcrumpsProvider :breadcrumbs="breadcrumbs" />

    <BaseContainer class="wishlist-page">
      <WishlistView class="wishlist-page__content" />
    </BaseContainer>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/auth'

const $t = useGlobalI18n()
const localePath = useLocalePath()

const auth = useAuthStore()
watch(
  () => auth.isLogged,
  () => {
    if (auth.isLogged) navigateTo(localePath('/account/wishlist'))
  },
  { immediate: true },
)

useSeoTitle($t('wishlist.title'))

const breadcrumbs = computed(() => [{ label: $t('wishlist.title'), link: '/wishlist' }])
</script>

<style lang="scss" scoped>
.wishlist-page {
  margin-bottom: 50px;

  @media ($viewport-10) {
    margin-top: 60px;
  }

  &__title {
    text-align: left;
    margin-bottom: 24px;
  }
}
</style>
