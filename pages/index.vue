<template>
  <NuxtLayout>
    <div class="index-page">
      <LazyHydrate when-idle>
        <HomeBanner v-if="data?.mainBanner" class="index-page__banner" :banner="data?.mainBanner" />
      </LazyHydrate>

      <template
        v-for="section in sections"
        :key="section.type === 'box' ? section.data.text : section.data.id"
      >
        <BaseContainer
          class="index-page__content"
          :class="{ 'index-page__content--wide': section.type === 'box' }"
        >
          <LazyHydrate when-idle>
            <HomeProductCarousel v-if="section.type === 'set'" :category="section.data" />

            <HomeLinkBox v-if="section.type === 'box'" :link="section.data" />
          </LazyHydrate>
        </BaseContainer>
      </template>

      <BaseContainer class="index-page__content">
        <LazyHydrate when-visible>
          <HomeBlogArticlesList />
        </LazyHydrate>

        <LazyHydrate when-visible>
          <HomeWhyUs />
        </LazyHydrate>

        <LazyHydrate when-visible>
          <LazyHomeImageCarousel
            v-for="banner in data?.homepageBanners"
            :key="banner.id"
            class="index-page__image-carousel"
            :banner="banner"
            :title="banner.name"
            :gray-filter="!!banner.metadata.gray_filter"
            :image-height="(banner.metadata.image_height as any)"
            :image-width="(banner.metadata.image_width as any)"
          />
        </LazyHydrate>
      </BaseContainer>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ProductSetList } from '@heseya/store-core'
import { LinkBox } from '~~/components/home/LinkBox.vue'
import BgImagePath from '@/assets/images/link-box-bgr.png'
import BgImage2Path from '@/assets/images/link-box-bgr-2.png'

const { t: $t } = useI18n({ useScope: 'global' })
const heseya = useHeseya()

type Section = { type: 'set'; data: ProductSetList } | { type: 'box'; data: LinkBox }

useSeoMeta({
  title: () => $t('breadcrumbs.account'),
})

const { data } = useAsyncData('main-banner', async () => {
  const [mainBanner, { data: homepageBanners }, { data: homepageSets }] = await Promise.all([
    heseya.Banners.getOneBySlug('main-banner'),
    heseya.Banners.get({ metadata: { homepage: true } }),
    heseya.ProductSets.get({ metadata: { homepage: true } }),
  ])
  return {
    mainBanner,
    homepageBanners,
    homepageSets,
  }
})

// TODO: maybe fetch from API? Directus?
const LINK_BOXES: LinkBox[] = [
  {
    text: 'Zapytaj o wynajem',
    src: BgImagePath,
    link: '/wynajem',
    linkText: 'Zapytaj',
  },
  {
    text: 'Zapytaj o indywidualną ofertę',
    src: BgImage2Path,
    link: '/kontakt',
    linkText: 'Zapytaj',
  },
]

const sections = computed<Section[]>(() => {
  const sets =
    data.value?.homepageSets?.map((set) => ({
      type: 'set' as const,
      data: set,
    })) || []

  const boxes = LINK_BOXES.map((box) => ({
    type: 'box' as const,
    data: box,
  }))

  const length = Math.max(sets.length, boxes.length)
  return Array.from({ length }, (_, i) => [sets[i], boxes[i]])
    .flat()
    .filter(Boolean)
})
</script>

<style lang="scss" scoped>
.index-page {
  &__content {
    &--wide {
      padding: 0;
    }

    > * {
      margin-top: 50px;

      @media ($viewport-9) {
        margin-top: 140px;
      }
    }
  }

  &__image-carousel {
    @media ($viewport-9) {
      margin-top: 80px;
    }
  }
}
</style>
