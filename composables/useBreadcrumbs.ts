import { BreadcrumbLink, BreadcrumbsDto } from '~/interfaces/Breadcrumbs'

const BREADCRUMPS = ref([] as BreadcrumbLink[])

export const useBreadcrumbs = () => {
  const { t } = useI18n({ useScope: 'global' })

  const HOME_LINK = { link: '/', label: t('breadcrumbs.home') }

  const setBreadcrumbs = (links?: BreadcrumbsDto) => {
    const filtered = (links?.filter(Boolean) || []) as BreadcrumbLink[]
    if (filtered.length) BREADCRUMPS.value = [HOME_LINK, ...filtered] as BreadcrumbLink[]
    else BREADCRUMPS.value = []
  }

  return {
    breadcrumbs: computed(() => BREADCRUMPS.value),
    set: setBreadcrumbs,
  }
}
