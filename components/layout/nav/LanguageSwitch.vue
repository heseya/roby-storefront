<template>
  <LayoutPopover
    v-show="languages.length > 1"
    :value="language"
    :options="languages"
    class="language-switch__menu"
    @update:value="setLanguage"
  >
    <template #option="item">
      <img
        :key="item.value.key"
        :src="getIcon(item.value.key)"
        class="language-switch__icon"
        loading="lazy"
      />
      {{ $t(`languages.${item.value.key}`) }}
    </template>
  </LayoutPopover>
</template>

<script lang="ts" setup>
import plFlagUrl from '@/assets/icons/lang/pl.png'
import enFlagUrl from '@/assets/icons/lang/en.png'
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
  // Set channel to a default channel for language
  const langChannels = channels.channels.filter((c) => c.language.iso.includes(language.key))
  // If lang switched to EN, select UK channel
  const channelSlug = language.key === 'en' ? 'uk' : 'pl'
  const channel = langChannels.find((c) => c.slug.includes(channelSlug)) || langChannels[0]

  if (channel) {
    // channels.setChannel(channel.id)
    setTimeout(() => {
      if (window) window.location.reload()
    }, 100)
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
