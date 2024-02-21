<template>
  <div v-if="showSocials" class="footer-socialmedia">
    <div class="footer-socialmedia__section">
      <span class="footer-socialmedia__text">{{ t('text') }}</span>
    </div>
    <div v-if="***REMOVED***SocialUrls.length > 0" class="footer-socialmedia__section">
      <img
        src="@/assets/icons/social/***REMOVED***.svg"
        alt="Hammer logo"
        class="footer-socialmedia__main-icon"
        loading="lazy"
      />
      <a
        v-for="[name, url] in ***REMOVED***SocialUrls"
        :key="name"
        target="_blank"
        rel="nofollow noreferrer"
        :href="url"
      >
        <img
          :src="ICONS[name]"
          :alt="t(`go_to_${name}`)"
          class="footer-socialmedia__icon"
          loading="lazy"
        />
      </a>
    </div>
    <div v-if="***REMOVED***SocialUrls.length > 0" class="footer-socialmedia__section">
      <img
        src="@/assets/icons/social/***REMOVED***.svg"
        alt="myPhone logo"
        class="footer-socialmedia__main-icon"
        loading="lazy"
      />
      <a
        v-for="[name, url] in ***REMOVED***SocialUrls"
        :key="name"
        target="_blank"
        rel="nofollow noreferrer"
        :href="url"
      >
        <img
          :src="ICONS[name]"
          :alt="t(`go_to_${name}`)"
          class="footer-socialmedia__icon"
          loading="lazy"
        />
      </a>
    </div>
    <div v-if="***REMOVED***SocialUrls.length > 0" class="footer-socialmedia__section">
      <img
        src="@/assets/icons/social/***REMOVED***.svg"
        alt="Techbite logo"
        class="footer-socialmedia__main-icon"
        loading="lazy"
      />
      <a
        v-for="[name, url] in ***REMOVED***SocialUrls"
        :key="name"
        target="_blank"
        rel="nofollow noreferrer"
        :href="url"
      >
        <img
          :src="ICONS[name]"
          :alt="t(`go_to_${name}`)"
          class="footer-socialmedia__icon"
          loading="lazy"
        />
      </a>
    </div>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "text": "Znajdź nas tutaj:",
    "go_to_facebook": "Przejdź do Facebooka",
    "go_to_instagram": "Przejdź do Instagrama",
    "go_to_youtube": "Przejdź do Youtube"
  },
  "en": {
    "text": "Find us here:",
    "go_to_facebook": "Go to Facebook",
    "go_to_instagram": "Go to Instagram",
    "go_to_youtube": "Go to Youtube"
  }
}
</i18n>

<script setup lang="ts">
/**
 * TODO: this is ***REMOVED*** specific component, maybe it should be refactored to be universal
 */

import FacebookIcon from '@/assets/icons/social/facebook.svg'
import InstagramIcon from '@/assets/icons/social/instagram.svg'
import YoutubeIcon from '@/assets/icons/social/youtube.svg'

import { useConfigStore } from '~/store/config'

const config = useConfigStore()
const t = useLocalI18n()

const getSocialUrls = (key: string) =>
  Object.entries({
    facebook: config.env[`${key}_facebook_url`]?.toString(),
    instagram: config.env[`${key}_instagram_url`]?.toString(),
    youtube: config.env[`${key}_youtube_url`]?.toString(),
  }).filter(([, value]) => value) as ['facebook' | 'instagram' | 'youtube', string][]

const ICONS = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  youtube: YoutubeIcon,
}

const ***REMOVED***SocialUrls = computed(() => getSocialUrls('***REMOVED***'))
const ***REMOVED***SocialUrls = computed(() => getSocialUrls('***REMOVED***'))
const ***REMOVED***SocialUrls = computed(() => getSocialUrls('***REMOVED***'))

const showSocials = computed(
  () =>
    ***REMOVED***SocialUrls.value.length > 0 ||
    ***REMOVED***SocialUrls.value.length > 0 ||
    ***REMOVED***SocialUrls.value.length > 0,
)
</script>

<style lang="scss" scoped>
.footer-socialmedia {
  padding: 28px;
  margin-top: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 32px;
  flex-direction: column;

  @media ($viewport-8) {
    flex-direction: row;
  }

  &__text {
    font-size: rem(16);
  }

  &__section {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
  }

  &__main-icon {
    margin-right: 8px;
    height: 28px;
    display: block;
  }

  &__icon {
    height: 24px;
    transition: 0.3s;
    display: block;

    &:hover {
      background-color: $gray-color-100;
    }
  }
}
</style>
