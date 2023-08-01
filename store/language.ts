import { defineStore } from 'pinia'
import { Language } from '@heseya/store-core'

export const useLanguageStore = defineStore('language', {
  state: () => ({
    apiLanguages: [] as Language[],
  }),

  getters: {
    getCurrentApiLanguage(): Language | undefined {
      const nuxtApp = useNuxtApp()
      const currentLanguage = nuxtApp.$i18n.localeProperties.value
      const language = this.apiLanguages.find((lang) => currentLanguage.iso?.includes(lang.iso))
      return language || undefined
    },
  },

  actions: {
    async fetchApiLanguages(): Promise<void> {
      const heseya = useHeseya()
      const { data } = await heseya.Languages.get()
      this.apiLanguages = data
    },
  },
})
