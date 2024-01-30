<template>
  <div v-show="config.topSiteText" class="notification">
    <div class="notification__text" v-html="config.topSiteText"></div>
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
import { useConfigStore } from '@/store/config'
const config = useConfigStore()
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

  &__text {
    flex: 1;
    text-align: center;

    :deep(a) {
      color: $white-color;
    }
  }
}
</style>
