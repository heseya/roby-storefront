<template>
  <NuxtLayout>
    <LayoutBreadcrumpsProvider :breadcrumbs="breadcrumbs" />

    <OrganizationRegisterForm
      v-if="isModeB2B"
      @registered="() => navigateTo(localePath('/login'))"
    />
    <div v-else class="register-content">
      <AuthRegisterForm @registered="() => navigateTo(localePath('/login'))" />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { SiteMode } from '@/interfaces/siteMode'

const $t = useGlobalI18n()
const localePath = useLocalePath()
const config = usePublicRuntimeConfig()

const isModeB2B = computed(() => config.siteMode === SiteMode.B2B)

useSeoTitle($t('account.registerTitle'))

const breadcrumbs = computed(() => [{ label: $t('account.registerTitle'), link: '/register' }])
</script>

<style lang="scss" scoped>
.register-content {
  padding: 16px;
  width: 100%;

  @media ($viewport-11) {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
    margin-bottom: 100px;
  }
}
</style>
