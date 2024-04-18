import { createSeoMetatags, getSeoValues } from '@heseya/store-core'
import type { SeoMetadata } from '@heseya/store-core'
import type { MaybeRef } from '@vueuse/core'
import { useConfigStore } from '~/store/config'

export const useSeo = (getSeoArray: () => Array<MaybeRef<SeoMetadata> | null | undefined>) => {
  const config = useConfigStore()

  const inputSeo = computed(() => getSeoArray().filter(Boolean).map(unref) as SeoMetadata[])

  const computedSeo = computed(() => {
    return getSeoValues(...inputSeo.value, {
      ...config.seo,
      title: '',
    })
  })

  useHead(() => ({
    ...createSeoMetatags({
      ...computedSeo.value,
      // Default title is used as suffix
      title: computedSeo.value.title
        ? `${computedSeo.value.title} - ${config.seo.title}`
        : config.seo.title,
    }),
    title: computedSeo.value.title,
  }))
}

export const useSeoTitle = (title: MaybeRef<string>) => {
  useSeo(() => [
    {
      title: unref(title),
    },
  ])
}
