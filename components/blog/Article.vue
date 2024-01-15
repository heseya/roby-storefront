<template>
  <div>
    <LayoutBreadcrumpsProvider :breadcrumbs="breadcrumbs" />
    <BaseContainer>
      <LayoutLoading :active="pending" />
      <article class="blog-page">
        <h1 class="blog-page__title">{{ translatedArticle?.title }}</h1>
        <div v-if="!article?.hide_cover" class="blog-page__img">
          <img :src="coverUrl || imageUrl" :alt="translatedArticle?.description" />
        </div>
        <div class="blog-page__info">
          <div class="blog-page__tags">
            <BlogTranslatedTag v-for="tag in article?.tags ?? []" :key="tag.id" :tag="tag as any" />
          </div>
          <div class="blog-page__date">{{ dateCreated }}</div>
        </div>

        <BaseWysiwygContent
          v-if="translatedArticle?.content"
          :content="translatedArticle.content"
        />
      </article>
    </BaseContainer>
  </div>
</template>

<script setup lang="ts">
import { BlogArticle } from '~/interfaces/BlogArticle'

const props = defineProps<{
  slug: string
}>()

const directus = useDirectus()

const { t } = useI18n({ useScope: 'global' })
const { data: article, pending } = useAsyncData(`blog-article-${props.slug}`, async () => {
  if (!directus.url) {
    showError({ message: t('errors.NOT_FOUND'), statusCode: 404 })
    return null
  }

  try {
    const response = await directus.items('Articles').readByQuery({
      fields: [
        'id',
        'slug',
        'date_created',
        'no_index',
        'image',
        'cover_image',
        'hide_cover',
        'date_created',
        'date_updated',
        'user_created.*',
        'translations.title',
        'translations.description',
        'translations.languages_code',
        'translations.content',
        'translations.seo_description',
        'translations.seo_title',
        'translations.metatags',
        // @ts-ignore directus is wrong
        'tags.BlogTags_id.id',
        // @ts-ignore directus is wrong
        'tags.BlogTags_id.translations.*',
      ],
      limit: 1,
      filter: {
        slug: props.slug,
        status: 'published' as const,
      } as any, // this any exists because of directus weird typing
    })

    if (!response.data?.[0]) {
      showError({ message: t('errors.NOT_FOUND'), statusCode: 404 })
    }

    // @ts-ignore directus is wrong
    return response.data?.[0] as BlogArticle
  } catch (e: any) {
    showError({ message: e?.response?.status, statusCode: 500 })
    return null
  }
})

const imageUrl = computed(() => getImageUrl(article.value?.image, { width: 900 }))
const coverUrl = computed(() => getImageUrl(article.value?.cover_image, { width: 900 }))
const translatedArticle = computed(() =>
  article.value
    ? { ...article.value, ...getTranslated(article.value.translations, 'PL-pl') }
    : null,
)
const dateCreated = computed(() =>
  article.value ? formatDate(article.value.date_created, 'dd LLLL yyyy') : '',
)

const seoTitle = computed(
  () => translatedArticle.value?.seo_title ?? translatedArticle.value?.title,
)

const seoDescription = computed(
  () => translatedArticle.value?.seo_description ?? translatedArticle.value?.description,
)

useSeo(() => [
  {
    title: seoTitle.value,
    description: seoDescription.value,
    keywords: translatedArticle.value?.metatags?.split(',')?.filter(Boolean) || [],
    no_index: article.value?.no_index,
  },
])

// TODO: this types are working, but they are showing errors
useBlogJsonLd(translatedArticle as any)

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
