import { ProductList } from '@heseya/store-core'
import { useWishlistStore } from '@/store/wishlist'
import { useAuthStore } from '~/store/auth'

export const useWishlist = (product: ProductList) => {
  const auth = useAuthStore()
  const wishlist = useWishlistStore()
  const { notify } = useNotify()
  const { t } = useI18n({ useScope: 'global' })

  const isInWishlist = ref(false)

  const { refresh } = useLazyAsyncData(`is-in-wishlist-${product.id}`, async () => {
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
