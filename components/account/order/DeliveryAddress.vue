<template>
  <div v-for="(value, index) of shippingPlace" :key="index">
    {{ value }}
  </div>
</template>

<script setup lang="ts">
import { ShippingType } from '@heseya/store-core'
import type { Order, Address } from '@heseya/store-core'

const props = defineProps<{
  order: Order
}>()

const shippingPlace = computed((): string[] => {
  switch (props.order.shipping_method?.shipping_type) {
    case ShippingType.Address:
    case ShippingType.Point: {
      const shippingPlace = props.order.shipping_place as Address
      return [
        shippingPlace.name,
        shippingPlace.phone,
        shippingPlace.address,
        `${shippingPlace.zip} ${shippingPlace.city}`,
      ]
    }

    case ShippingType.PointExternal: {
      return [props.order.shipping_place as string]
    }

    default: {
      return ['']
    }
  }
})
</script>
