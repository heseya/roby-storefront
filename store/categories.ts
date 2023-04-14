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
      return this.categories.filter((category) => category.metadata[CATEGORY_IN_NAV_KEY])
    },
  },

  actions: {
    async fetchRootCategory() {
      const heseya = useHeseya()
      const config = useConfigStore()

      this.rootCategory = await heseya.ProductSets.getOneBySlug(
        config.env.root_category_slug as string,
      )
    },

    async fetchRootCategories() {
      const heseya = useHeseya()
      if (!this.rootCategory) await this.fetchRootCategory()

      const { data } = await heseya.ProductSets.get({ parent_id: this.rootCategory!.id })
      this.categories = data

      // Preload all subcategories for all root categories
      await Promise.all(this.categories.map((category) => this.getSubcategories(category.id)))
    },

    async getSubcategories(parentId: string) {
      const heseya = useHeseya()

      if (!this.subcategoriesMap[parentId]) {
        const { data } = await heseya.ProductSets.get({ parent_id: parentId })
        this.subcategoriesMap[parentId] = data
      }

      return this.subcategoriesMap[parentId]
    },
  },
})
