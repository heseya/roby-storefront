<template>
  <div class="articles">
    <div class="articles__header">
      <LayoutHeader variant="'black">{{ t('blog') }}</LayoutHeader>
      <ShowAll path="/blog" />
    </div>
    <div class="articles__list">
      <BlogArticle v-for="(article, index) in articles" :key="index" :article="article" />
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
import BlogArticle, { Article } from '~/components/home/articlesList/BlogArticle.vue'
import ShowAll from '~/components/home/ShowAll.vue'

const articles: Article[] = [
  {
    title: 'Drukarka do plakatów',
    date: '20 marca 2023',
    img: '',
    url: '',
  },
  {
    title: 'Drukarka do plakatów',
    date: '20 marca 2023',
    img: '',
    url: '',
  },
  {
    title: 'Drukarka do plakatów',
    date: '20 marca 2023',
    img: '',
    url: '',
  },
  {
    title: 'Drukarka do plakatów',
    date: '20 marca 2023',
    img: '',
    url: '',
  },
]

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
