<template>
  <MediaPlaceholder v-if="isError || !src" :placeholder-class-name="placeholderClassName">
    <slot name="placeholder"></slot>
  </MediaPlaceholder>

  <video
    v-else
    class="hs-video"
    :class="`hs-video--${objectFit}`"
    :src="url"
    :autoplay="autoplay"
    :loop="loop"
    :muted="muted"
    playsinline
    :controls="controls"
    @error="handleError"
  ></video>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    src: string | undefined
    objectFit?: string
    placeholderClassName?: string
    autoplay?: boolean
    loop?: boolean
    muted?: boolean
    playsinline?: boolean
    controls?: boolean
  }>(),
  {
    objectFit: 'cover',
    placeholderClassName: '',
    autoplay: true,
    loop: true,
    muted: true,
    playsinline: true,
    controls: false,
  },
)

const emit = defineEmits<{
  (event: 'error', error: Error): void
}>()

const isError = ref(false)

const url = computed(() => {
  if (!props.src) return undefined
  const url = new URL(props.src)
  return url.toString()
})

const handleError = (error: any) => {
  isError.value = true
  emit('error', error)
}
</script>

<style lang="scss" scoped>
.hs-video {
  width: 100%;
  height: 100%;
  max-width: inherit;
  max-height: inherit;
  display: block;
  object-position: top;
  overflow: hidden;

  &--contain {
    object-fit: contain;
  }

  &--cover {
    object-fit: cover;
  }

  &--fill {
    object-fit: fill;
  }

  &--none {
    object-fit: none;
  }

  &--scale-down {
    object-fit: scale-down;
  }
}
</style>
