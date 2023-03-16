<template>
  <div class="subcategories-list">
    <NuxtLink
      v-if="category?.parent"
      class="subcategories-list__link subcategories-list__link--bold"
      :to="`/category/${category?.parent?.slug}`"
    >
      {{ t('returnTo') }} {{ category?.parent?.name }}
    </NuxtLink>

    <NuxtLink
      v-for="cat in subcategories || []"
      :key="cat.id"
      class="subcategories-list__link"
      :to="`/category/${cat.slug}`"
    >
      {{ cat.name }}
    </NuxtLink>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "returnTo": "Wróć do"
  }
}
</i18n>

<script setup lang="ts">
import { ProductSet } from '@heseya/store-core'

const props = defineProps<{
  category: ProductSet
}>()
const heseya = useHeseya()
const t = useLocalI18n()

const { data: subcategories, refresh } = useAsyncData('subcategories', async () => {
  const { data } = await heseya.ProductSets.get({
    parent_id: props.category.id,
  })
  return data
})

watch(
  () => props.category,
  () => refresh(),
)
</script>

<style lang="scss" scoped>
.subcategories-list {
  display: flex;
  flex-direction: column;

  &__link {
    display: block;
    color: $text-color;
    text-decoration: none;
    font-size: rem(14);
    line-height: rem(19);

    &:not(:last-child) {
      margin-bottom: 10px;
    }

    &--bold {
      font-weight: 600;
    }

    &:hover {
      color: var(--primary-color);
    }
  }
}
</style>
