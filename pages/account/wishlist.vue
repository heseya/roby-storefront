<template>
  <LayoutAccount>
    <template #header>
      {{ t('title') }}
    </template>
    <WishlistView class="wishlist-page__content" small />
  </LayoutAccount>
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
    if (!auth.isLogged) navigateTo('/wishlist')
  },
  { immediate: true },
)

useHead({
  title: t('title'),
})

// TODO: breadcrumbs
</script>

<style lang="scss" scoped>
.wishlist-page {
  &__content {
    margin-top: 24px;
  }
}
</style>
