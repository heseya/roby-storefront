import { ProductList } from '@heseya/store-core'
import { useWishlistStore } from '@/store/wishlist'

export const useWishlist = (product: ProductList) => {
  const wishlist = useWishlistStore()

  const isInWishlist = computed(() => wishlist.isInWishlist(product.id))

  const add = () => wishlist.add(product)

  const remove = () => wishlist.remove(product.id)

  const toggle = () => {
    if (isInWishlist.value) remove()
    else add()
  }

  return { isInWishlist, add, remove, toggle }
}
