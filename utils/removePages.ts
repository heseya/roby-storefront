interface RemovePages<T> {
  name?: string
  path: string
  children?: RemovePages<T>[]
}

export const removePagesByName = <T>(
  name?: string,
  pages: RemovePages<T>[] = [],
): RemovePages<T>[] =>
  pages.filter((page) => {
    const match = page.name === name
    if (match) return false
    if (page.children) page.children = removePagesByName(name, page.children)
    return true
  })
