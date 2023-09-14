<template>
  <ClientOnly>
    <Teleport to="#teleport-target">
      <div class="modal-bg" :class="{ 'modal--open': open }" @click="close" />
      <div
        class="modal"
        :class="{ 'modal--open': open, 'modal--box': box, 'modal--full-screen': fullscreen }"
      >
        <button
          v-if="closeable && !hideClose"
          class="modal__close-btn"
          :title="t('close')"
          @click="close"
        />

        <slot v-if="open" />
      </div>
    </Teleport>
  </ClientOnly>
</template>

<i18n lang="json">
{
  "pl": {
    "close": "Zamknij modal"
  },
  "en": {
    "close": "Close modal"
  }
}
</i18n>

<script setup lang="ts">
const t = useLocalI18n()
const NO_SCROLL_CLASS = 'no-scroll'

const props = withDefaults(
  defineProps<{
    open: boolean
    closeable?: boolean
    hideClose?: boolean
    box?: boolean
    fullscreen?: boolean
  }>(),
  {
    closeable: true,
    hideClose: false,
    fullscreen: true,
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
onKeyStroke('Escape', () => close())
</script>

<style lang="scss" scoped>
.modal-bg {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: #0000007c;
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
  width: auto;
  height: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 22vw;
  min-height: 10vh;
  max-width: calc(100vw - 32px);
  max-height: calc(100vh - 32px);
  background-color: $white-color;
  z-index: 1001;
  opacity: 0;
  visibility: hidden;
  transition: 0.3s;
  box-shadow: 0px 15px 25px #00000029;
  overflow-y: auto;
  display: flex;
  align-items: stretch;

  &--full-screen {
    @media ($max-viewport-6) {
      left: 0;
      top: 0;
      width: 100vw;
      height: 100vh;
      transform: none;
      max-width: none;
      max-height: none;
    }
  }

  &--open {
    opacity: 1;
    visibility: visible;
  }

  &--box {
    margin-top: 20px;
    margin-bottom: 30px;
    width: 90%;
    height: auto;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    @media ($viewport-6) {
      width: 70%;
    }

    @media ($viewport-10) {
      width: 60%;
    }

    @media ($viewport-12) {
      width: 40%;
    }
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
