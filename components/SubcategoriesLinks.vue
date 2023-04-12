<template>
  <div class="subcategories-list">
    <template v-if="isParent">
      <NuxtLink
        v-if="category?.parent"
        class="subcategories-list__link"
        :to="`/category/${category?.parent?.slug}`"
      >
        <ChevronIcon class="subcategories-list__icon" /> {{ category?.parent?.name }}
      </NuxtLink>

      <span v-if="subcategories?.length" class="subcategories-list__text">
        {{ category?.name }}
      </span>
    </template>

    <NuxtLink
      v-for="cat in subcategories || []"
      :key="cat.id"
      class="subcategories-list__link"
      :class="{
        'subcategories-list__link--intended': isParent,
      }"
      :to="`/category/${cat.slug}`"
    >
      {{ cat.name }}
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { ProductSet } from '@heseya/store-core'
import ChevronIcon from '@/assets/icons/chevron.svg?component'

const props = defineProps<{
  category: ProductSet
}>()
const heseya = useHeseya()

const isParent = computed(() => !!props.category?.parent)

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
  font-size: rem(14);
  line-height: rem(19);

  > *:not(:last-child) {
    margin-bottom: 10px;
  }

  &__icon {
    transform: rotate(180deg);
    margin-right: 2px;
    height: 0.65em;
  }

  &__link {
    display: block;
    color: $text-color;
    text-decoration: none;

    &--intended {
      margin-left: 20px;
    }

    &:hover {
      color: var(--primary-color);
    }
  }

  &__text {
    font-weight: 600;
  }
}
</style>
