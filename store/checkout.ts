import {
  Address,
  AddressDto,
  CartItem,
  HeseyaEvent,
  MetadataCreateDto,
  OrderCreateDto,
  ShippingMethod,
  ShippingType,
} from '@heseya/store-core'
import { defineStore } from 'pinia'
import { useCartStore } from './cart'
import { Paczkomat } from '@/interfaces/Paczkomat'
import { EMPTY_ADDRESS } from '@/consts/address'
import { useCeneo } from "~/composables/useCeneo";

export const useCheckoutStore = defineStore('checkout', {
  state: () => ({
    email: '',
    comment: '',
    shippingAddress: { ...EMPTY_ADDRESS } as Address,
    shippingPointId: null as string | null,
    billingAddress: { ...EMPTY_ADDRESS } as Address,
    shippingMethod: null as ShippingMethod | null,
    digitalShippingMethod: null as ShippingMethod | null,
    paczkomat: null as Paczkomat | null,
    invoiceRequested: false,
    paymentMethodId: null as string | null,
    consents: {
      statute: false,
      newsletter: false,
      ceneo: false,
    },
  }),

  getters: {
    orderShippingPlace(): string | AddressDto | undefined {
      if (!this.shippingMethod) return undefined
      if (this.shippingMethod.shipping_type === ShippingType.Point)
        return this.shippingPointId || undefined
      if (this.isInpostShippingMethod) return this.paczkomat?.name
      return this.shippingAddress
    },

    metadataOrder(): MetadataCreateDto {
      const res: MetadataCreateDto = {}
      const { enabled: ceneoEnabled } = useCeneo()

      if (this.isInpostShippingMethod) {
        Object.assign(res, {
          inpost_phone: this.shippingAddress.phone,
          inpost_point: this.orderShippingPlace as string,
        })
      }

      if (ceneoEnabled && this.consents.ceneo) {
        Object.assign(res, {
          ceneo_survey_consent: this.consents.ceneo,
        })
      }

      return res
    },

    orderDto(): OrderCreateDto | null {
      const cart = useCartStore()
      const channel = useSalesChannel()
      const currency = useCurrency()

      if (!(this.shippingAddress || this.billingAddress)) return null
      return {
        email: this.email,
        comment: this.comment,
        shipping_place: this.isInpostShippingMethod
          ? `${this.orderShippingPlace as string} | tel.: ${this.shippingAddress.phone}`
          : this.orderShippingPlace,
        items: cart.orderItems,
        shipping_method_id: this.shippingMethod?.id,
        digital_shipping_method_id: this.digitalShippingMethod?.id,
        invoice_requested: !!this.invoiceRequested,
        billing_address: isAddressValid(this.billingAddress)
          ? this.billingAddress
          : this.shippingAddress,
        coupons: cart.coupons.map((c) => c.code),
        sales_ids: cart.sales.map((s) => s.id),
        sales_channel_id: channel.value?.id || '',
        currency: currency.value,
        metadata: this.metadataOrder,
      }
    },

    isInpostShippingMethod(): boolean {
      return !!(
        this.shippingMethod?.shipping_type === ShippingType.PointExternal &&
        this.shippingMethod?.metadata.paczkomat
      )
    },

    isShippingAddressValid(): boolean {
      return isAddressValid(this.shippingAddress)
    },

    requirePaymentMethod(): boolean {
      /**
       * If selected shipping method has payment on delivery, then payment method is not required
       */
      return !this.shippingMethod?.payment_on_delivery ?? true
    },

    isValid(): boolean {
      if (!this.email) return false

      if (!this.consents.statute) return false

      // TODO: not all orders requires phisical shipping method
      if (!this.shippingMethod) return false
      if (this.requirePaymentMethod && !this.paymentMethodId) return false
      if (this.shippingMethod && !this.orderShippingPlace) return false
      if (
        this.shippingMethod &&
        isAddress(this.orderShippingPlace) &&
        !isAddressValid(this.orderShippingPlace)
      )
        return false
      if (!isAddressValid(this.billingAddress)) return false
      if (this.invoiceRequested && !this.billingAddress.vat) return false
      return true
    },
  },

  actions: {
    reset() {
      const cart = useCartStore()
      this.$reset()
      cart.$reset()
    },

    async attachDigitalShippingMethod() {
      const heseya = useHeseya()
      const cart = useCartStore()

      if (getShippingTypeFromCart(cart.items as CartItem[]) === OrderShippingType.Default) return

      const { data: methods } = await heseya.ShippingMethods.get()
      const digitalShippingMethods = methods.filter((m) => m.shipping_type === ShippingType.Digital)
      if (!digitalShippingMethods.length)
        throw new Error(
          'Store does not have configured digital shipping method, which is required to make an order.',
        )
      this.digitalShippingMethod = digitalShippingMethods[0]
    },

    isCountryCodeAllowedInShipping(countryCode: string) {
      if (!this.shippingMethod) return true
      const isIncludedInList = !!this.shippingMethod.countries.find((c) => c.code === countryCode)
      return this.shippingMethod.block_list ? !isIncludedInList : isIncludedInList
    },

    async createOrder() {
      const heseya = useHeseya()
      const ev = useHeseyaEventBus()

      if (!this.orderDto) throw new Error('Order cannot be made, because data is invalid')

      const order = await heseya.Orders.create(this.orderDto)
      ev.emit(HeseyaEvent.Purchase, order)

      return order
    },

    async createOrderPayment(orderCode: string, paymentMethodId: string) {
      const heseya = useHeseya()
      const localePath = useLocalePath()
      const { appHost } = usePublicRuntimeConfig()

      const { order, paymentMethods } = await heseya.Orders.getPaymentMethods(orderCode)

      if (!order.payable) throw new Error('Order is not payable')
      if (!paymentMethods.find((m) => m.id === paymentMethodId))
        throw new Error('This payment method is not available for this order')

      const orderShippingType = getOrderShippingType(order)

      return await heseya.Orders.pay(
        orderCode,
        paymentMethodId,
        joinUrl(
          localePath(`/checkout/thank-you?code=${orderCode}&t=${orderShippingType}`),
          appHost,
        ),
      )
    },
  },

  persist: true,
})
