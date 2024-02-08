<template>
  <NuxtLayout>
    <LayoutBreadcrumpsProvider :breadcrumbs="breadcrumbs" />

    <BaseContainer>
      <LayoutLoading :active="pending" />
      <h1 class="blog__title">{{ $t('breadcrumbs.blog') }}</h1>
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
    "empty": "Brak postów do wyświetlenia",
    "all": "Wszystkie"
  },
  "en": {
    "empty": "There are no posts to display",
    "all": "All"
  }
}
</i18n>

<script setup lang="ts">
import type { BlogArticle } from '~/interfaces/BlogArticle'

const route = useRoute()
const t = useLocalI18n()
const $t = useGlobalI18n()
const localePath = useLocalePath()
const directus = useDirectus()

const limit = 6
const page = computed(() => Number(route.query.page ?? 1))
const lastPage = computed(() => Math.ceil((articles.value?.meta?.filter_count ?? 1) / limit))

const {
  data: articles,
  pending,
  refresh,
} = useAsyncData(`blog-articles-${route.query.page}-${route.query.tag}`, async () => {
  const data = await directus.items('Articles').readByQuery({
    fields: [
      'id',
      'slug',
      'date_created',
      'image',
      'translations.title',
      'translations.description',
      'translations.languages_code',
      // @ts-ignore directus is wrong
      'tags.BlogTags_id.id',
      // @ts-ignore directus is wrong
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
  // TODO: fix directus types
  return { ...data, data: data.data as unknown as BlogArticle[] }
})

const { data: tags } = useLazyAsyncData(`blog-tags`, () => {
  return directus.items('BlogTags').readByQuery({
    fields: ['id', 'translations.*'],
  })
})

const changePage = (page: number | string) => {
  navigateTo({
    name: route.name!,
    params: route.params,
    query: {
      ...route.query,
      page,
    },
  })
}

useSeoTitle($t('breadcrumbs.blog'))

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
