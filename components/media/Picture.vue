<template>
  <MediaPlaceholder v-if="isError || !src" :placeholder-class-name="placeholderClassName">
    <slot name="placeholder"></slot>
  </MediaPlaceholder>

  <picture v-else class="hs-picture" @error="handleError">
    <!-- <source v-if="avifUrl" :srcset="avifUrl" type="image/avif" /> -->
    <source v-if="webpUrl" :srcset="webpUrl" type="image/webp" />
    <source v-if="webpUrl" :srcset="webpUrl" type="image/webp" />
    <source v-if="jpegUrl" :srcset="jpegUrl" type="image/jpeg" />
    <source v-if="baseUrl" :srcset="baseUrl" />
    <img
      :src="baseUrl"
      :alt="alt"
      :class="[
        `hs-picture__img`,
        `hs-picture__img--fit-${objectFit}`,
        `hs-picture__img--position-${objectPosition}`,
      ]"
      :loading="loading"
      :fetchpriority="fetchpriority"
      @error="handleError"
    />
  </picture>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    src: string | undefined
    width?: number | string
    height?: number | string
    objectPosition?: string
    objectFit?: string
    alt?: string
    loading?: 'lazy' | 'eager'
    fetchpriority?: 'high' | 'low' | 'auto'
    placeholderClassName?: string
  }>(),
  {
    width: undefined,
    height: undefined,
    objectPosition: 'top',
    objectFit: 'cover',
    alt: '',
    loading: 'lazy',
    fetchpriority: 'auto',
    placeholderClassName: '',
  },
)
const emit = defineEmits<{
  (event: 'error', error: Error): void
}>()

const isError = ref(false)

const createUrlWithSize = (base: string, width?: number | string, height?: number | string) => {
  const url = new URL(base)
  if (width) url.searchParams.append('w', width.toString())
  if (height) url.searchParams.append('h', height.toString())
  return url.toString()
}

const creatrUrlWithFormat = (baseUrl: string, format: string) => {
  if (!baseUrl) return ''
  const url = new URL(baseUrl)
  url.searchParams.append('format', format)
  return url.toString()
}

const baseUrl = computed(() => {
  if (!props.src) return undefined

  const url = new URL(props.src)

  if (props.width) url.searchParams.append('w', props.width.toString())
  if (props.height) url.searchParams.append('h', props.height.toString())

  return createUrlWithSize(props.src, props.width, props.height)
})

const useFormatedUrl = (format: string) =>
  computed(() => (baseUrl.value ? creatrUrlWithFormat(baseUrl.value, format) : ''))

const jpegUrl = useFormatedUrl('jpeg')
const webpUrl = useFormatedUrl('webp')
// const avifUrl = useFormatedUrl('avif')

const handleError = (error: any) => {
  isError.value = true
  emit('error', error)
}
</script>

<style lang="scss" scoped>
.hs-picture {
  &__img {
    width: 100%;
    height: 100%;
    max-width: inherit;
    max-height: inherit;
    display: block;
    object-position: top;
    object-fit: contain;
    text-indent: 100%;
    white-space: nowrap;
    overflow: hidden;

    &--fit-contain {
      object-fit: contain;
    }
    &--fit-cover {
      object-fit: cover;
    }
    &--fit-fill {
      object-fit: fill;
    }
    &--fit-none {
      object-fit: none;
    }
    &--fit-scale-down {
      object-fit: scale-down;
    }

    &--position-top {
      object-position: top;
    }
    &--position-center {
      object-position: center;
    }
    &--position-bottom {
      object-position: bottom;
    }
    &--position-right {
      object-position: right;
    }
    &--position-left {
      object-position: left;
    }
  }
}
</style>
