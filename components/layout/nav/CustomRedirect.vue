<template>
  <a
    v-if="redirect"
    :href="redirect.url"
    rel="nofollow noreferrer"
    target="_blank"
    class="nav-custom-redirect"
  >
    <img
      v-if="redirect.icon"
      :src="redirect.icon"
      role="presentation"
      class="nav-custom-redirect__icon"
    />
    <span class="nav-custom-redirect__text">{{ redirect.text }}</span>
  </a>
</template>

<script setup lang="ts">
import { useConfigStore } from '~/store/config'

const config = useConfigStore()

const redirect = computed(() => config.customRedirect)
</script>

<style lang="scss" scoped>
.nav-custom-redirect {
  display: flex;
  align-items: center;
  color: $text-color;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  &__icon {
    display: block;
    width: 24px;
    margin-right: 8px;
  }
}
</style>
