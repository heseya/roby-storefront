<template>
  <NuxtLayout>
    <div class="universal-page">
      <LayoutLoading :active="pending" />

      <template v-if="!pending">
        <LazyStaticArticle v-if="page" :page="page" />
        <BlogArticle v-else :slug="slug" />
      </template>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const heseya = useHeseya()
const route = useRoute()

const slug = computed(() => route.params.slug as string)

/**
 * This component is used for holding both static and blog articles in one route
 * When static page is found, it will be rendered, otherwise blog article will be rendered. If none of them is found, 404 will be shown (<BlogArticle /> handles this)
 */
const { data: page, pending } = useAsyncData(`static-${slug.value}`, async () => {
  try {
    return await heseya.Pages.getOneBySlug(slug.value)
  } catch (e: any) {
    if (e?.response?.status !== 404) showError({ message: e.statusCode, statusCode: 500 })
    return null
  }
})
</script>

<style lang="scss" scoped>
.universal-page {
}
</style>
