import { defineStore } from 'pinia'

export const useSearchHistoryStore = defineStore('searchHistory', {
  state: () => ({
    queries: [] as string[],
  }),

  actions: {
    clearHistory() {
      this.queries = []
    },

    addNewQuery(query: string) {
      if (!this.queries.includes(query)) {
        this.queries.push(query)
      }
    },
  },

  persist: true,
})
