<template>
  <div class="product-attachments">
    <LayoutHeader tag="h3" variant="black" class="product-attachments__header">
      {{ t('title') }}
    </LayoutHeader>

    <div class="product-attachments__content">
      <a
        v-for="link in attachments"
        :key="link.id"
        :href="link.media.url"
        target="_blank"
        class="product-attachments__link"
        rel="noopener noreferrer"
      >
        <DownloadIcon class="product-attachments__link-icon" />
        {{ link.name }}
      </a>
    </div>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "title": "Pliki do pobrania"
  },
  "en": {
    "title": "Files to download"
  }
}
</i18n>

<script setup lang="ts">
import type { ProductAttachment } from '@heseya/store-core'
import DownloadIcon from '~/assets/icons/download-blue.svg?component'

const t = useLocalI18n()
defineProps<{
  attachments: ProductAttachment[]
}>()
</script>

<style lang="scss" scoped>
.product-attachments {
  &__header {
    text-align: left;
    font-size: rem(20);
    line-height: rem(20);
    margin-bottom: 12px;
  }

  &__content {
    display: flex;
    gap: 8px;
  }

  &__link {
    display: flex;
    color: $blue-color-500;
    align-items: center;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  &__link-icon {
    margin-right: 4px;
  }
}
</style>
