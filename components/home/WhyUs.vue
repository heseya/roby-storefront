<template>
  <div v-if="content && content.title" v-show="content.active" class="why-us">
    <LayoutHeader tag="h2" class="why-us__header" variant="black">{{ content.title }}</LayoutHeader>
    <div v-show="reasons?.length" class="why-us__reasons">
      <HomeWhyUsReson v-for="(reason, index) in reasons" :key="index" :reason="reason" />
    </div>
    <div class="why-us__partner">
      <img class="partner__image" :src="imageUrl" role="presentation" loading="lazy" />
      <div class="partner__description">
        <LayoutHeader class="why-us__header" variant="black">
          {{ content.image_title }}
        </LayoutHeader>
        <div v-html="content.image_description"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { TranslatedWhyUsComponent, TranslatedWhyUsReason } from '@/interfaces/whyUsComponent'

const { data: content } = useAsyncData('why-us-content', async () => {
  try {
    const directus = useDirectus()
    if (!directus.url) return

    const data = await directus.items('WhyUsComponent').readOne(1, {
      fields: ['active', 'image', 'translations.*'],
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
    @include flex-column;
    align-items: center;
    align-self: center;
    gap: 20px;

    @media ($viewport-9) {
      flex-direction: row;
    }
  }
}

.partner {
  &__image {
    width: 100%;
    height: 100%;
    max-height: 250px;
    max-width: 250px;
    object-fit: contain;
  }

  &__description {
    text-align: left;
    @include flex-column;
    gap: 12px;
  }
}
</style>
