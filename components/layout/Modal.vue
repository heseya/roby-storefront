<template>
  <div>
    <div class="modal-bg" :class="{ 'modal--open': open }" @click="close" />
    <div class="modal" :class="{ 'modal--open': open }">
      <button v-if="closeable" class="modal__close-btn" aria-label="Zamknij modal" @click="close" />

      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const NO_SCROLL_CLASS = 'no-scroll'

const props = withDefaults(
  defineProps<{
    open: boolean
    closeable?: boolean
  }>(),
  {
    closeable: true,
  },
)
const emit = defineEmits<{
  (e: 'update:open', isOpen: boolean): void
}>()
const route = useRoute()

const close = () => {
  if (props.closeable) emit('update:open', false)
}

watch(
  () => props.open,
  (isOpen) => {
    // SSR does not have a window object
    if (!window) return

    if (isOpen) window.document.body.classList.add(NO_SCROLL_CLASS)
    else window.document.body.classList.remove(NO_SCROLL_CLASS)
  },
)

watch(
  () => route,
  () => {
    window.document.body.classList.remove(NO_SCROLL_CLASS)
  },
)
</script>

<style lang="scss" scoped>
.modal-bg {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: #00000029;
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transform: opacity 0.3s;

  &--open {
    opacity: 1;
    visibility: visible;
  }
}

.modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  z-index: 1001;
  opacity: 0;
  visibility: hidden;
  transition: 0.3s;
  box-shadow: 0px 15px 25px #00000029;
  overflow-y: auto;

  @media ($viewport-6) {
    width: auto;
    height: auto;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 22vw;
    min-height: 30vh;
    max-width: calc(100vw - 32px);
    max-height: calc(100vh - 32px);
  }

  &--open {
    opacity: 1;
    visibility: visible;
  }

  &__close-btn {
    all: unset;
    cursor: pointer;
    width: 16px;
    height: 16px;
    right: 30px;
    top: 30px;
    position: absolute;
    z-index: 100;
    background-image: url('@/assets/icons/cross.svg');
    background-position: center;
    background-size: 100%;
    background-repeat: no-repeat;

    @media ($viewport-6) {
      right: 10px;
      top: 10px;
    }
  }
}
</style>
