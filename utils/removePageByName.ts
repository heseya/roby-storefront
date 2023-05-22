interface RemovePages<T> {
  name?: string
  path: string
  children?: RemovePages<T>[]
}

export const removePageByName = <T>(name?: string, pages: RemovePages<T>[] = []): void => {
  const pagesToRemove = []
  for (const page of pages) {
    page.name === name ? pagesToRemove.push(page) : removePageByName(name, page.children)
  }
  pagesToRemove.forEach((page) => pages.splice(pages.indexOf(page), 1))
}
