<template>
  <div class="blog-articles">
    <BaseContainer>
      <div class="blog-articles__header">
        <LayoutHeader variant="black">{{ t('blog') }}</LayoutHeader>
        <HomeShowAllButton path="/blog" />
      </div>
    </BaseContainer>
    <div class="blog-articles__list-container">
      <div class="blog-articles__list">
        <BlogArticleTile
          v-for="(article, index) in articles.data"
          :key="index"
          :article="article"
        />
      </div>
    </div>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "blog": "Blog"
  }
}
</i18n>

<script lang="ts" setup>
const directus = useDirectus()
const { data: articles } = await useAsyncData('articles', () => {
  return directus.items('Articles').readByQuery({
    fields: [
      'id',
      'slug',
      'date_created',
      'image.filename_disk',
      'translations.title',
      'translations.description',
      'translations.languages_code',
    ],
    page: 1,
    limit: 4,
    filter: {
      status: 'published' as const,
    },
  })
})

const t = useLocalI18n()
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
