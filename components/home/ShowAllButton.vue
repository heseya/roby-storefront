<template>
  <NuxtLink v-if="isAltDesign" :to="localePath(`${path}`)" style="all: unset">
    <LayoutButton size="small" class="show-all-alt">
      <span class="show-all-alt__label">{{ $t('custom.showAll') }}</span>
      <LayoutIcon :icon="ArrowNext" :size="8" />
    </LayoutButton>
  </NuxtLink>
  <NuxtLink v-else :to="localePath(`${path}`)" class="show-all">
    <span class="show-all__label">{{ $t('custom.showAll') }}</span>
    <LayoutIcon :icon="ArrowNext" :size="8" />
  </NuxtLink>
</template>

<script lang="ts" setup>
import ArrowNext from '@/assets/icons/chevron.svg?component'
import { useConfigStore } from '~/store/config'

defineProps<{
  path: string
}>()

const $t = useGlobalI18n()
const localePath = useLocalePath()

const config = useConfigStore()

const isAltDesign = computed(() => config.env.alt_show_more_btn === '1')
</script>

<style lang="scss" scoped>
.show-all {
  all: unset;
  height: 20px;
  padding: 0 10px;

  @include flex-row;
  gap: 8px;
  align-items: center;

  border-radius: 10px;
  background-color: $gray-color-300;
  transition: background-color 200ms ease-in-out;

  &:hover {
    cursor: pointer;
    background-color: $gray-color-400;
  }
  &__label {
    text-transform: uppercase;
    font-family: var(--text-font-family, $textFont);
    font-size: rem(12);
    white-space: nowrap;
  }
}

.show-all-alt {
  display: flex;
  @include flex-row;
  gap: 8px;
  align-items: center;
}
</style>
