<template>
  <div class="advantages">
    <LayoutHeader tag="h2" class="advantages__title" variant="black">
      {{ title }}
    </LayoutHeader>
    <div class="advantages__content">
      <RentAdvantagesItem v-for="item in advantages" :key="item.title" :item="item" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { TranslatedRentPageAdvantage } from '~/interfaces/rentPage'

defineProps<{
  title: string
}>()

const { data: advantages } = useAsyncData('rent-page-advantages', async () => {
  const directus = useDirectus()

  const { data } = await directus.items('RentPageAdvantage').readByQuery({
    fields: ['order', 'icon.*', 'translations.title', 'translations.description'],
  })

  return (data?.map((advantage) => ({
    // @ts-ignore directus typing is wrong???
    ...getTranslated(advantage.translations as any, 'pl-PL'),
    order: advantage.order,
    icon: advantage.icon,
  })) || []) as TranslatedRentPageAdvantage[]
})
</script>

<style lang="scss" scoped>
.advantages {
  &__title {
    font-size: rem(30);
    text-align: left;
    margin-bottom: 30px;

    @media ($max-viewport-9) {
      margin-bottom: 15px;
      font-size: rem(22);
    }
  }

  &__content {
    display: grid;
    column-gap: 26px;
    row-gap: 30px;

    grid-template-columns: 1fr 1fr;

    @media ($max-viewport-9) {
      grid-template-columns: 1fr;
      row-gap: 10px;
    }
  }
}
</style>
