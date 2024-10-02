import type {
  MetadataUpdateDto,
  Organization,
  User,
  UserProfileUpdateDto,
  UserSavedAddress,
  UserSavedAddressCreateDto,
} from '@heseya/store-core'
import { defineStore } from 'pinia'

type FrontOrganization = Organization & {
  shipping_addresses: UserSavedAddress[]
}

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null,
    organization: null as FrontOrganization | null,
    error: null as any,
  }),

  getters: {},

  actions: {
    setUser(user: User | null) {
      this.user = user
    },
    setOrganization(organization: FrontOrganization | null) {
      this.organization = organization
    },

    async fetchProfile() {
      const heseya = useHeseya()
      try {
        const user = await heseya.UserProfile.get()
        this.setUser(user as User)

        await this.fetchOrganization()

        return { success: true }
      } catch (e: any) {
        this.error = e.message
        return { success: false, error: e.message }
      }
    },

    async fetchOrganization() {
      const heseya = useHeseya()

      try {
        const organization = await heseya.UserProfile.My.Organization.get()

        this.setOrganization({ ...organization, shipping_addresses: [] })
        await this.fetchOrganizationShippingAddresses()
        return { success: true }
      } catch (e: any) {
        this.error = e.message
        return { success: false, error: e.message }
      }
    },

    async fetchOrganizationShippingAddresses() {
      const heseya = useHeseya()

      try {
        const addresses = await heseya.UserProfile.My.Organization.ShippingAddresses.get()
        this.organization!.shipping_addresses = addresses.data || []
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

    async saveShippingAddress(payload: UserSavedAddressCreateDto) {
      const heseya = useHeseya()
      try {
        const address = await heseya.UserProfile.My.ShippingAddresses.create(payload)
        this.user?.shipping_addresses.push(...address)
      } catch (e) {
        return { success: false, error: e }
      }
    },

    async saveBillingAddress(payload: UserSavedAddressCreateDto) {
      const heseya = useHeseya()
      try {
        const address = await heseya.UserProfile.My.BillingAddresses.create(payload)
        this.user?.billing_addresses.push(...address)
      } catch (e) {
        return { success: false, error: e }
      }
    },
  },
})
