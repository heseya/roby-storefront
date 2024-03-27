import type { RouteRecordRaw } from 'vue-router'

export const removePageByName = (name?: string, pages: RouteRecordRaw[] = []): void => {
  const pagesToRemove = []
  for (const page of pages) {
    page.name === name ? pagesToRemove.push(page) : removePageByName(name, page.children)
  }
  pagesToRemove.forEach((page) => pages.splice(pages.indexOf(page), 1))
}

export const changePagePathByName = (
  pages: RouteRecordRaw[] = [],
  name: string,
  newPath: string,
): void => {
  for (const page of pages) {
    if (page.name === name) {
      page.path = newPath
    } else {
      changePagePathByName(page.children, name, newPath)
    }
  }
}

export const changePagePathOrRemoveByName = (
  pages: RouteRecordRaw[] = [],
  name: string,
  newPath?: string,
): void => {
  if (newPath && newPath !== '0') changePagePathByName(pages, name, newPath)
  else removePageByName(name, pages)
}
