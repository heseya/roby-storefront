<template>
  <nuxt-link :to="`${localePath(`/blog`)}?tag=${tag.id}`" class="simple-blog-tag">
    {{ translatedTag.name }}
  </nuxt-link>
</template>

<script lang="ts" setup>
import type { BlogTag } from '~/interfaces/BlogTag'

const localePath = useLocalePath()
const props = defineProps<{
  tag: BlogTag
}>()

const tag = computed(() => ('BlogTags_id' in props.tag ? props.tag.BlogTags_id : props.tag))
const translatedTag = computed(() => getTranslated(tag.value.translations, 'PL-pl'))
</script>

<style lang="scss" scoped>
.simple-blog-tag {
  color: $gray-color-900;
  margin-left: 10px;
  white-space: nowrap;
}
</style>
