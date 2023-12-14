<template>
  <div class="product-attributes">
    <template v-if="showDescriptionShortInAttributes">
      <!-- This is a ***REMOVED*** specific rule, maybe refactor somehow in the future? -->
      <div class="attributes-description-short" v-html="product.description_short"></div>

      <br />
      <LayoutDropDownButton
        v-model:expanded="isExpanded"
        :expand-text="t('expand')"
        :collapse-text="t('collapse')"
      />
      <br />
    </template>

    <ul v-show="isExpanded || !showDescriptionShortInAttributes" class="product-attributes__list">
      <li v-for="[name, value] in parsedAttributes" :key="name" class="product-attributes__item">
        <b>{{ name }}</b>
        <span>{{ value }}</span>
      </li>
    </ul>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "expand": "Pokaż więcej",
    "collapse": "Ukryj dodatkowe informacje"
  },
  "en": {
    "expand": "Show more",
    "collapse": "Hide additional information"
  }
}
</i18n>

<script setup lang="ts">
import { Product } from '@heseya/store-core'
import { useConfigStore } from '~/store/config'

const props = defineProps<{
  product: Product
}>()

const config = useConfigStore()

const t = useLocalI18n()

const isExpanded = ref(false)

const showDescriptionShortInAttributes = computed(
  () => config.env.show_description_short_in_attributes === '1',
)

const parsedAttributes = computed(() => {
  return (
    props.product.attributes?.map((a) => [
      a.name,
      a.selected_options.map((o) => o.name || o.value_date || o.value_number).join(', '),
    ]) || []
  )
})
</script>

<style lang="scss" scoped>
.product-attributes {
  max-width: 600px;
  // margin: 0 auto;

  @media ($viewport-8) {
    align-self: flex-start;
  }

  &__title {
    font-size: rem(20);
    line-height: rem(26);
    font-weight: 500;
    margin-bottom: 16px;
  }

  &__list {
    margin: 0;
    padding-left: 0;
    list-style: none;
  }

  &__item {
    display: grid;
    padding: 8px 16px;
    grid-template-columns: 1fr 1fr;

    &:nth-child(odd) {
      background-color: $gray-color-100;
    }

    &:last-of-type {
      border-bottom: none;
    }
  }
}

.attributes-description-short {
  // Force to hide any <a> elements in content
  :deep(a),
  :deep(button) {
    display: none;
  }
}
</style>
