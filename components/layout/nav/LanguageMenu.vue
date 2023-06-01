<template>
  <div v-if="languages.length > 1" class="language-menu">
    <LayoutNavMenu
      :selected-item="language"
      :items="languages"
      class="language-menu__menu"
      @update:selected-item="language = $event"
    />
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "pl": "Polski",
    "en": "Angielski"
  },
  "en": {
    "pl": "Polish",
    "en": "English"
  }
}
</i18n>

<script lang="ts" setup>
import { MenuItem } from './Menu.vue'
import pl from '@/assets/icons/pl.svg?component'
import en from '@/assets/icons/en.svg?component'
const { AllowedUILanguages } = usePublicRuntimeConfig()

const t = useLocalI18n()
const { setLocale, locale } = useI18n()

const getIcon = (value: string) => (value === 'pl' ? markRaw(pl) : markRaw(en))

const selectedLanguage = ref<MenuItem>({
  text: t(locale.value),
  value: locale.value,
  icon: getIcon(locale.value),
})

const languages = computed<MenuItem[]>(() =>
  AllowedUILanguages.split(',').map((lang) => ({
    value: lang,
    text: t(lang),
    icon: getIcon(lang),
  })),
)
const language = computed({
  get: () => selectedLanguage.value,
  set: (item: MenuItem) => {
    setLocale(item.value)
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
}
</style>
