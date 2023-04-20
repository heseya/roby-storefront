<template>
  <nuxt-link :to="localePath(`/blog/${article.slug}`)" class="article">
    <div class="article__image-container">
      <img :src="imageUrl" :alt="translatedArticle.title" />
      <div class="article__floating-title">{{ translatedArticle.title }}</div>
    </div>
    <div class="article__title">{{ translatedArticle.description }}</div>
    <div class="article__date">{{ formatDate(article.date_created, 'dd LLLL yyyy') }}</div>
  </nuxt-link>
</template>

<script lang="ts" setup>
import { Article } from '~/interfaces/Article'
import { getImageUrl, getTranslated } from '~/utils/directus'
import { formatDate } from '~/utils/dates'

const props = defineProps<{
  article: {
    type: Article
    required: true
  }
}>()

const localePath = useLocalePath()
const imageUrl = getImageUrl(props.article.image)
const translatedArticle = getTranslated(props.article.translations, 'PL-pl')
</script>

<style lang="scss" scoped>
.article {
  text-decoration: none;

  &__image-container {
    width: 100%;
    background: $gray-color-300;
    border-radius: 5px;
    position: relative;

    &:after {
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
    background: $unnamed-color-242423;
    position: absolute;
    bottom: 15px;
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
