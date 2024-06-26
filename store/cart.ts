import { CartItem, HeseyaEvent, restoreCart } from '@heseya/store-core'
import type {
  CartDto,
  CartItemDto,
  CartItemSchema,
  Coupon,
  ProductListed,
  SaleShort,
  SavedCartItem,
  Schema,
} from '@heseya/store-core'
import { isAfter } from 'date-fns/isAfter'
import cloneDeep from 'lodash/cloneDeep'
import { defineStore } from 'pinia'
import isEqual from 'lodash/isEqual'
import uniqBy from 'lodash/uniqBy'

import { CanceledError } from 'axios'
import { useCheckoutStore } from './checkout'
import { useConfigStore } from './config'

export type CartCoupon = Coupon & { effective_value?: string }

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
    isProcessing: false,
    error: null as any, // TODO: show this error somewhere in the UI
    coupons: [] as CartCoupon[],
    sales: [] as SaleShort[],
    totalValue: 0,
    totalValueInitial: 0,
    shippingPrice: 0,
    shippingTime: null as number | null,
    shippingDate: null as string | null,
    summary: 0,
    unavailableItems: [] as CartItem[],
  }),

  getters: {
    length(): number {
      return this.items.reduce((total, item) => total + item.totalQty, 0)
    },
    calcedTotalValue(): number {
      return this.items.reduce((acc, curr) => acc + curr.totalPrice, 0)
    },
    totalDiscountValue(): number {
      return this.totalValueInitial - this.totalValue
    },

    isPhisicalShippingNeeded(): boolean {
      return this.items.some((i) => !i.shippingDigital)
    },
    isDigitalShippingNeeded(): boolean {
      return this.items.some((i) => i.shippingDigital)
    },
    allowPaczkomatDelivery(): boolean {
      const config = useConfigStore()
      // Always allow paczkomat delivery if is not restricted
      if (config.env.restrict_paczkomat_delivery !== '1') return true
      // Otherwise, all items must have allow_paczkomat_delivery set to true
      return this.items.every((item) => item.product.metadata?.allow_paczkomat_delivery ?? false)
    },
    orderItems(): CartItemDto[] {
      return this.items.map((i) => i.getOrderObject())
    },
    cartDto(): CartDto {
      const checkout = useCheckoutStore()
      const channel = useSalesChannel()
      const currency = useCurrency()

      return {
        items: this.items.map((item) => item.getOrderObject()),
        coupons: this.coupons.map((coupon) => coupon.code),
        shipping_method_id: checkout.shippingMethod?.id,
        digital_shipping_method_id: checkout.digitalShippingMethod?.id,
        sales_channel_id: channel.value?.id || '',
        currency: currency.value,
      }
    },

    shippingTimeDescription(): string {
      const t = useGlobalI18n()

      if (this.shippingDate && isAfter(new Date(this.shippingDate), new Date())) {
        return `${t('shippingTime.from')} ${formatDate(new Date(this.shippingDate))}`
      }
      if (this.shippingTime) {
        const hours = Math.round(this.shippingTime * 24)
        return `${t('shippingTime.in')} ${
          hours <= 72 ? `${hours}h` : `${this.shippingTime} ${t('shippingTime.workDays')}`
        }`
      }
      return ''
    },
  },

  actions: {
    async processCart() {
      const heseya = useHeseya()
      if (!this.length) {
        this.clear()
        return
      }

      this.isProcessing = true
      this.error = null
      try {
        const cart = await heseya.Orders.processCart(this.cartDto)

        this.sales = cart.sales

        this.coupons = cart.coupons.map((coupon) => ({
          ...this.coupons.find((c) => c.id === coupon.id)!,
          effective_value: coupon.value,
        }))

        this.unavailableItems = uniqBy(
          [
            ...this.unavailableItems,
            ...this.items.filter(
              (item) => !cart.items.find((cartItem) => cartItem.cartitem_id === item.id),
            ),
          ],
          'id',
        )

        this.items = mergeCartItems(
          cart.items.map((item) => {
            const cartItem = this.items.find((cartItem) => cartItem.id === item.cartitem_id)!
            return cloneDeep(cartItem)
              .updateQuantity(item.quantity)
              .setPrecalculatedPrices(parseFloat(item.price_discounted), parseFloat(item.price))
          }),
        )

        this.totalValue = parseFloat(cart.cart_total)
        this.totalValueInitial = parseFloat(cart.cart_total_initial)

        this.shippingPrice = parseFloat(cart.shipping_price)
        this.shippingTime = cart.shipping_time
        this.shippingDate = cart.shipping_date
        this.summary = parseFloat(cart.summary)

        // Side effect: fetch the shipping method
        // dispatch('shippingMethods/fetch', state.totalValue, { root: true })
      } catch (e: any) {
        // Ignore canceled or failed requests
        if (e instanceof CanceledError || e.code === 'ERR_NETWORK') return

        // If request is ended with an error, reset checkout data
        const checkout = useCheckoutStore()
        this.error = e
        this.unavailableItems = this.items
        this.items = []
        this.summary = 0
        checkout.$reset()
      }
      this.isProcessing = false
    },

    setQuantity(id: string, value: number) {
      const ev = useHeseyaEventBus()
      const cartItem = this.items.find((i) => i.id === id)
      if (!cartItem) return

      if (value <= 0) this.remove(id)
      else {
        const updatedCartItem = cartItem.updateQuantity(value)

        const itemIndex = this.items.findIndex((item) => item.id === updatedCartItem.id)
        this.items[itemIndex] = updatedCartItem

        const quantityDiff = value - cartItem.totalQty
        if (quantityDiff > 0) ev.emit(HeseyaEvent.AddToCart, cartItem.updateQuantity(quantityDiff))
        else ev.emit(HeseyaEvent.RemoveFromCart, cartItem.updateQuantity(-quantityDiff))

        this.processCart()
      }
    },

    increaseQuantity(itemId: string) {
      const cartItem = this.items.find((i) => i.id === itemId)
      if (!cartItem) return
      this.setQuantity(itemId, cartItem.totalQty + 1)
    },

    decreaseQuantity(itemId: string) {
      const cartItem = this.items.find((i) => i.id === itemId)
      if (!cartItem) return
      this.setQuantity(itemId, cartItem.totalQty - 1)
    },

    add({
      product,
      schemas,
      schemaValue,
      quantity = 1,
    }: {
      product: ProductListed
      schemaValue: CartItemSchema[]
      schemas: Schema[]
      quantity: number
    }) {
      const ev = useHeseyaEventBus()
      const currency = useCurrency()
      const newCartItem = new CartItem(product, quantity, schemas, schemaValue, [], currency.value)
      const existingCartItem = this.items.find(
        (item) => item.id === newCartItem.id && isEqual(item.schemas, newCartItem.schemas),
      )

      if (!existingCartItem) {
        ev.emit(HeseyaEvent.AddToCart, newCartItem)
        this.items = [...this.items, newCartItem]
        this.processCart()
      } else {
        this.setQuantity(existingCartItem.id, existingCartItem.totalQty + quantity)
      }
    },

    remove(itemId: string) {
      const ev = useHeseyaEventBus()
      const item = this.items.find((i) => i.id === itemId)
      if (!item) return
      // const oldType = getShippingTypeFromCart(this.items)

      ev.emit(HeseyaEvent.RemoveFromCart, item as CartItem)
      this.items = this.items.filter((item) => item.id !== itemId)

      // const newType = getShippingTypeFromCart(this.items)

      // If shipping type for order changes, checkout data should be reset
      // if (oldType !== newType) dispatch('checkout/reset', null, { root: true })

      this.processCart()
    },

    clear() {
      this.items = []
      this.unavailableItems = []
      this.coupons = []
      this.sales = []
      this.totalValue = 0
      this.totalValueInitial = 0
      this.shippingPrice = 0
      this.shippingTime = null
      this.shippingDate = null
      this.summary = 0
    },

    addCoupon(coupon: Coupon) {
      // ignore duplicate coupons
      if (this.coupons.find((item) => item.id === coupon.id)) return
      this.coupons = [...this.coupons, coupon]
      this.processCart()
    },

    removeCoupon(couponId: string) {
      this.coupons = this.coupons.filter((item) => item.id !== couponId)
      this.processCart()
    },
  },

  persist: true,

  hydrate(storeState) {
    if (storeState?.items.length) {
      // CartItem class is saved in JSON as plain object, and needs to be restored
      storeState.items = restoreCart(storeState.items as unknown as SavedCartItem[])
    }
    if (storeState?.unavailableItems.length) {
      // CartItem class is saved in JSON as plain object, and needs to be restored
      storeState.unavailableItems = restoreCart(
        storeState.unavailableItems as unknown as SavedCartItem[],
      )
    }
  },
})
