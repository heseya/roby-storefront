import { defineStore } from 'pinia'
export const useNavNotificationBarStore = defineStore('navNotificationBar', {
  state: () => ({
    isOpen: true as boolean,
    text: '' as string,
  }),

  actions: {
    setIfNew(newText: string) {
      if (newText === this.text) {
        return
      }

      this.isOpen = true
      this.text = newText
    },

    close() {
      this.isOpen = false
    },
  },

  persist: true,
})
