import { createClient } from '@vercel/kv'
import { StorageValue, buildMemoryStorage, buildStorage } from 'axios-cache-interceptor'

/**
 * For now it is not used cause it works badly
 */
export const createServerStorage = () => {
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) return buildMemoryStorage()

  const kv = createClient({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
  })

  return buildStorage({
    async find(key) {
      const result = await kv.get(`axios-cache:${key}`)
      return (result || undefined) as StorageValue | undefined
    },

    // We use canStale function here because we shouldn't let
    // redis remove automatically the key if it can enter the
    // stale state.
    async set(key, value) {
      await kv.set(`axios-cache:${key}`, JSON.stringify(value))
    },

    async remove(key) {
      await kv.del(`axios-cache:${key}`)
    },
  })
}
