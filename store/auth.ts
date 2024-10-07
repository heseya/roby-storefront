import { AuthProviderKey, HeseyaEvent } from '@heseya/store-core'
import { defineStore } from 'pinia'

import { useUserStore } from './user'
import { useWishlistStore } from './wishlist'
import { LOGGED_IN_THE_PAST_KEY } from '~/consts/localstorageKeys'
import { useChannelsStore } from '~/store/channels'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    error: null as any,
  }),

  getters: {
    isLogged() {
      const accessToken = useAccessToken()
      return !!accessToken.value
    },
  },

  actions: {
    setTokens({
      accessToken,
      identityToken,
      refreshToken,
    }:
      | { accessToken: string; identityToken: string; refreshToken: string }
      | { accessToken: null; identityToken: null; refreshToken: null }) {
      const accessTokenCookie = useAccessToken()
      const identityTokenCookie = useIdentityToken()
      const refreshTokenCookie = useRefreshToken()

      accessTokenCookie.value = accessToken || ''
      identityTokenCookie.value = identityToken || ''
      refreshTokenCookie.value = refreshToken || ''
    },

    async login(
      payload:
        | { email: string; password: string }
        | {
            provider: AuthProviderKey
            returnUrl: string
          },
    ) {
      const heseya = useHeseya()
      const ev = useHeseyaEventBus()
      const userStore = useUserStore()
      const wasLoggedInPast = useLocalStorage(LOGGED_IN_THE_PAST_KEY, false)

      const isPasswordLogin = 'email' in payload

      try {
        const { user, ...tokens } = isPasswordLogin
          ? await heseya.Auth.login(payload.email, payload.password)
          : await heseya.Auth.Providers.login(payload.provider, payload.returnUrl)

        userStore.setUser(user)
        this.setTokens(tokens)

        await userStore.fetchOrganization()

        ev.emit(HeseyaEvent.Login, user)
        wasLoggedInPast.value = true
        return { success: true }
      } catch (error) {
        this.error = error
        return {
          success: false,
          error,
        }
      }
    },

    async logout() {
      const heseya = useHeseya()
      const wishlish = useWishlistStore()
      const channelStore = useChannelsStore()
      const channels = channelStore.channels
      const defaultChannel = channels.find((c) => c.default)

      try {
        await heseya.Auth.logout().then(() => channelStore.setChannel(defaultChannel?.id))
      } catch (e) {
        this.error = e
        // eslint-disable-next-line no-console
        console.error('Logout in API failed', e)
      } finally {
        this.clearAuth()

        // Clear local wishlist after logout
        wishlish.$reset()

        const router = useRouter()
        // After logout, redirect to the current route to make the middleware work
        await router.push({ path: router.currentRoute.value.fullPath })
      }
    },

    clearAuth() {
      const userStore = useUserStore()
      userStore.setUser(null)
      userStore.setOrganization(null)
      this.setTokens({ accessToken: null, identityToken: null, refreshToken: null })
    },
  },

  persist: true,
})
