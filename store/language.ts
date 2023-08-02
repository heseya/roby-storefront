import { defineStore } from 'pinia'
import { Language } from '@heseya/store-core'

export const useLanguageStore = defineStore('language', {
  state: () => ({
    languages: [] as Language[],
  }),

  getters: {
    currentApiLanguage(): Language | undefined {
      const { localeProperties } = useI18n()
      const currentLanguage = localeProperties.value.iso
      const language = this.languages.find((lang) => currentLanguage?.includes(lang.iso))
      return language || undefined
    },
  },

  actions: {
    async fetchApiLanguages(): Promise<void> {
      const heseya = useHeseya()
      const { data } = await heseya.Languages.get()
      this.languages = data
    },
  },
})
