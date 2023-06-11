<template>
  <div>
    <LayoutAccountSection
      v-if="!errorMessage"
      :header="header"
      :link="link"
      class="account-order-card"
    >
      <div v-if="order">
        <AccountOrderCardHeader
          :code="order.code"
          :color="order.status.color"
          :created-at="order.created_at"
          :name="order.status.name"
        />

        <div v-if="order?.products" class="account-order-card__items">
          <div class="account-order-card__items-list">
            <div v-for="{ product } in order.products" :key="product.id">
              <AccountProductCard :product="product" />
            </div>
          </div>
          <div class="account-order-card__actions">
            <NuxtLink :to="`/account/orders/${order.code}`">
              <LayoutButton variant="gray">
                {{ $t('orders.details') }}
                <LayoutIcon :icon="GoNextIcon" :size="8" />
              </LayoutButton>
            </NuxtLink>
          </div>
        </div>
      </div>

      <LayoutEmpty v-else class="account-order-card__empty"> {{ t('empty') }} </LayoutEmpty>
    </LayoutAccountSection>
    <LayoutInfoBox v-else-if="errorMessage" type="danger">
      {{ errorMessage }}
    </LayoutInfoBox>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "empty": "Nie masz żadnego zamówienia"
  },
  "en": {
    "empty": "You dont have any order yet"
  }
}
</i18n>

<script setup lang="ts">
import GoNextIcon from '@/assets/icons/navigate-next.svg?component'

const t = useLocalI18n()
const $t = useGlobalI18n()
const heseya = useHeseya()
const formatError = useErrorMessage()
const errorMessage = ref('')

const props = withDefaults(
  defineProps<{
    code: string
    link?: string
    header?: string
  }>(),
  {
    link: '',
    header: '',
  },
)

const { data: order } = useAsyncData(`account/orders/${props.code}`, async () => {
  try {
    return await heseya.UserProfile.Orders.getOneByCode(props.code)
  } catch (e: any) {
    errorMessage.value = formatError(e)
  }
})
</script>

<style lang="scss" scoped>
.account-order-card {
  &__items {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @media ($viewport-12) {
      flex-direction: row;
    }
  }

  &__actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 20px;

    @media ($viewport-12) {
      margin-top: 0;
    }
  }

  &__items-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  &__empty {
    font-size: 13px;
  }
}
</style>
