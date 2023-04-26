<template>
  <BlogTag :link="`${localePath(`/blog`)}?tag=${tag.id ?? tag.BlogTags_id.id}`">
    {{ translatedTag.name }}
  </BlogTag>
</template>

<script lang="ts" setup>
import { BlogTag as Tag } from '~/interfaces/BlogTag'

const localePath = useLocalePath()
const props = defineProps<{
  tag: Tag
}>()

const translatedTag = computed(() =>
  props.tag.BlogTags_id
    ? getTranslated(props.tag.BlogTags_id.translations, 'PL-pl')
    : getTranslated(props.tag.translations, 'PL-pl'),
)
</script>
