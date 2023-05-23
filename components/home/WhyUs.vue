<template>
  <div v-if="content?.active" class="why-us">
    <LayoutHeader class="why-us__header" variant="black">{{ content.title }}</LayoutHeader>
    <div v-if="reasons?.length" class="why-us__reasons">
      <HomeWhyUsReson v-for="(reason, index) in reasons" :key="index" :reason="reason" />
    </div>
    <div class="why-us__partner">
      <img class="partner__image" :src="imageUrl" role="presentation" />
      <div class="partner__description">
        <LayoutHeader class="why-us__header" variant="black">
          {{ content.image_title }}
        </LayoutHeader>
        <span> {{ content.image_description }} </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { TranslatedWhyUsComponent, TranslatedWhyUsReason } from '@/interfaces/whyUsComponent'

const { data: content } = useAsyncData('why-us-content', async () => {
  try {
    const directus = useDirectus()
    const data = await directus.items('WhyUsComponent').readOne(1, {
      fields: ['*.*'],
    })
    return {
      active: data?.active,
      image: data?.image,
      ...getTranslated(data!.translations!, 'pl-PL'),
    } as TranslatedWhyUsComponent
  } catch {}
})

const { data: reasons } = useAsyncData('why-us-reasons', async () => {
  try {
    const directus = useDirectus()
    const { data } = await directus.items('WhyUsReason').readByQuery({
      fields: ['*.*'],
    })
    return data?.map((v) => ({
      icon: v?.icon,
      ...getTranslated(v!.translations!, 'pl-PL'),
    })) as TranslatedWhyUsReason[]
  } catch {
    return []
  }
})

const imageUrl = computed(() => getImageUrl(content.value?.image))
</script>

<style lang="scss" scoped>
.why-us {
  width: 100%;

  @include flex-column;
  gap: 30px;

  &__header {
    text-align: left;

    @media ($max-viewport-9) {
      font-size: rem(18);
    }
  }

  &__reasons {
    @include flex-column;
    gap: 20px;
    @media ($viewport-9) {
      flex-direction: row;
    }
  }

  &__partner {
    margin-top: 20px;

    @include flex-column;
    align-items: center;
    align-self: center;
    gap: 20px;

    @media ($viewport-9) {
      margin: 70px 0 40px 0;
      max-width: 80%;
      flex-direction: row;
    }
  }
}

.partner {
  &__image {
    height: 150px;
    width: 150px;
  }

  &__description {
    text-align: left;
    @include flex-column;
    gap: 12px;
  }
}
</style>
