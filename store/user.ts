import { MetadataUpdateDto, User, UserProfileUpdateDto } from '@heseya/store-core'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null,
    error: null as any,
  }),

  getters: {},

  actions: {
    setUser(user: User | null) {
      this.user = user
    },

    async fetchProfile() {
      const heseya = useHeseya()
      try {
        const user = await heseya.UserProfile.get()
        this.user = user as User

        return { success: true }
      } catch (e) {
        this.error = e
        return { success: false, error: e }
      }
    },

    async updateProfile(payload: UserProfileUpdateDto) {
      const heseya = useHeseya()
      try {
        const user = await heseya.UserProfile.update(payload)
        this.user = user as User

        return { success: true }
      } catch (e) {
        this.error = e
        return { success: false, error: e }
      }
    },

    async updateProfileMetadataPersonal(payload: MetadataUpdateDto) {
      const heseya = useHeseya()
      try {
        const metadata = await heseya.UserProfile.updateMetadataPersonal(payload)

        if (!this.user) throw new Error('User is not defined')
        this.user.metadata_personal = metadata

        return { success: true }
      } catch (e) {
        this.error = e
        return { success: false, error: e }
      }
    },
  },
})
