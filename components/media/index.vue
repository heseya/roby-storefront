<template>
  <MediaPicture
    v-if="canRenderPicture"
    :id="`media-${media?.id}`"
    class="hs-media"
    :src="url"
    :width="width"
    :height="height"
    :object-fit="objectFit"
    :object-position="objectPosition"
    :placeholder-class-name="placeholderClassName"
    :loading="loading"
    :alt="alt || media?.alt || ''"
  >
    <template #placeholder>
      <slot name="placeholder"></slot>
    </template>
  </MediaPicture>

  <MediaVideo
    v-else-if="canRenderVideo"
    :id="`media-${media?.id}`"
    class="hs-media"
    :src="url"
    :autoplay="autoplay"
    :loop="loop"
    :muted="muted"
    :controls="controls"
    :object-fit="objectFit"
    :placeholder-class-name="placeholderClassName"
  >
    <template #placeholder>
      <slot name="placeholder"></slot>
    </template>
  </MediaVideo>

  <MediaPlaceholder
    v-else
    :id="`media-${media?.id}`"
    class="hs-media"
    :placeholder-class-name="placeholderClassName"
  >
    <slot name="placeholder"></slot>
  </MediaPlaceholder>
</template>

<script lang="ts" setup>
import { CdnMediaType } from '@heseya/store-core'
import type { CdnMedia } from '@heseya/store-core'

const props = withDefaults(
  defineProps<{
    media?: CdnMedia | null
    alt?: string
    loading?: 'lazy' | 'eager'
    fetchpriority?: 'high' | 'low' | 'auto'
    objectFit?: string
    objectPosition?: string
    width?: string | number
    height?: string | number
    autoplay?: boolean
    loop?: boolean
    muted?: boolean
    playsinline?: boolean
    controls?: boolean
    placeholderClassName?: string
  }>(),
  {
    media: null,
    alt: '',
    loading: 'lazy',
    fetchpriority: 'auto',
    objectFit: 'contain',
    objectPosition: 'center',
    width: undefined,
    height: undefined,
    autoplay: true,
    loop: true,
    muted: true,
    playsinline: true,
    controls: false,
    placeholderClassName: '',
  },
)

const url = computed(() => {
  if (!props.media?.url) return undefined
  if (props.media && props.media.url) return props.media.url
  return undefined
})

const canRenderPicture = computed(() => {
  if (!props.media) return false
  return props.media.type === CdnMediaType.Photo
})

const canRenderVideo = computed(() => {
  if (!props.media) return false
  return props.media.type === CdnMediaType.Video
})
</script>
