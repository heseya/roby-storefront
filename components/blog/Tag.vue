<template>
  <BlogCustomTag
    :name="translatedTag.name"
    :link="`${localePath(`/blog`)}?tag=${tag.id ?? tag.BlogTags_id.id}`"
  />
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
