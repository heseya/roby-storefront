import { CartItem } from '@heseya/store-core'

export const mergeCartItems = (list: CartItem[]) => {
  const uniqueIds = [...new Set(list.map((listItem) => listItem.id))]

  const mergedCartItems = uniqueIds.reduce<CartItem[]>((acc, uniqueId: string) => {
    const sameIdItems = list.filter((item) => item.id === uniqueId)
    if (sameIdItems.length > 1) {
      sameIdItems[0].setChildren(sameIdItems.slice(1, Infinity))
      return [...acc, sameIdItems[0]]
    }
    sameIdItems[0].setChildren([])
    return [...acc, sameIdItems[0]]
  }, [])
  return mergedCartItems
}

// TODO: May be a good idea to place it in @heseya/store-core
