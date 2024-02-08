import type { BannerMedia } from '@heseya/store-core'

export const useMediaQueriesForMediaBanners = (media: MaybeRef<BannerMedia['media']>) => {
  const sortedMedia = computed(() =>
    [...unref(media)].sort((a, b) => a.min_screen_width - b.min_screen_width),
  )

  const mediaQueryStyle = computed(() => {
    return sortedMedia.value.reduce((acc, curr, index) => {
      const next = sortedMedia.value[index + 1]

      if (next) {
        return `
        ${acc}
        @media (min-width: ${curr.min_screen_width}px) and (max-width: ${next.min_screen_width}px) {
          #media-${curr.media.id} { display: block; }
        }
        `
      }

      return `
      ${acc}
      @media (min-width: ${curr.min_screen_width}px) {
        #media-${curr.media.id} { display: block; }
      }
      `
    }, '')
  })

  useHead({
    style: [{ innerHTML: mediaQueryStyle }],
  })
}
