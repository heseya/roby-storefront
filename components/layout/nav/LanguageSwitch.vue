<template>
  <LayoutPopover
    v-show="languages.length > 1"
    :value="language"
    :options="languages"
    class="language-switch__menu"
    @update:value="setLanguage"
  >
    <template #option="item">
      <img :key="item.value.key" :src="getIcon(item.value.key)" class="language-switch__icon" />
      {{ $t(`languages.${item.value.key}`) }}
    </template>
  </LayoutPopover>
</template>

<script lang="ts" setup>
import plFlagUrl from '@/assets/icons/pl.svg'
import enFlagUrl from '@/assets/icons/en.svg'
import { useChannelsStore } from '@/store/channels'

interface InnerLanguage {
  key: string
}

const $t = useGlobalI18n()
const { setLocale, locale, locales } = useI18n()
const channels = useChannelsStore()

const getIcon = (value: string) => (value === 'pl' ? plFlagUrl : enFlagUrl)

const languages = computed<InnerLanguage[]>(() =>
  locales.value.map((v) => ({
    key: typeof v === 'string' ? v : v.code,
  })),
)

const language = computed(() => ({ key: locale.value }))

const setLanguage = async (language: InnerLanguage) => {
  await setLocale(language.key)

  // TODO: remove this hardcoded rule maybe?
  // Set channel to PL if PL is a default language for channel
  if (language.key.includes('pl')) {
    const channel = channels.channels.find((c) => c.default_language.iso.includes('pl'))
    if (!channel) return

    channels.setChannel(channel.id)

    if (window) window.location.reload()
  }
}
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
