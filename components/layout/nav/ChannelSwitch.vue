<template>
  <LayoutPopover
    v-show="channelsList.length > 1 && mode === 'popover'"
    :value="selected"
    :options="channelsList"
    class="channel-switch__menu"
    @update:value="setChannel"
  >
    <template #option="item">
      {{ selected === item.value ? 'Region:' : '' }} {{ item.value.name }}
    </template>
  </LayoutPopover>

  <FormSelect
    v-show="channelsList.length > 1 && mode === 'select'"
    :model-value="selected.key"
    class="channel-switch__menu"
    name="sales_channel"
    @update:model-value="(key) => setChannel({ key: key?.toString() || '' })"
  >
    <option v-for="item in channelsList" :key="item.key" :value="item.key">
      {{ item.name }}
    </option>
  </FormSelect>
</template>

<script lang="ts" setup>
import { Language } from '@heseya/store-core'
import { useChannelsStore } from '@/store/channels'

withDefaults(
  defineProps<{
    mode?: 'select' | 'popover'
  }>(),
  {
    mode: 'popover',
  },
)

const { setLocale, locales } = useI18n()
const channels = useChannelsStore()

const channelsList = computed(() => channels.channels.map((c) => ({ key: c.id, name: c.name })))

const selected = computed(() => ({
  key: channels.selected?.id || '',
  name: channels.selected?.name || '',
}))

const setChannel = async (data: { key: string }) => {
  const channel = channels.channels.find((c) => c.id === data.key)
  if (!channel) {
    // eslint-disable-next-line no-console
    console.error(`Channel with id ${data.key} not found, but was selected`)
    return
  }

  channels.setChannel(channel.id)

  // TODO: remove this hardcoded rule maybe?
  // Set language to a default language for channel
  await setLanguage(channel.default_language)
  if (window) window.location.reload()
}

const setLanguage = async (language: Language) => {
  const locale = locales.value.find((l) =>
    language.iso.includes(typeof l === 'string' ? l : l.code),
  )
  if (locale) await setLocale(typeof locale === 'string' ? locale : locale.code)
}
</script>

<style lang="scss" scoped>
.channel-switch {
  height: 50px;
  display: flex;
  justify-content: flex-end;
  border-bottom: 1px solid $gray-color-300;

  &__menu {
    margin-right: 16px;
  }
}
</style>
