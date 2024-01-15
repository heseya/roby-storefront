<template>
  <div class="blog-article">
    <NuxtLink :to="localePath(`/${article.slug}`)" class="blog-article__link">
      <div class="blog-article__image-container">
        <img :src="imageUrl" :alt="translatedArticle.title" loading="lazy" />
        <div class="blog-article__floating-title">{{ translatedArticle.title }}</div>
      </div>
      <div class="blog-article__title">{{ translatedArticle.description }}</div>
    </NuxtLink>
    <div class="blog-article__date">
      <div>{{ dateCreated }}</div>
      <div>
        <LazyBlogSimpleTag v-for="tag in article.tags" :key="tag.id" :tag="tag" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { BlogArticle } from '~/interfaces/BlogArticle'

const props = defineProps<{
  article: BlogArticle
}>()

const localePath = useLocalePath()
const imageUrl = computed(() =>
  getImageUrl(props.article.image, {
    width: 400,
    height: 300,
    fit: 'cover',
  }),
)
const translatedArticle = computed(() => getTranslated(props.article.translations, 'PL-pl'))
const dateCreated = computed(() => formatDate(props.article.date_created, 'dd LLLL yyyy'))
</script>

<style lang="scss" scoped>
.blog-article {
  &__link {
    text-decoration: none;
  }

  &__image-container {
    width: 100%;
    background: $gray-color-300;
    border-radius: 5px;
    position: relative;
    overflow: hidden;

    &::after {
      content: '';
      display: block;
      padding-bottom: 63%;
    }

    img {
      transition: 0.2s;
      position: absolute;
      border-radius: 5px;
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }

  &__floating-title {
    color: white;
    background: $gray-color-900;
    position: absolute;
    width: 100%;
    bottom: 20px;
    left: 0;
    font-weight: bold;
    padding: 3px 10px;
    text-transform: uppercase;
    transition: all 0.25s;
  }

  &__title {
    color: $text-color;
    margin-top: 5px;
    font-weight: bold;
  }

  &__date {
    margin-top: 5px;
    color: $gray-color-700;
    display: flex;
    justify-content: space-between;
  }

  &:hover &__floating-title {
    background-color: var(--highlight-color);
  }

  &:hover &__image-container img {
    transform: scale(1.1);
  }
}
</style>
