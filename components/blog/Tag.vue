<template>
  <nuxt-link :to="`${localePath(`/blog`)}?tag=${tag.id ?? tag.BlogTags_id.id}`" class="blog-tag">
    <div class="blog-tag__tag">
      {{ translatedTag.name }}
    </div>
  </nuxt-link>
</template>

<script lang="ts" setup>
import { BlogTag } from '~/interfaces/BlogTag'

const localePath = useLocalePath()
const props = defineProps<{
  tag: BlogTag
}>()

const translatedTag = computed(() =>
  props.tag.BlogTags_id
    ? getTranslated(props.tag.BlogTags_id.translations, 'PL-pl')
    : getTranslated(props.tag.translations, 'PL-pl'),
)
</script>

<style lang="scss" scoped>
.blog-tag {
  text-decoration: none;
  color: $text-color;

  &__tag {
    border: 1px solid $gray-color-300;
    padding: 10px 14px;
    border-radius: 5px;
    transition: 0.2s;

    &:hover {
      border: 1px solid var(--primary-color);
    }
  }

  &--active {
    .blog-tag__tag {
      border: 1px solid var(--primary-color);
    }
  }
}
</style>
