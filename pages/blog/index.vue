<template>
  <NuxtLayout>
    <LayoutBreadcrumpsProvider :breadcrumbs="breadcrumbs" />

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
        <div v-if="articles?.data?.length" class="blog__articles">
          <BlogArticleTile
            v-for="article in articles?.data ?? []"
            :key="article.id"
            :article="article"
          ></BlogArticleTile>
        </div>
        <LayoutEmpty v-else>{{ t('empty') }}</LayoutEmpty>
      </div>
      <Pagination
        v-if="articles?.data?.length"
        :current="page"
        :total="lastPage"
        @go="changePage"
      />
    </BaseContainer>
  </NuxtLayout>
</template>

<i18n lang="json">
{
  "pl": {
    "blog": "Blog",
    "empty": "Brak postów do wyświetlenia",
    "all": "Wszystkie",
    "error": "Nie udało się pobrać blogów"
  }
}
</i18n>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const t = useLocalI18n()
const { t: $t } = useI18n({ useScope: 'global' })
const localePath = useLocalePath()
const directus = useDirectus()

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
      'tags.BlogTags_id.id',
      'tags.BlogTags_id.translations.*',
    ],
    meta: ['filter_count'] as any,
    page: page.value,
    limit,
    sort: ['-date_created'],
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

const { data: tags } = useLazyAsyncData(`blog-tags`, () => {
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

useSeoMeta({
  title: () => t('blog'),
})

const breadcrumbs = computed(() => [{ label: $t('breadcrumbs.blog'), link: `/blog` }])

watch(
  () => route.query,
  () => refresh(),
)
</script>

<style lang="scss" scoped>
.blog {
  width: 100%;
  margin-bottom: 30px;

  @media ($viewport-8) {
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-gap: 25px;
  }

  &__title {
    margin-bottom: 25px;
  }

  &__tags {
    gap: 8px;
    display: flex;
    padding-bottom: 10px;
    margin-bottom: 10px;
    overflow-y: auto;

    @media ($viewport-8) {
      flex-direction: column;
    }
  }

  &__articles {
    display: grid;
    grid-gap: 25px;

    @media ($viewport-8) {
      grid-template-columns: 1fr 1fr;
    }
  }
}
</style>
