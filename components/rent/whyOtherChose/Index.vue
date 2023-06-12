<template>
  <div class="why-other-chose">
    <div class="why-other-chose__reason">
      <LayoutHeader tag="h2" variant="black" class="why-other-chose__title">
        {{ title }}
      </LayoutHeader>
      <span class="why-other-chose__text">
        {{ description }}
      </span>
    </div>
    <div class="why-other-chose__attributes">
      <RentWhyOtherChoseAttribute
        v-for="decision in decisions"
        :key="decision.id"
        :text="decision.text"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { TranslatedRentPageDecision } from '~/interfaces/rentPage'

defineProps<{ title: string; description: string }>()

const { data: decisions } = useAsyncData('rent-page-decision', async () => {
  const directus = useDirectus()

  const { data } = await directus.items('RentPageDecision').readByQuery({
    // @ts-ignore directus typing is wrong
    fields: ['translations.text', 'translations.order'],
  })

  return (data?.map((step) => ({
    ...getTranslated(step.translations as any, 'pl-PL'),
  })) || []) as TranslatedRentPageDecision[]
})
</script>

<style lang="scss" scoped>
.why-other-chose {
  @include flex-row;
  align-items: stretch;
  gap: 26px;

  @media ($max-viewport-9) {
    flex-direction: column;
    gap: 16px;
  }

  &__reason {
    flex: 1;
    @include flex-column;
    gap: 32px;

    @media ($max-viewport-9) {
      gap: 16px;
    }
  }

  &__attributes {
    flex: 1;
    margin-top: 20px;
    padding: 20px;
    border-radius: 4px;
    border: 1px solid $gray-color-300;

    @include flex-column;
    justify-content: space-between;
    gap: 12px;

    @media ($max-viewport-9) {
      padding: 16px;
    }
  }

  &__title {
    text-align: left;
    font-size: rem(22);

    @media ($viewport-9) {
      font-size: rem(45);
    }
  }

  &__text {
    @media ($viewport-9) {
      font-size: rem(18);
    }
  }
}
</style>
