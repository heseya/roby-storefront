<template>
  <BlogTag :link="`${localePath(`/blog`)}?tag=${tag.id}`">
    {{ translatedTag.name }}
  </BlogTag>
</template>

<script lang="ts" setup>
import type { BlogTag as Tag } from '~/interfaces/BlogTag'

const localePath = useLocalePath()
const props = defineProps<{
  tag: Tag
}>()

const tag = computed(() => ('BlogTags_id' in props.tag ? props.tag.BlogTags_id : props.tag))
const translatedTag = computed(() => getTranslated(tag.value.translations, 'PL-pl'))
</script>
