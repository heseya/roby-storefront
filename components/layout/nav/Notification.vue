<template>
  <div v-show="config.topSiteText" class="notification">
    <span class="notification__title">{{ config.topSiteText }}</span>
    <LayoutIconButton
      v-show="false"
      class="notification__button"
      :icon="Close"
      icon-size="sm"
      :title="t('close')"
    />
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "close": "Zamknij powiadomienie"
  },
  "en": {
    "close": "Close the notification"
  }
}
</i18n>

<script lang="ts" setup>
import Close from '@/assets/icons/cross.svg?component'
import { useConfigStore } from '@/store/config'
// import { useNavNotificationBarStore } from '@/store/navNotificationBar'

const t = useLocalI18n()
const config = useConfigStore()

// TODO load notification without hydration & layout shift problem
// const navNotificationBar = useNavNotificationBarStore()
//
// watch(
//   () => config.topSiteText,
//   () => navNotificationBar.setIfNew(config.topSiteText as string),
//   { deep: true, immediate: true },
// )
</script>

<style lang="scss" scoped>
.notification {
  height: 40px;
  @include flex-row;
  justify-content: space-between;
  align-items: center;
  color: $white-color;
  background-color: var(--secondary-color);
  font-size: rem(12);
  padding: 0 3px;

  @media ($viewport-6) {
    font-size: 1rem;
  }

  &__title {
    flex: 1;
    text-align: center;
  }

  &__button {
    height: 40px;
    width: 40px;
    color: $white-color;
  }
}
</style>
