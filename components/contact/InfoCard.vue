<template>
  <div class="info-card">
    <span class="info-card__title">{{ translated.name }}</span>
    <a class="info-card__email" :href="`mailto:${data.email}`">{{ data.email }}</a>
    <span v-if="data.phone_mobile"> {{ $t('phonePrefix.mobile') }} {{ data.phone_mobile }} </span>
    <span v-if="data.phone_stationery">
      {{ $t('phonePrefix.default') }} {{ data.phone_stationery }}
    </span>
    <p v-if="translated.text" class="info-card__text">{{ translated.text }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ContactDepartment } from '@/interfaces/contactPage'

const $t = useGlobalI18n()

const props = defineProps<{ data: ContactDepartment }>()

const translated = computed(() => getTranslated(props.data.translations, 'PL-pl'))
</script>

<style lang="scss" scoped>
.info-card {
  flex: 1;
  @include flex-column;
  padding: 12px 16px;
  border: solid 1px $gray-color-300;
  border-radius: 4px;

  &__title {
    text-transform: uppercase;
    font-weight: bold;
  }

  &__email {
    color: var(--secondary-color);
    text-decoration: none;
  }

  &__text {
    white-space: pre-line;
  }
}
</style>
