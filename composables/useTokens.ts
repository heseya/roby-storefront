import { ACCESS_TOKEN_KEY, IDENTITY_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/consts/cookiesKeys'

export const useAccessToken = () => useStatefulCookie(ACCESS_TOKEN_KEY)

export const useIdentityToken = () => useStatefulCookie(IDENTITY_TOKEN_KEY)

export const useRefreshToken = () => useStatefulCookie(REFRESH_TOKEN_KEY)
