<template>
  <div v-if="articles && articles.data?.length" class="blog-articles">
    <BaseContainer>
      <div class="blog-articles__header">
        <LayoutHeader class="blog-articles__title" variant="black" tag="h2">
          {{ $t('breadcrumbs.blog') }}
        </LayoutHeader>
        <HomeShowAllButton path="/blog" />
      </div>
    </BaseContainer>
    <div class="blog-articles__list-container">
      <div class="blog-articles__list">
        <BlogArticleTile
          v-for="article in articles?.data || []"
          :key="article.id"
          :article="article"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { BlogArticle } from '~/interfaces/BlogArticle'

const $t = useGlobalI18n()
const directus = useDirectus()
const { data: articles } = useAsyncData('home-blog-articles', async () => {
  const data = await directus.items('Articles').readByQuery({
    fields: [
      'id',
      'slug',
      'date_created',
      'image',
      'translations.title',
      'translations.description',
      'translations.languages_code',
    ],
    limit: 4,
    sort: ['-date_created'],
    filter: {
      status: 'published',
    },
  })
  return { ...data, data: data.data as BlogArticle[] }
})
</script>

<style lang="scss" scoped>
.blog-articles {
  &__header {
    margin-top: 25px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__title {
    @media ($max-viewport-8) {
      font-size: rem(18);
    }
  }

  &__list-container {
    width: 100%;
    overflow-y: auto;

    @media ($viewport-8) {
      max-width: $container-width;
      margin: 0 auto;
      padding: 0;
    }
  }

  &__list {
    width: 340%;
    margin-top: 20px;
    padding: 0 10px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 10px;

    @media ($viewport-8) {
      width: 100%;
      padding: 0;
      grid-gap: 20px;
    }
  }
}
</style>
