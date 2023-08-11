import { SeoMetadata, SettingsRecord } from '@heseya/store-core'
import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', {
  state: () => ({
    env: {} as SettingsRecord,
    seo: {} as SeoMetadata,
  }),

  getters: {
    storeLogoUrl(): string {
      return this.env.store_logo as string
    },
    footerLogoUrl(): string {
      return this.env.footer_store_logo as string
    },
    faviconUrl(): string {
      return this.env.favicon_url as string
    },
    storeName(): string {
      return this.env.store_name as string
    },

    isTraditionalTransfer(): boolean {
      return this.env.allow_traditional_transfer === '1'
    },

    storeFrontDisabled(): boolean {
      return this.env.storefront_disabled === '1'
    },

    productSubtextAttr(): string {
      return String(this.env.product_subtext_attribute_name)
    },

    customRedirect(): { url: string; text: string; icon: string | null } | null {
      const url = this.env.custom_nav_redirect_url
      const text = this.env.custom_nav_redirect_text
      if (!url || !text) return null

      return {
        url: String(url),
        text: String(text),
        icon: String(this.env.custom_nav_redirect_icon) || null,
      }
    },
  },

  actions: {
    async fetchConfig() {
      try {
        const heseya = useHeseya()
        this.env = await heseya.Settings.get({ array: true })
      } catch (error) {
        // eslint-disable-next-line no-console
        console.warn('[CONFIG] Failed to fetch', error)
      }
    },
    async fetchSeo() {
      try {
        const heseya = useHeseya()
        this.seo = await heseya.GlobalSeo.get()
      } catch (error) {
        // eslint-disable-next-line no-console
        console.warn('[SEO] Failed to fetch', error)
      }
    },
  },
})
