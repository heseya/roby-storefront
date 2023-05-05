<template>
  <NuxtLayout>
    <LayoutBreadcrumpsProvider :breadcrumbs="breadcrumbs" />

    <LayoutAccount class="account-wishlist">
      <template #header>
        {{ t('title') }}
      </template>

      <WishlistView small />
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
import { useAuthStore } from '~/store/auth'

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

<style lang="scss" scoped></style>
