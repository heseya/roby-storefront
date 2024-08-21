# Roby Storefront Web template

![Requires Heseya v8.0](https://img.shields.io/badge/Requires_Heseya-v8.0-8f022c)

## IDE

Recommended IDE Plugin: [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install --shamefully-hoist
```

Copy the `.env.example` file to `.env` and fill in the values.

```bash
cp .env.example .env
```

## Development Server

Start the development server on http://localhost:3000

```bash
# yarn
yarn dev

# npm
npm run dev
```

## Environment variables

### API urls

Template uses 3 different APIs. You can change the url of each API by setting the following environment variables.

- Most important is `NUXT_PUBLIC_API_URL` which is used by the application to fetch data from the Heseya API.
- `NUXT_PUBLIC_DIRECTUS_URL` is used by the application to fetch data from the Directus API. This is used for example to fetch the blog posts. This is optional, if you don't have a Directus instance, you can leave this empty.
- `NUXT_PUBLIC_PRICE_TRACKER_URL` is used by the application to fetch data from the Price Tracker API to fullfill the Omnibus requirement.

```env
NUXT_PUBLIC_API_URL=https://api.heseya.com
NUXT_PUBLIC_DIRECTUS_URL=https://cms.heseya.com
NUXT_PUBLIC_PRICE_TRACKER_URL=https://main-price-tracker.heseya.com
```

### Custom pages

In this template there are 5 custom pages available. You can change the path of each page by setting the following environment variables. If you want to disable a page, set the env to _empty_ or to `0`.

```env
BUILD_PAGE_BLOG_PATH=/blog
BUILD_PAGE_CONTACT_PATH=/kontakt
BUILD_PAGE_ABOUT_PATH=/o-nas
BUILD_PAGE_RENT_PATH=/wynajem
BUILD_PAGE_STATUTE_PATH=/regulamin
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## License

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fheseya%2Froby-storefront.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fheseya%2Froby-storefront?ref=badge_large)
