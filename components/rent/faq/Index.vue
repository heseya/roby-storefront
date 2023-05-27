<template>
  <div class="faq">
    <div class="faq__content">
      <LayoutHeader variant="black" class="faq__title">{{ title1 }}</LayoutHeader>
      <RentFaqItem
        v-for="{ question, answer, order } in faq?.technical"
        :key="order"
        :question="question"
        :answer="answer"
      />
    </div>
    <div class="faq__content">
      <LayoutHeader variant="black" class="faq__title">{{ title2 }}</LayoutHeader>
      <RentFaqItem
        v-for="{ question, answer, order } in faq?.formal"
        :key="order"
        :question="question"
        :answer="answer"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { TranslatedRentPageFaq } from '~/interfaces/rentPage'

defineProps<{ title1: string; title2: string }>()

const { data: faq } = useAsyncData('rent-page-faq', async () => {
  const directus = useDirectus()

  const { data } = await directus.items('RentPageFaq').readByQuery({
    fields: ['type', 'order', 'translations.question', 'translations.answer'],
  })

  const translatedData = (data?.map((faq) => ({
    // @ts-ignore directus typing is wrong???
    ...getTranslated(faq.translations as any, 'pl-PL'),
    order: faq.order,
    type: faq.type,
  })) || []) as TranslatedRentPageFaq[]

  return {
    technical: translatedData.filter((faq) => faq.type === 'technical'),
    formal: translatedData.filter((faq) => faq.type === 'formal'),
  }
})
</script>

<style lang="scss" scoped>
.faq {
  @include flex-row;
  justify-content: center;
  gap: 50px;

  @media ($max-viewport-9) {
    flex-direction: column;
  }

  &__content {
    flex: 1;
  }

  &__title {
    @media ($max-viewport-9) {
      font-size: rem(22);
    }
  }
}
</style>
