import { defineStore } from 'pinia'
import { Language } from '@heseya/store-core'

export const useLanguageStore = defineStore('language', {
  state: () => ({
    languages: [] as Language[],
  }),

  actions: {
    async fetchApiLanguages(): Promise<void> {
      const heseya = useHeseya()
      const { data } = await heseya.Languages.get()
      this.languages = data
    },

    getLanguageByIso(iso: string): Language | undefined {
      return this.languages.find((lang) => lang.iso.includes(iso))
    },
  },

  persist: true,
})
