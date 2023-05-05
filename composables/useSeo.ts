import { SeoMetadata, createSeoMetatags, getSeoValues } from '@heseya/store-core'
import { MaybeRef } from '@vueuse/core'
import { useConfigStore } from '~/store/config'

export const useSeo = (getSeoArray: () => Array<MaybeRef<SeoMetadata> | null | undefined>) => {
  const config = useConfigStore()
  const { t } = useI18n({ useScope: 'global' })

  const inputSeo = computed(() => getSeoArray().filter(Boolean).map(unref) as SeoMetadata[])

  const computedSeo = computed(() =>
    getSeoValues(...inputSeo.value, {
      ...config.seo,
      // Default title is used as suffix
      title: t('seo.loading'),
    }),
  )

  useHead(() => createSeoMetatags(computedSeo.value))
}
