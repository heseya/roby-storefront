<template>
  <div class="articles">
    <div class="articles__header">
      <LayoutHeader variant="'black">{{ t('blog') }}</LayoutHeader>
      <ShowAllButton path="/blog" />
    </div>
    <div class="articles__list">
      <BlogArticle v-for="(article, index) in articles.data" :key="index" :article="article" />
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
import BlogArticle from '~/components/home/articlesList/BlogArticle.vue'
import ShowAllButton from '~/components/home/ShowAllButton.vue'

const { $directus } = useNuxtApp()
const { data: articles } = await useAsyncData('articles', () => {
  return $directus.items('Articles').readByQuery({
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
.articles {
  &__header {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  &__list {
    margin-top: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 20px;
  }
}
</style>
