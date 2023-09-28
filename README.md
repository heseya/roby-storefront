# Roby Storefront Web template

![Requires Heseya v6.0](https://img.shields.io/badge/Requires_Heseya-v6.0-8f022c)

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

- Most important is `API_URL` which is used by the application to fetch data from the Heseya API.
- `DIRECTUS_URL` is used by the application to fetch data from the Directus API. This is used for example to fetch the blog posts. This is optional, if you don't have a Directus instance, you can leave this empty.
- `PRICE_TRACKER_URL` is used by the application to fetch data from the Price Tracker API to fullfill the Omnibus requirement.

```env
API_URL=https://demo-***REMOVED***.***REMOVED***
DIRECTUS_URL=https://cms.heseya.com
PRICE_TRACKER_URL=https://main-price-tracker.app.***REMOVED***
```

### Custom pages

In this template there are 5 custom pages available. You can change the path of each page by setting the following environment variables. If you want to disable a page, set the env to _empty_ or to `0`.

```env
PAGE_BLOG_PATH=/blog
PAGE_CONTACT_PATH=/kontakt
PAGE_ABOUT_PATH=/o-nas
PAGE_RENT_PATH=/wynajem
PAGE_STATUTE_PATH=/regulamin
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
