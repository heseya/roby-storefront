<template>
  <div class="steps">
    <div class="steps__content">
      <div v-for="step in steps" class="steps__content2">
        <RentStepHeader :order="step.order" :header="step.title" />
        <RentStepDescription
          v-if="step.description"
          :description="step.description"
          :send-form="step.button"
          @scroll="emit('scroll')"
        />
      </div>
    </div>
    <div class="steps__image-container">
      <img class="steps__image" src="@/assets/images/rent.png" loading="lazy" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { TranslatedRentPageStep } from '~/interfaces/rentPage'

const emit = defineEmits<{
  (e: 'scroll'): void
}>()

const { data: steps } = useAsyncData('rent-page-steps', async () => {
  const directus = useDirectus()

  const { data } = await directus.items('RentPageStep').readByQuery({
    fields: ['order', 'button', 'translations.title', 'translations.description'],
  })

  return (data?.map((step) => ({
    // @ts-ignore directus typing is wrong???
    ...getTranslated(step.translations as any, 'pl-PL'),
    order: step.order,
    button: step.button,
  })) || []) as TranslatedRentPageStep[]
})
</script>

<style lang="scss" scoped>
.steps {
  @include flex-row;
  gap: 26px;

  @media ($max-viewport-9) {
    flex-direction: column;
    gap: 30px;
  }

  &__content {
    flex: 1;
  }

  &__content2 {
    @include flex-column;
    gap: 12px;
    font-size: rem(16);

    @media ($max-viewport-9) {
      font-size: rem(14);
    }
  }

  &__image-container {
    flex: 1;
    position: relative;
    min-height: 200px;
  }

  &__image {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
