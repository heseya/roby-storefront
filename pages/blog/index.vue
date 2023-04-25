<template>
  <BaseContainer>
    <LayoutLoading :active="pending" />
    <h1 class="blog__title">Blog</h1>
    <div class="blog">
      <div class="blog__tags">
        <BlogTag v-for="tag in tags.data" :key="tag.id" :tag="tag" />
      </div>
      <div class="blog__articles">
        <BlogArticleTile
          v-for="article in articles.data"
          :key="article.id"
          :article="article"
        ></BlogArticleTile>
      </div>
    </div>
  </BaseContainer>
</template>

<script setup lang="ts">
const { params } = useRoute()
const directus = useDirectus()
const { data: articles, pending } = useAsyncData(
  `blog-articles-${params.page}-${params.tag}`,
  () => {
    return directus.items('Articles').readByQuery({
      fields: [
        'id',
        'slug',
        'date_created',
        'image.filename_disk',
        'translations.title',
        'translations.description',
        'translations.languages_code',
      ],
      page: (params.page as number) ?? 1,
      limit: 12,
      filter: {
        status: 'published',
        tags: params.tag
          ? {
              BlogTags_id: {
                _eq: params.tag,
              },
            }
          : undefined,
      } as any, // this any exists because of directus weird typing
    })
  },
)

const { data: tags } = useAsyncData(`blog-tags`, () => {
  return directus.items('BlogTags').readByQuery({
    fields: ['id', 'translations.*'],
  })
})

useHead({
  title: 'Blog',
})

useBreadcrumbs([{ label: 'Blog', link: `/blog` }])
</script>

<style lang="scss" scoped>
.blog {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-gap: 25px;

  &__title {
    margin-bottom: 25px;
  }

  &__tags {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__articles {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 25px;
  }
}
</style>
