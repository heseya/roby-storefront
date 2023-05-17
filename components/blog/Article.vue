<template>
  <div>
    <LayoutBreadcrumpsProvider :breadcrumbs="breadcrumbs" />

    <BaseContainer>
      <LayoutLoading :active="pending" />
      <div v-if="article" class="blog-page">
        <h1 class="blog-page__title">{{ translatedArticle?.title }}</h1>
        <div class="blog-page__img">
          <img :src="imageUrl" :alt="translatedArticle?.description" />
        </div>
        <div class="blog-page__info">
          <div class="blog-page__tags">
            <BlogTranslatedTag
              v-for="tag in article?.tags ?? []"
              :key="tag.id"
              :tag="(tag as any)"
            />
          </div>
          <div class="blog-page__date">{{ dateCreated }}</div>
        </div>
        <BaseWysiwygContent
          v-if="translatedArticle?.content"
          :content="translatedArticle.content"
        />
      </div>
    </BaseContainer>
  </div>
</template>

<script setup lang="ts">
import { BlogArticle } from '~/interfaces/BlogArticle'

const props = defineProps<{
  slug: string
}>()

const { t } = useI18n({ useScope: 'global' })
const { data: article, pending } = useAsyncData(`blog-article-${props.slug}`, async () => {
  const directus = useDirectus()

  const response = await directus?.items('Articles').readByQuery({
    fields: [
      'id',
      'slug',
      'date_created',
      'image.filename_disk',
      'translations.title',
      'translations.description',
      'translations.languages_code',
      'translations.content',
      'tags.BlogTags_id.id',
      'tags.BlogTags_id.translations.*',
    ],
    limit: 1,
    filter: {
      slug: props.slug,
      status: 'published' as const,
    } as any, // this any exists because of directus weird typing
  })

  if (!response?.data?.[0]) {
    showError({ message: t('errors.NOT_FOUND'), statusCode: 404 })
  }

  return response?.data?.[0] as BlogArticle
})

const imageUrl = computed(() => getImageUrl(article.value?.image))
const translatedArticle = computed(() =>
  article.value ? getTranslated(article.value.translations, 'PL-pl') : null,
)
const dateCreated = computed(() =>
  article.value ? formatDate(article.value.date_created, 'dd LLLL yyyy') : '',
)

useSeo(() => [{ title: translatedArticle.value?.title }])

const breadcrumbs = computed(() => [
  { label: t('breadcrumbs.blog'), link: `/blog` },
  { label: translatedArticle.value?.title ?? '', link: `/${article.value?.slug}` },
])
</script>

<style lang="scss" scoped>
.blog-page {
  max-width: $content-width;
  margin: auto;

  &__title {
    margin-bottom: 20px;
    line-height: 1.2em;

    @media ($viewport-8) {
      margin: 25px 0;
      text-align: center;
    }
  }

  &__img {
    width: 100%;
    background: $gray-color-300;
    border-radius: 5px;
    position: relative;

    &::after {
      content: '';
      display: block;
      padding-bottom: 40%;

      @media ($viewport-8) {
        padding-bottom: 30%;
      }
    }

    img {
      position: absolute;
      border-radius: 5px;
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }

  &__info {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 61px;
    margin: 10px 0;
  }

  &__tags {
    display: flex;
    gap: 10px;
  }

  &__date {
    color: $gray-color-600;
  }
}
</style>
