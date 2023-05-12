<template>
  <NuxtLayout>
    <LayoutBreadcrumpsProvider :breadcrumbs="breadcrumbs" />

    <LayoutAccount>
      <template #header>
        {{ t('title') }}
      </template>
      <div class="account-wishlist">
        <WishlistView small />
      </div>
    </LayoutAccount>
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
import { useAuthMiddleware } from '~/composables/useAuthMiddleware'
import { useAuthStore } from '~/store/auth'

useAuthMiddleware()
const t = useLocalI18n()
const { t: $t } = useI18n({ useScope: 'global' })

const auth = useAuthStore()
watch(
  () => auth.isLogged,
  () => {
    if (!auth.isLogged) navigateTo('/wishlist')
  },
  { immediate: true },
)

useSeoMeta({
  title: () => t('title'),
})

const breadcrumbs = computed(() => [
  { label: $t('breadcrumbs.account'), link: '/account' },
  { label: t('title'), link: '/account/wishlist' },
])
</script>

<style lang="scss" scoped>
.account-wishlist {
  margin-top: 20px;
}
</style>
