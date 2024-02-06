import type { NuxtPage } from 'nuxt/schema'

export const removePageByName = (name?: string, pages: NuxtPage[] = []): void => {
  const pagesToRemove = []
  for (const page of pages) {
    page.name === name ? pagesToRemove.push(page) : removePageByName(name, page.children)
  }
  pagesToRemove.forEach((page) => pages.splice(pages.indexOf(page), 1))
}

export const changePagePathByName = (
  pages: NuxtPage[] = [],
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
  pages: NuxtPage[] = [],
  name: string,
  newPath?: string,
): void => {
  if (newPath && newPath !== '0') changePagePathByName(pages, name, newPath)
  else removePageByName(name, pages)
}
