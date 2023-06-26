<template>
  <div class="additional-description">
    <BaseWysiwygContent :content="fullPage?.content_html || ''" />
    <LayoutLoading :active="pending" />
  </div>
</template>

<script setup lang="ts">
import { PageList } from '@heseya/store-core'

const heseya = useHeseya()

const props = defineProps<{
  page: PageList
}>()

const { data: fullPage, pending } = useLazyAsyncData(`page-${props.page.slug}`, async () => {
  return await heseya.Pages.getOneBySlug(props.page.slug)
})
</script>

<style lang="scss" scoped>
.additional-description {
  position: relative;
}
</style>
