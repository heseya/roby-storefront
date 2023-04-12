import { defineStore } from 'pinia'

// TODO: this store is a simple mock for test purposes
export const useAuthStore = defineStore('auth', {
  state: () => ({
    state: false,
  }),

  getters: {
    isLogged(): boolean {
      return this.state
    },
  },

  actions: {
    login() {
      this.state = true
      return Promise.resolve(this.isLogged)
    },
    logout() {
      this.state = false
      return Promise.resolve(this.isLogged)
    },
  },

  persist: true,
})
