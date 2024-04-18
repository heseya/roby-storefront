import type { RouterConfig } from '@nuxt/schema'
import type { RouteRecordRaw } from 'vue-router'
import cloneDeep from 'lodash/cloneDeep'

const composePageNames = (name: string, locales: string[]): string[] =>
  locales.map((locale) => `${name}___${locale}`)

const composePagePath = (path: string, locale: string, isDefaultLocale: boolean): string =>
  isDefaultLocale ? path : `/${locale}${path}`

export default <RouterConfig>{
  // https://router.vuejs.org/api/interfaces/routeroptions.html#routes
  routes: (routes) => {
    const pages = cloneDeep(routes) as RouteRecordRaw[]
    const { page: paths, i18n } = usePublicRuntimeConfig()

    const NAMES = {
      Blog: 'blog',
      Contact: 'kontakt',
      AboutUs: 'o-nas',
      Rent: 'wynajem',
      Statute: 'regulamin',
    }

    const LOCALISED_NAMES = {
      Blog: composePageNames(NAMES.Blog, i18n.locales),
      Contact: composePageNames(NAMES.Contact, i18n.locales),
      AboutUs: composePageNames(NAMES.AboutUs, i18n.locales),
      Rent: composePageNames(NAMES.Rent, i18n.locales),
      Statute: composePageNames(NAMES.Statute, i18n.locales),
    }

    /**
     * All custom pages can be disabled or their path can be changed
     */
    i18n.locales.forEach((locale) => {
      const isDefault = locale === i18n.defaultLocale

      changePagePathOrRemoveByName(
        pages,
        `${NAMES.Blog}___${locale}`,
        composePagePath(paths.blogPath, locale, isDefault),
      )
      changePagePathOrRemoveByName(
        pages,
        `${NAMES.Contact}___${locale}`,
        composePagePath(paths.contactPath, locale, isDefault),
      )
      changePagePathOrRemoveByName(
        pages,
        `${NAMES.AboutUs}___${locale}`,
        composePagePath(paths.aboutPath, locale, isDefault),
      )
      changePagePathOrRemoveByName(
        pages,
        `${NAMES.Rent}___${locale}`,
        composePagePath(paths.rentPath, locale, isDefault),
      )
      changePagePathOrRemoveByName(
        pages,
        `${NAMES.Statute}___${locale}`,
        composePagePath(paths.statutePath, locale, isDefault),
      )
    })

    /**
     * These pages must be disabled, when directus is not available
     */
    const directusPageNames = [
      LOCALISED_NAMES.Blog,
      LOCALISED_NAMES.Contact,
      LOCALISED_NAMES.AboutUs,
      LOCALISED_NAMES.Rent,
    ].flat()

    const directusPagesDisabled = [
      paths.blogPath,
      paths.contactPath,
      paths.aboutPath,
      paths.rentPath,
    ].every((path) => path === undefined || path === '' || path === '0')

    if (directusPagesDisabled) directusPageNames.forEach((name) => removePageByName(name, pages))

    return pages
  },
}
