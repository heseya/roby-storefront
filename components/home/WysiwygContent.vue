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
:deep(figure),
:deep(figure > a) {
  display: block;
  overflow: hidden;
  border-radius: 10px;
}

:deep(figure > img),
:deep(figure > a > img) {
  display: block;
  transition: transform 0.25s;

  &:hover {
    transform: scale(1.1);
  }
}
</style>
