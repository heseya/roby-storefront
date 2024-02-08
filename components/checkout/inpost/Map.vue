<template>
  <div class="inpost-modal">
    <div id="easypack-map" ref="containerRef" class="inpost-modal__inner"></div>
  </div>
</template>

<script setup lang="ts">
import type { Paczkomat } from '@/interfaces/Paczkomat'

const emit = defineEmits<{
  (event: 'select', machine: Paczkomat): void
}>()

const containerRef = ref<HTMLElement>()

// Real type is not known
const mapWidget = ref<any>(null)

onMounted(() => {
  // This forces the clear of the map element
  if (containerRef.value) containerRef.value.innerHTML = ''

  window.easyPack.init({
    mapType: 'osm',
    searchType: 'osm',
    points: {
      types: ['parcel_locker'],
    },
  })

  mapWidget.value = window.easyPack.mapWidget('easypack-map', (machine: Paczkomat) => {
    emit('select', machine)
  })
})
</script>

<style lang="scss">
.inpost-modal {
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
