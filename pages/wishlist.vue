<template>
  <BaseContainer class="wishlist-page">
    <LayoutBreadcrumpsProvider :breadcrumbs="[{ label: t('title'), link: '/wishlist' }]" />

    <WishlistView class="wishlist-page__content" />
  </BaseContainer>
</template>

<i18n lang="json">
{
  "pl": {
    "title": "Lista życzeń"
  }
}
</i18n>

<script setup lang="ts">
import { useAuthStore } from '~/store/auth'

const t = useLocalI18n()

const auth = useAuthStore()
watch(
  () => auth.isLogged,
  () => {
    if (auth.isLogged) navigateTo('/account/wishlist')
  },
  { immediate: true },
)

useHead({
  title: t('title'),
})
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
