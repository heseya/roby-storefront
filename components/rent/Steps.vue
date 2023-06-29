<template>
  <div class="steps">
    <div class="steps__content">
      <div v-for="step in steps" :key="step.id" class="steps__step">
        <RentStepHeader :order="step.order" :header="step.title" />
        <RentStepDescription
          v-if="step.description"
          :description="step.description"
          :send-form="step.button"
          @action="emit('action')"
        />
      </div>
    </div>

    <div class="steps__banner-container">
      <img class="steps__banner" :src="bannerUrl" loading="lazy" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { TranslatedRentPageStep } from '~/interfaces/rentPage'

defineProps<{
  bannerUrl: string
}>()

const emit = defineEmits<{
  (e: 'action'): void
}>()

const { data: steps } = useAsyncData('rent-page-steps', async () => {
  const directus = useDirectus()

  const { data } = await directus.items('RentPageStep').readByQuery({
    // @ts-ignore directus typing is wrong
    fields: ['order', 'button', 'translations.title', 'translations.description'],
  })

  return (data?.map((step) => ({
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
    @include flex-column;
    flex: 1;
  }

  &__step {
    @include flex-column;
    gap: 12px;
    font-size: rem(16);
    margin-bottom: 12px;

    @media ($max-viewport-9) {
      font-size: rem(14);
    }
  }

  &__banner-container {
    flex: 1;
  }

  &__banner {
    height: 100%;
    max-width: 100%;
  }
}
</style>
