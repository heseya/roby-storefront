<template>
  <div class="faq">
    <div v-for="(values, title) in faq" :key="title" class="faq__content">
      <LayoutHeader variant="black" class="faq__title">{{ title }}</LayoutHeader>
      <RentFaqItem
        v-for="{ question, answer, order } in values"
        :key="order"
        :question="question"
        :answer="answer"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import groupBy from 'lodash/groupBy'
import { TranslatedRentPageFaq } from '~/interfaces/rentPage'

const { data: faq } = useAsyncData('rent-page-faq', async () => {
  const directus = useDirectus()

  const { data } = await directus.items('RentPageFaq').readByQuery({
    // @ts-ignore directus typing is wrong
    fields: ['order', 'translations.question', 'translations.answer', 'translations.title'],
  })

  const translatedData = (data?.map((faq) => ({
    ...getTranslated(faq.translations as any, 'pl-PL'),
    order: faq.order,
  })) || []) as TranslatedRentPageFaq[]

  return groupBy(translatedData, 'title')
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
