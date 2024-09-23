import { CartItem, HeseyaEvent, ShippingType } from '@heseya/store-core'
import type {
  Address,
  AddressDto,
  MetadataCreateDto,
  OrderCreateDto,
  PaymentMethodListed,
  ShippingMethod,
  OrderCreateDtoItem,
} from '@heseya/store-core'
import { defineStore } from 'pinia'
import { useCartStore } from './cart'
import type { Paczkomat } from '@/interfaces/Paczkomat'
import { EMPTY_ADDRESS } from '@/consts/address'
import type { Furgonetka } from '~/interfaces/Furgonetka'
import { useCeneo } from '~/composables/useCeneo'

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
    furgonetka: null as Furgonetka | null,
    invoiceRequested: false,
    paymentMethodId: null as string | null,
    paymentMethod: null as PaymentMethodListed | null,
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
      if (this.isFurgonetkaShippingMethod) return this.furgonetka?.code
      return this.shippingAddress
    },

    metadataOrder(): MetadataCreateDto {
      const res: MetadataCreateDto = {}
      const { enabled: ceneoEnabled } = useCeneo()

      if (this.isInpostShippingMethod) {
        Object.assign(res, {
          inpost_phone: this.shippingAddress.phone,
          inpost_point: this.orderShippingPlace as string,
          inpost_point_address: JSON.stringify(this.paczkomat?.address_details),
        })
      }

      if (this.isFurgonetkaShippingMethod) {
        Object.assign(res, {
          // @deprecated dpd_ metadata are deprecated, use furgonetka_ instead
          dpd_phone: this.shippingAddress.phone,
          dpd_point: this.orderShippingPlace as string,
          dpd_point_address: this.furgonetka?.name,

          furgonetka_phone: this.shippingAddress.phone,
          furgonetka_point: this.orderShippingPlace as string,
          furgonetka_point_address: this.furgonetka?.name,
        })
      }

      if (ceneoEnabled && this.consents.ceneo) {
        Object.assign(res, {
          ceneo_survey_consent: this.consents.ceneo,
        })
      }

      return res
    },

    orderItems(): OrderCreateDtoItem[] {
      const cart = useCartStore()

      return cart.orderItems.map((item) => {
        return {
          ...item,
          // remove empty schemas
          schemas: Object.fromEntries(
            Object.entries(item.schemas).filter(([_key, value]) => value !== null),
          ) as Record<string, string>,
        }
      })
    },

    orderDto(): OrderCreateDto | null {
      const cart = useCartStore()
      const channel = useSalesChannel()
      const currency = useCurrency()

      if (!this.paymentMethodId) return null
      if (!(this.shippingAddress || this.billingAddress)) return null
      return {
        email: this.email,
        comment: this.comment,
        shipping_place:
          this.isInpostShippingMethod || this.isFurgonetkaShippingMethod
            ? `${this.orderShippingPlace as string} | tel.: ${this.shippingAddress.phone}`
            : this.orderShippingPlace,
        items: this.orderItems,
        shipping_method_id: this.shippingMethod?.id,
        digital_shipping_method_id: this.digitalShippingMethod?.id,
        invoice_requested: !!this.invoiceRequested,
        billing_address: isAddressValid(this.billingAddress)
          ? this.billingAddress
          : this.shippingAddress,
        coupons: cart.coupons.map((c) => c.code),
        sales_ids: cart.sales.map((s) => s.id),
        sales_channel_id: channel.value?.id || '',
        payment_method_id: this.paymentMethodId,
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

    isFurgonetkaShippingMethod(): boolean {
      return !!(
        this.shippingMethod?.shipping_type === ShippingType.PointExternal &&
        (this.shippingMethod?.metadata.dhl_pickup || this.shippingMethod?.metadata.dpd_pickup)
      )
    },

    isShippingAddressValid(): boolean {
      return isAddressValid(this.shippingAddress)
    },

    validationError(): string | null {
      if (!this.email) return 'errors.checkout.email'

      // TODO: not all orders requires phisical shipping method
      if (!this.shippingMethod) return 'errors.checkout.shippingMethod'

      if (this.shippingMethod && !this.orderShippingPlace) return 'errors.checkout.shippingPlace'
      if (
        this.shippingMethod &&
        isAddress(this.orderShippingPlace) &&
        !isAddressValid(this.orderShippingPlace)
      )
        return 'errors.checkout.shippingAddress'

      if (!isAddressValid(this.billingAddress)) return 'errors.checkout.billingAddress'
      if (this.invoiceRequested && !this.billingAddress.vat)
        return 'errors.checkout.billingAddressVat'

      if (!this.paymentMethodId) return 'errors.checkout.paymentMethod'

      if (!this.consents.statute) return 'errors.checkout.consent'
      return null
    },

    isValid(): boolean {
      return !this.validationError
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
      return this.shippingMethod.is_block_list_countries ? !isIncludedInList : isIncludedInList
    },

    async createOrder() {
      const heseya = useHeseya()
      const ev = useHeseyaEventBus()

      if (!this.orderDto) throw new Error('Order cannot be made, because data is invalid')

      const order = await heseya.Orders.create(this.orderDto)
      // @ts-expect-error Purposely pass this data to event
      ev.emit(HeseyaEvent.Purchase, { ...order, payment_method: this.paymentMethod })

      return order
    },

    async createOrderPayment(orderCode: string, paymentMethodId: string) {
      const heseya = useHeseya()
      const localePath = useLocalePath()
      const { i18n } = usePublicRuntimeConfig()

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
          i18n.baseUrl,
        ),
      )
    },
  },

  persist: true,
})
