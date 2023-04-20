<template>
  <nuxt-link :to="localePath(`/blog/${article.url}`)" class="article">
    <div class="article__image-container">
      <div class="article__floating-title">{{ article.title }}</div>
    </div>
    <div class="article__title">{{ article.title }}</div>
    <div class="article__date">{{ article.date }}</div>
  </nuxt-link>
</template>

<script lang="ts" setup>
export interface Article {
  title: string
  url: string
  date: string
  img: string
}

defineProps<{
  article: Article
}>()
const localePath = useLocalePath()
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
