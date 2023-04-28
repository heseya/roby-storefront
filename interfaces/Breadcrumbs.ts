export interface BreadcrumbLink {
  link: string
  label: string
}

export type BreadcrumbsDto = Array<BreadcrumbLink | null>
