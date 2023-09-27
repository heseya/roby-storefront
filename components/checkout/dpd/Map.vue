<template>
  <div id="map" ref="containerRef"></div>
</template>

<script setup lang="ts">
import { Furgonetka } from '@/interfaces/Furgonetka'

const emit = defineEmits<{
  (event: 'select', point: Furgonetka): void
  (event: 'close'): void
}>()

const containerRef = ref<HTMLElement>()

function selectCallback(params: any): void {
  return emit('select', params.point)
}
function closeCallback(): void {
  return emit('close')
}

// Real type is not known
const mapWidget = ref<any>(null)

onMounted(() => {
  mapWidget.value = new window.Furgonetka.Map({
    courierServices: ['dpd'],
    callback: selectCallback,
    closeModalCallback: closeCallback,
  }).show()
})

onUnmounted(() => {
  mapWidget.value?.close()
})
</script>

<style lang="scss">
.dpd {
}
</style>
