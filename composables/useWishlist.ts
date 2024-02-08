import { useWishlistStore } from '@/store/wishlist'
import { useAuthStore } from '@/store/auth'

import type { ExtendedProductList } from '@/types/Product'

export const useWishlist = (product: ExtendedProductList) => {
  const auth = useAuthStore()
  const wishlist = useWishlistStore()
  const { notify } = useNotify()
  const { t } = useI18n({ useScope: 'global' })

  const isInWishlist = ref(false)

  const { refresh } = useLazyAsyncData(async () => {
    if (product.isInWishlist !== undefined) {
      isInWishlist.value = product.isInWishlist
      return
    }

    isInWishlist.value = await wishlist.isInWishlist(product.id)
  })

  const add = async () => {
    await wishlist.add(product)
    isInWishlist.value = true
    notify({ text: t('wishlist.added'), type: 'success' })
  }

  const remove = async () => {
    await wishlist.remove(product.id)
    isInWishlist.value = false
    notify({ text: t('wishlist.removed'), type: 'success' })
  }

  const toggle = () => {
    return isInWishlist.value ? remove() : add()
  }

  watch(
    () => auth.isLogged,
    () => refresh(),
  )

  return { isInWishlist, add, remove, toggle }
}
