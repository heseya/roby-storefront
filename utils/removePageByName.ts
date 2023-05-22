import { NuxtPage } from 'nuxt/schema'

export const removePageByName = (name?: string, pages: NuxtPage[] = []): void => {
  const pagesToRemove = []
  for (const page of pages) {
    page.name === name ? pagesToRemove.push(page) : removePageByName(name, page.children)
  }
  pagesToRemove.forEach((page) => pages.splice(pages.indexOf(page), 1))
}
