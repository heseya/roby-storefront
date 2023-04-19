import { defineStore } from 'pinia'
export const useNotificationBarStore = defineStore('notificationBar', {
  state: () => ({
    isOpen: true as boolean,
    notification: '' as string,
  }),

  actions: {
    setIfNewNotification(newNotification: string) {
      if (newNotification === this.notification) {
        return
      }

      this.isOpen = true
      this.notification = newNotification
    },

    closeNotification() {
      this.isOpen = false
    },
  },

  persist: true,
})
