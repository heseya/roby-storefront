export interface NavLink {
  text: string
  path: string
  // Only one nested level is supported
  children?: Omit<NavLink, 'children'>[]
}
