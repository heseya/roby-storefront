<template>
  <LayoutPopover
    v-show="channelsList.length > 1"
    :value="selected"
    :options="channelsList"
    class="channel-switch__menu"
    @update:value="setChannel"
  >
    <template #option="item"> Region: {{ item.value.name }} </template>
  </LayoutPopover>
</template>

<script lang="ts" setup>
import { SalesChannelStatus } from '@heseya/store-core'
import { useChannelsStore } from '@/store/channels'

const channels = useChannelsStore()

const channelsList = computed(() =>
  channels.channels
    .filter((c) => c.status === SalesChannelStatus.Active)
    .map((c) => ({ key: c.id, name: c.name })),
)

const selected = computed(() => ({
  key: channels.selected?.id || '',
  name: channels.selected?.name || '',
}))

const setChannel = (data: { key: string }) => {
  const channel = channels.channels.find((c) => c.id === data.key)
  if (!channel) {
    // eslint-disable-next-line no-console
    console.error(`Channel with id ${data.key} not found, but was selected`)
    return
  }

  channels.setChannel(channel.id)

  // maybe better way to reload page?
  if (window) window.location.reload()
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
