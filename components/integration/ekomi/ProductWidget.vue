<template>
  <IntegrationEkomiWidget v-if="ekomiCustomerId" :token="props.token" />
  <div
    v-if="ekomiCustomerId"
    id="ekomi-product-widget-identifier"
    class="prod-data-emp"
    style="visibility: hidden"
  >
    {{ productId }}
  </div>
</template>

<script setup lang="ts">
const { ekomiCustomerId } = usePublicRuntimeConfig()
const props = defineProps<{ token: string; productId?: string }>()
</script>

<style lang="scss" scoped>
.ekomi-widget-container {
}
</style>
