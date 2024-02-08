import type { BreadcrumbLink } from '~/interfaces/Breadcrumbs'

export const useBreadcrumbsState = () => useState('breadcrumps', () => [] as BreadcrumbLink[])
