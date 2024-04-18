# Env Migration Guide

During development of version `2.2` of this template, we have introduced a new way of handling environment variables. This change was made to make the project more flexible and to make it easier to deploy the project to different environments. Below are list of names of the environment variables that have been changed and their new names.

## Build time environment variables

| Old name                    | New name                     |
| --------------------------- | ---------------------------- |
| `ENVIRONMENT`, `VERCEL_ENV` | `NODE_ENV`                   |
| `DEFAULT_LANGUAGE`          | `BUILD_DEFAULT_LANGUAGE`     |
| `ALLOWED_UI_LANGUAGES`      | `BUILD_ALLOWED_UI_LANGUAGES` |

## Runtime environment variables

### Public runtime environment variables

| Old name                   | New name                               |
| -------------------------- | -------------------------------------- |
| -                          | `NUXT_PUBLIC_PRODUCTION`               |
| `API_URL`                  | `NUXT_PUBLIC_API_URL`                  |
| `CDN_URL`                  | `NUXT_PUBLIC_CDN_URL`                  |
| `DIRECTUS_URL`             | `NUXT_PUBLIC_DIRECTUS_URL`             |
| `PRICE_TRACKER_URL`        | `NUXT_PUBLIC_PRICE_TRACKER_URL`        |
| `APP_HOST`                 | `NUXT_PUBLIC_I18N_BASE_URL`            |
| `RECAPTCHA_PUBLIC`         | `NUXT_PUBLIC_RECAPTCHA_PUBLIC`         |
| `GOOGLE_TAG_MANAGER_ID`    | `NUXT_PUBLIC_GOOGLE_TAG_MANAGER_ID`    |
| `CENEO_GUID`               | `NUXT_PUBLIC_CENEO_GUID`               |
| `LEASLINK_ID`              | `NUXT_PUBLIC_LEASLINK_ID`              |
| `CALLPAGE_ID`              | `NUXT_PUBLIC_CALLPAGE_ID`              |
| `EDRONE_ID`                | `NUXT_PUBLIC_EDRONE_ID`                |
| `GOOGLE_SITE_VERIFICATION` | `NUXT_PUBLIC_GOOGLE_SITE_VERIFICATION` |
| `COLOR_THEME_PICKER`       | `NUXT_PUBLIC_COLOR_THEME_PICKER`       |
| `AXIOS_CACHE_TTL`          | `NUXT_PUBLIC_AXIOS_CACHE_TTL`          |
| `FONT_FAMILY`              | `NUXT_PUBLIC_FONT_FAMILY`              |
| `EKOMI_CUSTOMER_ID`        | `NUXT_PUBLIC_EKOMI_CUSTOMER_ID`        |
| `EKOMI_POPUP_TOKEN`        | `NUXT_PUBLIC_EKOMI_POPUP_TOKEN`        |
| `EKOMI_MINI_STARS_TOKEN`   | `NUXT_PUBLIC_EKOMI_MINI_STARS_TOKEN`   |
| `EKOMI_REVIEWS_TOKEN`      | `NUXT_PUBLIC_EKOMI_REVIEWS_TOKEN`      |
| `EKOMI_SURVEY_FORM_ID`     | `NUXT_PUBLIC_EKOMI_SURVEY_FORM_ID`     |
| `PAGE_BLOG_PATH`           | `NUXT_PUBLIC_PAGE_BLOG_PATH`           |
| `PAGE_CONTACT_PATH`        | `NUXT_PUBLIC_PAGE_CONTACT_PATH`        |
| `PAGE_ABOUT_PATH`          | `NUXT_PUBLIC_PAGE_ABOUT_PATH`          |
| `PAGE_RENT_PATH`           | `NUXT_PUBLIC_PAGE_RENT_PATH`           |
| `PAGE_STATUTE_PATH`        | `NUXT_PUBLIC_PAGE_STATUTE_PATH`        |

#### Not affected

| Name                              |
| --------------------------------- |
| `NUXT_PUBLIC_GOOGLE_ANALYTICS_ID` |
| `NUXT_PUBLIC_GOOGLE_ADS_ID`       |
| `NUXT_PUBLIC_SENTRY_DSN`          |
| `NUXT_PUBLIC_SENTRY_ENVIRONMENT`  |

### Private runtime environment variables

| Old name              | New name                   |
| --------------------- | -------------------------- |
| `MAIL_HOST`           | `NUXT_MAIL_HOST`           |
| `MAIL_USER`           | `NUXT_MAIL_USER`           |
| `MAIL_SENDER`         | `NUXT_MAIL_SENDER`         |
| `MAIL_PASSWORD`       | `NUXT_MAIL_PASSWORD`       |
| `MAIL_RECEIVER`       | `NUXT_MAIL_RECEIVER`       |
| `MAIL_PORT`           | `NUXT_MAIL_PORT`           |
| `MIN_RECAPTCHA_SCORE` | `NUXT_MIN_RECAPTCHA_SCORE` |
| `RECAPTCHA_SECRET`    | `NUXT_RECAPTCHA_SECRET`    |
