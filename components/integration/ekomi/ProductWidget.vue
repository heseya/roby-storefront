<template>
  <IntegrationEkomiWidget
    v-if="ekomiCustomerId"
    :token="props.token"
    :delay-time="1000"
    :content-html="html"
  />
</template>

<script setup lang="ts">
const { ekomiCustomerId } = usePublicRuntimeConfig()
const props = defineProps<{ token: string; productId?: string }>()

/**
 * Ekomi widget handle max 32 characters log product id, UUID has 36 characters and 4 dashes
 */
const id = computed(() => props.productId?.replaceAll('-', '') || '')

const html = computed(
  () =>
    `<div id="ekomi-product-widget-identifier" class="prod-data-emp" style="visibility: hidden">${id.value}</div>`,
)
</script>

<style lang="scss" scoped>
.tmp {
}
</style>
