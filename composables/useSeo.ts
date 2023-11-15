import { SeoMetadata, createSeoMetatags, getSeoValues } from '@heseya/store-core'
import { MaybeRef } from '@vueuse/core'
import { useConfigStore } from '~/store/config'

export const useSeo = (getSeoArray: () => Array<MaybeRef<SeoMetadata> | null | undefined>) => {
  const config = useConfigStore()

  const inputSeo = computed(() => getSeoArray().filter(Boolean).map(unref) as SeoMetadata[])

  const computedSeo = computed(() =>
    getSeoValues(...inputSeo.value, {
      ...config.seo,
      // Default title is used as suffix
      title: '',
    }),
  )

  useHead(() => createSeoMetatags(computedSeo.value))
}

export const useSeoTitle = (title: MaybeRef<string>) => {
  useSeo(() => [
    {
      title: unref(title),
    },
  ])
}
