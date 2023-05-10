<template>
  <NuxtLayout>
    <LayoutBreadcrumpsProvider :breadcrumbs="breadcrumbs" />

    <BaseContainer class="wishlist-page">
      <WishlistView class="wishlist-page__content" />
    </BaseContainer>
  </NuxtLayout>
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

useSeoMeta({
  title: () => t('title'),
})

const breadcrumbs = computed(() => [{ label: t('title'), link: '/wishlist' }])
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
