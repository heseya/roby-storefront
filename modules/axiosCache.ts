import { defineNuxtModule } from '@nuxt/kit'
import { LRUCache } from 'lru-cache'

export default defineNuxtModule({
  setup(_options, nuxt) {
    const axCache = new LRUCache({ ttl: parseInt(process.env.SERVER_CACHE_TTL || '0'), max: 200 })

    nuxt.hook('ready', () => {
      // TODO: this does not work
      // @ts-ignore
      nuxt.$axCache = axCache
    })
  },
})
