<template>
  <nuxt-link
    :to="`${localePath(`/blog`)}?tag=${tag.id ?? tag.BlogTags_id.id}`"
    class="simple-blog-tag"
  >
    {{ translatedTag.name }}
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
.simple-blog-tag {
  color: $gray-color-900;
  margin-left: 10px;
}
</style>
