<template>
  <NuxtLayout>
    <div class="index-page">
      <HomeBanner v-if="data?.mainBanner" class="index-page__banner" :banner="data?.mainBanner" />

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
          :image-height="(banner.metadata.image_height as any)"
          :image-width="(banner.metadata.image_width as any)"
        />
      </BaseContainer>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { HeseyaEvent, ProductSetList, PageList } from '@heseya/store-core'
import { LinkBox } from '~~/components/home/LinkBox.vue'

const $t = useGlobalI18n()
const heseya = useHeseya()

type Section =
  | { type: 'set'; data: ProductSetList }
  | { type: 'box'; data: LinkBox }
  | { type: 'page'; data: PageList }

useSeoMeta({
  title: () => $t('breadcrumbs.home'),
})

const { data } = useAsyncData('main-banner', async () => {
  const [mainBanner, { data: homepageBanners }, { data: homepageSets }, { data: homepagePages }] =
    await Promise.all([
      heseya.Banners.getOneBySlug('main-banner').catch(() => null),
      heseya.Banners.get({ metadata: { homepage: true } }).catch(() => ({ data: [] })),
      heseya.ProductSets.get({ metadata: { homepage: true } }).catch(() => ({ data: [] })),
      heseya.Pages.get({ metadata: { homepage: true } }).catch(() => ({ data: [] })),
    ])
  return {
    mainBanner,
    homepageBanners,
    homepageSets,
    homepagePages,
  }
})

const { data: offertsBanner } = useAsyncData('offer-banner', async (): Promise<LinkBox[]> => {
  const { banner_media: bannerMedia } = await heseya.Banners.getOneBySlug('offer-banner')

  return bannerMedia.map(({ title, media, url, subtitle }) => ({
    text: title,
    media: media[0].media,
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

  &__image-carousel {
    @media ($viewport-9) {
      margin-top: 80px;
    }
  }
}
</style>
