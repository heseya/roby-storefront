import { BreadcrumbLink, BreadcrumbsDto } from '~/interfaces/Breadcrumbs'

export const useBreadcrumbsState = () => useState('breadcrumps', () => [] as BreadcrumbLink[])

export const useBreadcrumbs = () => {
  const { t } = useI18n({ useScope: 'global' })
  const state = useBreadcrumbsState()

  const HOME_LINK = { link: '/', label: t('breadcrumbs.home') }

  const setBreadcrumbs = (links?: BreadcrumbsDto) => {
    const filtered = (links?.filter(Boolean) || []) as BreadcrumbLink[]
    if (filtered.length) state.value = [HOME_LINK, ...filtered] as BreadcrumbLink[]
    else state.value = []
  }

  return {
    set: setBreadcrumbs,
  }
}
