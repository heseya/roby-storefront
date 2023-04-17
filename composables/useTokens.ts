import { ACCESS_TOKEN_KEY, IDENTITY_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/consts/cookiesKeys'

export const useAccessToken = () => {
  const accessTokenCookie = useStatefulCookie(ACCESS_TOKEN_KEY)
  return accessTokenCookie
}

export const useIdentityToken = () => {
  const identityTokenCookie = useStatefulCookie(IDENTITY_TOKEN_KEY)
  return identityTokenCookie
}

export const useRefreshToken = () => {
  const refreshTokenCookie = useStatefulCookie(REFRESH_TOKEN_KEY)
  return refreshTokenCookie
}
