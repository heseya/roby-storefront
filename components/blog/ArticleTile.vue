<template>
  <nuxt-link :to="localePath(`/blog/${article.slug}`)" class="blog-article">
    <div class="blog-article__image-container">
      <img :src="imageUrl" :alt="translatedArticle.title" />
      <div class="blog-article__floating-title">{{ translatedArticle.title }}</div>
    </div>
    <div class="blog-article__title">{{ translatedArticle.description }}</div>
    <div class="blog-article__date">{{ dateCreated }}</div>
  </nuxt-link>
</template>

<script lang="ts" setup>
import { BlogArticle } from '~/interfaces/BlogArticle'
import { getImageUrl, getTranslated } from '~/utils/directus'

const props = defineProps<{
  article: {
    type: BlogArticle
    required: true
  }
}>()

const localePath = useLocalePath()
const imageUrl = computed(() => getImageUrl(props.article.image))
const translatedArticle = computed(() => getTranslated(props.article.translations, 'PL-pl'))
const dateCreated = computed(() => formatDate(props.article.date_created, 'dd LLLL yyyy'))
</script>

<style lang="scss" scoped>
.blog-article {
  text-decoration: none;

  &__image-container {
    width: 100%;
    background: $gray-color-300;
    border-radius: 5px;
    position: relative;

    &::after {
      content: '';
      display: block;
      padding-bottom: 63%;
    }

    img {
      position: absolute;
      border-radius: 5px;
      height: 100%;
      width: 100%;
      object-fit: fill;
    }
  }

  &__floating-title {
    color: white;
    background: $gray-color-900;
    position: absolute;
    bottom: 20px;
    left: 0;
    font-weight: bold;
    padding: 3px 10px;
    text-transform: uppercase;
  }

  &__title {
    color: black;
    margin-top: 5px;
    font-weight: bold;
  }

  &__date {
    margin-top: 5px;
    color: $gray-color-600;
  }
}
</style>
