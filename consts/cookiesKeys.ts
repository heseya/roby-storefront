import type { CookieOptions } from 'nuxt/app'

/**
 * Names of the cookies used by the application.
 */

export const ACCESS_TOKEN_KEY = 'h_access_token'

export const IDENTITY_TOKEN_KEY = 'h_identity_token'

export const REFRESH_TOKEN_KEY = 'h_refresh_token'

export const SALES_CHANNEL_KEY = 'h_sales_channel'

export const SALES_CHANNEL_STATUS = 'h_sales_channel_status'

export const SALES_CHANNEL_NAME = 'channel_name'

export const COOKIE_REQUIRED_ACCEPTED_KEY = 'h_cookies_required_accepted'

export const COOKIE_FUNCTIONAL_ACCEPTED_KEY = 'h_cookies_functional_accepted'

export const COOKIE_ANALYTICS_ACCEPTED_KEY = 'h_cookies_analytics_accepted'

export const COOKIE_ADS_ACCEPTED_KEY = 'h_cookies_ads_accepted'

export const COOKIES_CONFIG: CookieOptions = {
  maxAge: 365 * 24 * 60 * 60,
  path: '/',
} as const
