<template>
  <IntegrationEkomiWidget v-if="ekomiCustomerId" :token="props.token" />
  <div
    v-if="ekomiCustomerId"
    id="ekomi-product-widget-identifier"
    class="prod-data-emp"
    style="visibility: hidden"
  >
    {{ id }}
  </div>
</template>

<script setup lang="ts">
const { ekomiCustomerId } = usePublicRuntimeConfig()
const props = defineProps<{ token: string; productId?: string }>()

/**
 * Ekomi widget handle max 32 characters log product id, UUID has 36 characters and 4 dashes
 */
const id = computed(() => props.productId?.replaceAll('-', '') || '')
</script>

<style lang="scss" scoped>
.ekomi-widget-container {
}
</style>
