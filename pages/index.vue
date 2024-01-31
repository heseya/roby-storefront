<template>
  <NuxtLayout>
    <div class="index-page">
      <HomeBanner
        v-if="data?.mainBanner && data?.mainBanner.active"
        class="index-page__banner"
        :banner="data?.mainBanner"
      />

      <HomeBannerSecondary
        v-if="data?.secondaryBanner && data?.secondaryBanner.active"
        class="index-page__banner-cards"
        :banner="data?.secondaryBanner"
      />

      <template
        v-for="section in sections"
        :key="section.type === 'box' ? section.data.text : section.data.id"
      >
        <BaseContainer
          class="index-page__content"
          :class="{ 'index-page__content--wide': section.type === 'box' }"
        >
          <HomeWysiwygContent v-if="section.type === 'page'" :page-id="section.data.id" />

          <HomeProductCarousel
            v-if="section.type === 'set'"
            :category="section.data"
            :hide-unavailable="hideUnavailableOnHomepage"
            header-tag="h2"
          />

          <LazyHomeLinkBox v-if="section.type === 'box'" :link="section.data" />
        </BaseContainer>
      </template>

      <BaseContainer class="index-page__content">
        <LazyHomeBlogArticlesList />

        <LazyHomeWhyUs />

        <LazyHomeImageCarousel
          v-for="banner in data?.homepageBanners"
          :key="banner.id"
          class="index-page__image-carousel"
          header-tag="h2"
          :banner="banner"
          :title="banner.name"
          :gray-filter="!!banner.metadata.gray_filter"
          :drop-shadow="!!banner.metadata.drop_shadow"
          :image-height="banner.metadata.image_height?.toString()"
          :image-width="banner.metadata.image_width?.toString()"
        />
      </BaseContainer>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { HeseyaEvent } from '@heseya/store-core'
import type { ProductSetList, PageList } from '@heseya/store-core'

import { useConfigStore } from '~/store/config'
import type { LinkBox } from '~~/components/home/LinkBox.vue'

const $t = useGlobalI18n()
const heseya = useHeseya()
const config = useConfigStore()

type Section =
  | { type: 'set'; data: ProductSetList }
  | { type: 'box'; data: LinkBox }
  | { type: 'page'; data: PageList }

useSeoTitle($t('breadcrumbs.home'))

const hideUnavailableOnHomepage = computed(() => config.env.hide_unavailable_on_homepage === '1')

const { data } = useAsyncData('main-banner', async () => {
  const [
    mainBanner,
    secondaryBanner,
    { data: homepageBanners },
    { data: homepageSets },
    { data: homepagePages },
  ] = await Promise.all([
    heseya.Banners.getOneBySlug('main-banner').catch(() => null),
    heseya.Banners.getOneBySlug('secondary-banner').catch(() => null),
    heseya.Banners.get({ metadata: { homepage: true } }).catch(() => ({ data: [] })),
    heseya.ProductSets.get({ metadata: { homepage: true } }).catch(() => ({ data: [] })),
    heseya.Pages.get({ metadata: { homepage: true } }).catch(() => ({ data: [] })),
  ])
  return {
    mainBanner,
    secondaryBanner,
    homepageBanners,
    homepageSets,
    homepagePages,
  }
})

const { data: offertsBanner } = useAsyncData('offer-banner', async (): Promise<LinkBox[]> => {
  const { active, banner_media: bannerMedia } = await heseya.Banners.getOneBySlug('offer-banner')

  if (!active) return []

  return bannerMedia.map(({ title, media, url, subtitle }) => ({
    text: title,
    media,
    link: url,
    linkText: subtitle,
  }))
})

const sections = computed<Section[]>(() => {
  const sortKey = 'homepage_order'

  const pages = data.value?.homepagePages?.map((p) => ({ type: 'page' as const, data: p })) || []

  const sets =
    [...(data.value?.homepageSets || [])]
      .sort((a, b) => {
        const aOrder = Number(a.metadata[sortKey] || Infinity)
        const bOrder = Number(b.metadata[sortKey] || Infinity)
        return aOrder - bOrder
      })
      .map((set) => ({
        type: 'set' as const,
        data: set,
      })) || []

  const boxes =
    offertsBanner.value?.map((box) => ({
      type: 'box' as const,
      data: box,
    })) || []

  const length = Math.max(sets.length, boxes.length)
  return Array.from({ length }, (_, i) => [sets[i], pages[i], boxes[i]])
    .flat()
    .filter(Boolean)
})

delayedOnMounted(() => {
  const ev = useHeseyaEventBus()

  ev.emit(HeseyaEvent.ViewContent, {
    contentType: 'homepage',
  })
})
</script>

<style lang="scss" scoped>
.index-page {
  &__content {
    &--wide {
      padding: 0;
    }

    > * {
      margin-top: 40px;

      @media ($viewport-9) {
        margin-top: 80px;
      }
    }
  }

  &__banner-cards {
    display: flex;
  }

  &__image-carousel {
    @media ($viewport-9) {
      margin-top: 80px;
    }
  }
}
</style>
