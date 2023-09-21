<template>
  <div class="dpd-modal">
    <div id="map" ref="containerRef" class="dpd-modal__inner"></div>
  </div>
</template>

<script setup lang="ts">
import { Furgonetka } from '@/interfaces/Furgonetka'

const emit = defineEmits<{
  (event: 'select', machine: Furgonetka): void
}>()

const containerRef = ref<HTMLElement>()
const output = null

function mapCallback(params) {
  //this.output = params;
  console.log(params)
}

// Real type is not known
const mapWidget = ref<any>(null)

onMounted(() => {
  // This forces the clear of the map element
  if (containerRef.value) containerRef.value.innerHTML = ''

  mapWidget.value = new window.Furgonetka.Map({
    courierServices: ['dpd'],
    callback: mapCallback,
  }).show()
})

onUnmounted(() => {
  mapWidget.value?.close()
})
</script>

<style lang="scss">
.dpd-modal {
  height: 100%;

  @media ($viewport-10) {
    width: 90vw;
    height: 90vh;
  }

  .search-group {
    width: 90% !important;
  }
}
</style>
