import { SettingsRecord } from '@heseya/store-core'
import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', {
  state: () => ({
    env: {} as SettingsRecord,
  }),

  getters: {
    storeLogoUrl(): string {
      return this.env.store_logo as string
    },
    storeName(): string {
      return this.env.store_name as string
    },
  },

  actions: {
    async fetchConfig() {
      const heseya = useHeseya()
      this.env = await heseya.Settings.get({ array: true })
    },
  },
})
