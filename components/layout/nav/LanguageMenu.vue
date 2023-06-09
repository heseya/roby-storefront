<template>
  <LayoutNavMenu
    v-if="languages.length > 1"
    :selected-item="language"
    :items="languages"
    class="language-menu__menu"
    @update:selected-item="language = $event"
  >
    <img :src="getIcon(language)" class="language-menu__icon" />
    <template #options="item">
      <img :src="getIcon(item.value)" class="language-menu__icon" />
      {{ $t(`languages.${item.value}`) }}
    </template>
  </LayoutNavMenu>
</template>

<script lang="ts" setup>
import pl from '@/assets/icons/pl.svg'
import en from '@/assets/icons/en.svg'

const $t = useGlobalI18n()
const { setLocale, locale } = useI18n()

const getIcon = (value: string) => (value === 'pl' ? pl : en)

const selectedLanguage = ref<string>(locale.value)

const languages = computed<string[]>(() => ['pl'])

const language = computed({
  get: () => selectedLanguage.value,
  set: (item: string) => {
    setLocale(item)
    selectedLanguage.value = item
  },
})
</script>

<style lang="scss" scoped>
.language-menu {
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
  }
}
</style>
