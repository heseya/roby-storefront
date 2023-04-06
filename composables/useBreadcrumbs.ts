type BreadcrumbLink = { link: string; label: string }

const BREADCRUMPS = ref([] as BreadcrumbLink[])

export const useBreadcrumbs = (currentPageLinks?: Array<BreadcrumbLink | null>) => {
  const { t } = useI18n()

  const HOME_LINK = { link: '/', label: t('breadcrumbs.home') }

  if (currentPageLinks) {
    BREADCRUMPS.value = [HOME_LINK, ...currentPageLinks].filter(Boolean) as BreadcrumbLink[]
  }

  // Clear links when route changes
  onBeforeRouteLeave(() => {
    BREADCRUMPS.value = []
  })

  return BREADCRUMPS
}
