<template>
  <a
    v-if="isRedirectVisible"
    :href="redirectUrl"
    rel="nofollow noreferrer"
    target="_blank"
    class="nav-custom-redirect"
  >
    <img
      v-if="redirectIcon"
      :src="redirectIcon"
      role="presentation"
      class="nav-custom-redirect__icon"
    />
    <span class="nav-custom-redirect__text">{{ redirectText }}</span>
  </a>
</template>

<script setup lang="ts">
import { useConfigStore } from '~/store/config'

const config = useConfigStore()

const redirectUrl = computed(() => String(config.env.custom_nav_redirect_url))
const redirectText = computed(() => String(config.env.custom_nav_redirect_text))
const redirectIcon = computed(() => String(config.env.custom_nav_redirect_icon))

const isRedirectVisible = computed(() => !!redirectUrl.value && !!redirectText.value)
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
