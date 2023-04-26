<template>
  <BaseContainer>
    <LayoutLoading :active="pending" />
    <h1 class="blog__title">{{ t('blog') }}</h1>
    <div class="blog">
      <div class="blog__tags">
        <BlogTag :link="localePath(`/blog`)" :class="route.query.tag ? '' : 'blog-tag--active'">
          {{ t('all') }}
        </BlogTag>
        <BlogTranslatedTag
          v-for="tag in tags?.data ?? []"
          :key="tag.id"
          :tag="tag"
          :class="tag.id == route.query.tag ? 'blog-tag--active' : ''"
        />
      </div>
      <div v-if="articles?.data?.length > 0" class="blog__articles">
        <BlogArticleTile
          v-for="article in articles?.data ?? []"
          :key="article.id"
          :article="article"
        ></BlogArticleTile>
      </div>
      <LayoutEmpty v-else>{{ t('empty') }}</LayoutEmpty>
    </div>
    <Pagination
      v-if="articles?.data?.length > 0"
      :current="page"
      :total="lastPage"
      @go="changePage"
    />
  </BaseContainer>
</template>

<i18n lang="json">
{
  "pl": {
    "blog": "Blog",
    "empty": "Brak postów do wyświetlenia",
    "all": "Wszystkie"
  }
}
</i18n>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const directus = useDirectus()
const t = useLocalI18n()

const limit = 6
const page = computed(() => Number(route.query.page ?? 1))
const lastPage = computed(() => Math.ceil((articles.value?.meta?.filter_count ?? 1) / limit))

const {
  data: articles,
  pending,
  refresh,
} = useAsyncData(`blog-articles-${route.query.page}-${route.query.tag}`, () => {
  return directus.items('Articles').readByQuery({
    fields: [
      'id',
      'slug',
      'date_created',
      'image.filename_disk',
      'translations.title',
      'translations.description',
      'translations.languages_code',
      'tags.BlogTags_id.translations.*',
    ],
    meta: ['filter_count'] as any,
    page: page.value,
    limit,
    filter: {
      status: 'published',
      tags: route.query.tag
        ? {
            BlogTags_id: {
              _eq: route.query.tag,
            },
          }
        : undefined,
    } as any, // this any exists because of directus weird typing
  })
})

const { data: tags } = useAsyncData(`blog-tags`, () => {
  return directus.items('BlogTags').readByQuery({
    fields: ['id', 'translations.*'],
  })
})

const changePage = (page: number | string) => {
  router.push({
    name: route.name!,
    params: route.params,
    query: {
      ...route.query,
      page,
    },
  })
}

useHead({
  title: t('blog'),
})

useBreadcrumbs([{ label: t('blog'), link: `/blog` }])

watch(
  () => route.query,
  () => refresh(),
)
</script>

<style lang="scss" scoped>
.blog {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-gap: 25px;
  margin-bottom: 30px;

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