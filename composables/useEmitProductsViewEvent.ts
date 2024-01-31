import { HeseyaEvent } from '@heseya/store-core'
import type { ProductList } from '@heseya/store-core'
import type { MaybeRef } from '@vueuse/core'

export const useEmitProductsViewEvent = (
  products: MaybeRef<ProductList[]>,
  listTitle: MaybeRef<string>,
) => {
  const ev = useHeseyaEventBus()

  const targetIsVisible = useElementVisibility(useParentElement())
  const wasEventEmitted = ref(false)

  const emitViewEvent = () => {
    if (wasEventEmitted.value) return

    const productsLength = unref(products).length
    if (!productsLength) return

    ev.emit(HeseyaEvent.ViewProductList, {
      set: { name: unref(listTitle) },
      items: unref(products) || [],
    })

    wasEventEmitted.value = true
  }

  // TODO: when navigating between categories in ListPage, this runs even if the products are the same
  watch(products, () => {
    // Reset visibility if products change
    wasEventEmitted.value = false

    // Emit event if products are visible after change
    if (targetIsVisible.value) emitViewEvent()
  })

  watch(targetIsVisible, () => emitViewEvent())

  return emitViewEvent
}
