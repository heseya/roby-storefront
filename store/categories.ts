import { ProductSet, ProductSetList } from '@heseya/store-core'
import { defineStore } from 'pinia'
import { useConfigStore } from './config'
import { CATEGORY_IN_NAV_KEY } from '@/consts/metadataKeys'

export const useCategoriesStore = defineStore('categories', {
  state: () => ({
    rootCategory: null as ProductSet | null,
    categories: [] as ProductSetList[],
    subcategoriesMap: {} as Record<string, ProductSetList[]>,
  }),

  getters: {
    navCategories(): ProductSetList[] {
      const showRootCategory =
        !!this.rootCategory?.metadata[CATEGORY_IN_NAV_KEY] && this.rootCategory

      return ([] as ProductSetList[])
        .concat(showRootCategory ? [{ ...this.rootCategory!, parent_id: null }] : [])
        .concat(this.categories.filter((category) => category.metadata[CATEGORY_IN_NAV_KEY]))
    },
  },

  actions: {
    async fetchRootCategory() {
      try {
        const heseya = useHeseya()
        const config = useConfigStore()

        this.rootCategory = await heseya.ProductSets.getOneBySlug(
          config.env.root_category_slug?.toString() || 'all',
        )
      } catch (e: any) {
        // eslint-disable-next-line no-console
        console.warn('Failed to fetch root category:', e.message)
      }
    },

    async fetchRootCategories() {
      const heseya = useHeseya()
      await this.fetchRootCategory()

      if (!this.rootCategory) {
        // eslint-disable-next-line no-console
        console.warn('Root category not found, skiping...')
        return
      }

      const { data } = await heseya.ProductSets.get({ parent_id: this.rootCategory.id })
      this.categories = data
      // Preload all subcategories for all root categories
      await Promise.all(data.map((category) => this.getSubcategories(category.id)))
    },

    async getSubcategories(parentId: string) {
      const heseya = useHeseya()

      if (!this.subcategoriesMap[parentId]) {
        const { data, pagination } = await heseya.ProductSets.get({
          parent_id: parentId,
          limit: 50,
        })

        if (pagination.total > pagination.perPage)
          // eslint-disable-next-line no-console
          console.warn('Not all subcategories are loaded due to the pagination limit')

        this.subcategoriesMap[parentId] = data
      }

      return this.subcategoriesMap[parentId]
    },
  },
})
