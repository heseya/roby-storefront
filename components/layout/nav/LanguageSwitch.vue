<template>
  <LayoutPopover
    v-if="languages.length > 1"
    v-model:value="language"
    :options="languages"
    class="language-switch__menu"
  >
    <template #option="item">
      <img :src="getIcon(item.value.key)" class="language-switch__icon" />
      {{ $t(`languages.${item.value.key}`) }}
    </template>
  </LayoutPopover>
</template>

<script lang="ts" setup>
import plFlagUrl from '@/assets/icons/pl.svg'
import enFlagUrl from '@/assets/icons/en.svg'

interface Language {
  key: string
}

const $t = useGlobalI18n()
const { setLocale, locale, locales } = useI18n()

const getIcon = (value: string) => (value === 'pl' ? plFlagUrl : enFlagUrl)

const languages = computed<Language[]>(() =>
  locales.value.map((v) => ({
    key: typeof v === 'string' ? v : v.code,
  })),
)

const language = computed({
  get: () => ({ key: locale.value }),
  set: (item: Language) => setLocale(item.key),
})
</script>

<style lang="scss" scoped>
.language-switch {
  height: 50px;
  display: flex;
  justify-content: flex-end;
  border-bottom: 1px solid $gray-color-300;

  &__menu {
    margin-right: 54px;
  }

  &__icon {
    height: 24px;
    width: 24px;
    margin-right: 4px;
  }
}
</style>
