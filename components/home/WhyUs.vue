<template>
  <div v-if="content?.active" class="why-us">
    <LayoutHeader class="why-us__header" variant="black">{{ content.title }}</LayoutHeader>
    <div class="why-us__reasons">
      <HomeWhyUsReson
        v-for="(reason, index) in reasonList"
        :key="index"
        :title="reason.title"
        :description="reason.description"
        :icon="reason.icon"
      />
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
import { ReasonProps } from '@/components/home/WhyUsReson.vue'

import { TranslatedWhyUsComponent } from '@/interfaces/whyUsComponent'

import Warranty from '@/assets/icons/warranty.svg?component'
import Support from '@/assets/icons/support.svg?component'
import Shipping from '@/assets/icons/shipping.svg?component'
import Bulb from '@/assets/icons/bulb.svg?component'

const reasonList: ReasonProps[] = [
  {
    title: 'PROFESJONALNE DORADZTWO',
    description:
      'Wieloletnie doświadczenie w realizacji projektów i dostaw pozwala nam skutecznie doradzić najlepsze dla Twojego biznesu rozwiązania.',
    icon: Bulb,
  },
  {
    title: 'WSPARCIE TECHNICZNE',
    description:
      'Jako wieloletni serwis gwarancyjny marek Canon i Sharp, udzielamy wsparcia technicznego na najwyższym poziomie.',
    icon: Support,
  },
  {
    title: 'SZYBKA DOSTAWA',
    description:
      'Dokładamy starań, aby oferowane przez nas produkty były stale dostępne i wysyłane praktycznie natychmiastowo.',
    icon: Shipping,
  },
  {
    title: 'GWARANCJA',
    description:
      'Oferowane przez nas urządzenia i materiały pochodzą z oficjalnych kanałów dystrybucji, dzięki czemu posiadają pełną gwarancję producenta.',
    icon: Warranty,
  },
]

const { data: content } = useAsyncData('why-us-content', async () => {
  try {
    const directus = useDirectus()
    const data = await directus.items('WhyUsComponent').readOne(1, {
      // @ts-ignore directus typing is wrong
      fields: ['active', 'translations.*', 'image.filename_disk'],
    })
    return {
      active: data?.active,
      image: data?.image,
      // @ts-ignore directus typing is wrong
      ...getTranslated(data!.translations!, 'pl-PL'),
    } as TranslatedWhyUsComponent
  } catch {}
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
