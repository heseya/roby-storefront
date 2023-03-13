import { SettingsRecord } from '@heseya/store-core'
import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', {
  state: () => ({
    env: {} as SettingsRecord,
  }),

  actions: {
    async fetchConfig() {
      const heseya = useHeseya()
      this.env = await heseya.Settings.get({ array: true })
    },
  },
})
