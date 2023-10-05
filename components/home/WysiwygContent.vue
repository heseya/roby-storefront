<template>
  <BaseWysiwygContent
    v-if="data.data.value"
    :content="data.data.value.content_html"
    class="home-wysiwyg-content"
  />
</template>

<script setup lang="ts">
const props = defineProps<{ pageId: string }>()
const heseya = useHeseya()

const data = useAsyncData('page', async () => {
  return await heseya.Pages.getOne(props.pageId)
})
</script>

<style lang="scss" scoped>
:deep(figure) {
  overflow: hidden;
  border-radius: 10px;
}

:deep(figure img) {
  transition: transform 0.25s;

  &:hover {
    transform: scale(1.1);
  }
}
</style>
