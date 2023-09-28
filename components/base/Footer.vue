<template>
  <footer class="footer">
    <div class="footer__content">
      <BaseFooterSection
        v-for="section in SECTIONS_COUNT"
        :key="section"
        class="footer__section"
        :title="getSectionName(section)"
        :last="section === SECTIONS_COUNT"
      >
        <NuxtLink
          v-for="page in getSectionPages(section)"
          :key="`${section}/${page.id}`"
          :to="localePath(`/${page.slug}`)"
        >
          {{ page.name }}
        </NuxtLink>
      </BaseFooterSection>

      <div class="footer__section footer__section--main">
        <img
          v-if="config.footerLogoUrl"
          class="footer__logo"
          :src="config.footerLogoUrl"
          :alt="`${config.storeName} logo`"
          loading="lazy"
        />

        <!-- <div v-if="companyName" class="footer__text footer__text--bold">
          {{ companyName }}
        </div> -->
        <div v-if="companyAddress" class="footer__text">
          <div class="footer__icon"><PinIcon /></div>
          {{ companyAddress }}
        </div>
        <div v-if="companyPhone" class="footer__text">
          <div class="footer__icon"><PhoneIcon /></div>
          {{ companyPhone }}
        </div>
        <div v-if="companyEmail" class="footer__text">
          <div class="footer__icon"><MailIcon /></div>
          <a :href="`mailto:${companyEmail}`">{{ companyEmail }}</a>
        </div>

        <div class="footer__row">
          <a
            v-if="companyFacebook"
            class="footer__social-icon"
            :href="companyFacebook"
            :aria-label="t('goToFacebook')"
            rel="nofollow noreferrer"
            target="_blank"
          >
            <FacebookIcon />
          </a>
          <a
            v-if="companyInstagram"
            class="footer__social-icon"
            :href="companyInstagram"
            :aria-label="t('goToInstagram')"
            rel="nofollow noreferrer"
            target="_blank"
          >
            <InstagramIcon />
          </a>
          <a
            v-if="companyLinkedin"
            class="footer__social-icon"
            :href="companyLinkedin"
            :aria-label="t('goToLinkedin')"
            rel="nofollow noreferrer"
            target="_blank"
          >
            <LayoutIcon :icon="LinkedinIcon" size="sm" />
          </a>
          <a
            v-if="companyYoutube"
            class="footer__social-icon"
            :href="companyYoutube"
            :aria-label="t('goToYoutube')"
            rel="nofollow noreferrer"
            target="_blank"
          >
            <LayoutIcon :icon="YoutubeIcon" size="sm" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<i18n lang="json">
{
  "pl": {
    "goToFacebook": "Przejdź do Facebooka",
    "goToInstagram": "Przejdź do Instagrama",
    "goToLinkedin": "Przejdź do Linkedin",
    "goToYoutube": "Przejdź do Youtube"
  },
  "en": {
    "goToFacebook": "Go to Facebook",
    "goToInstagram": "Go to Instagram",
    "goToLinkedin": "Go to Linkedin",
    "goToYoutube": "Go to Youtube"
  }
}
</i18n>

<script lang="ts" setup>
import { useConfigStore } from '@/store/config'

import FacebookIcon from '@/assets/icons/facebook.svg?component'
import InstagramIcon from '@/assets/icons/instagram.svg?component'
import LinkedinIcon from '@/assets/icons/linkedin.svg?component'
import YoutubeIcon from '@/assets/icons/youtube.svg?component'
import PinIcon from '@/assets/icons/pin.svg?component'
import PhoneIcon from '@/assets/icons/phone.svg?component'
import MailIcon from '@/assets/icons/mail.svg?component'

const t = useLocalI18n()
const { locale } = useI18n()
const config = useConfigStore()
const heseya = useHeseya()
const localePath = useLocalePath()

const SECTIONS_COUNT = 4

const getFromConfig = (key: string) => (config.env[key] ? String(config.env[key]) : null)

const companyFacebook = computed(() => getFromConfig('facebook_url'))
const companyInstagram = computed(() => getFromConfig('instagram_url'))
const companyLinkedin = computed(() => getFromConfig('linkedin_url'))
const companyYoutube = computed(() => getFromConfig('youtube_url'))

// const companyName = computed(() => getFromConfig('company_name'))
const companyAddress = computed(() => getFromConfig('company_address'))
const companyPhone = computed(() => getFromConfig('company_phone'))
const companyEmail = computed(() => getFromConfig('company_email'))

const { data: sections } = useAsyncData('footer-pages', async () => {
  try {
    const pages = await Promise.all([
      heseya.Pages.get({ metadata: { footer_section: '1' } }),
      heseya.Pages.get({ metadata: { footer_section: '2' } }),
      heseya.Pages.get({ metadata: { footer_section: '3' } }),
      heseya.Pages.get({ metadata: { footer_section: '4' } }),
    ])
    return pages.map((section) => section.data)
  } catch {
    // eslint-disable-next-line no-console
    console.warn('Could not fetch footer pages, skiping...')
    return []
  }
})

const getSectionPages = (section: number) => sections.value?.[section - 1] || []

const getSectionName = (section: number) =>
  String(config.env[`footer_section_name${section}_${locale.value}`] || '')
</script>

<style lang="scss" scoped>
.footer {
  width: 100%;
  background-color: $gray-color-300;
  padding: 40px 16px;

  &__content {
    max-width: $container-width;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr;

    @media ($viewport-4) {
      grid-gap: 16px;
      grid-template-columns: 1fr 1fr;
    }
    @media ($viewport-9) {
      grid-gap: 16px;
      grid-template-columns: 1fr 1fr 1fr 1fr 1.2fr;
    }
  }

  &__section {
    &--main {
      grid-row: 1/2;
      grid-column: 1/-1;
      padding-bottom: 16px;

      @media ($viewport-9) {
        grid-row: auto;
        grid-column: auto;
        padding-bottom: 0;
      }
    }
  }

  &__logo {
    width: 130px;
    height: 38px;
  }

  &__text {
    margin: 12px 0;
    font-size: rem(14);
    display: flex;

    &--bold {
      font-weight: bold;
    }

    > a {
      color: $text-color;
      text-decoration: none;
      transition: 0.3s;

      &:hover {
        color: var(--secondary-color);
      }
    }
  }

  &__icon {
    width: 24px;
    margin-right: 8px;
    display: flex;
    justify-content: center;
    align-items: center;

    > svg {
      color: $gray-color-600;
    }
  }

  &__row {
    display: flex;
    gap: 8px;
    margin-top: 4px;
    justify-content: flex-end;

    @media ($viewport-6) {
      justify-content: flex-start;
    }
  }

  &__social-icon {
    display: block;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background-color: $gray-color-600;
    transition: 0.3s;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;

    > svg {
      transform: scale(0.8);
    }

    &:hover {
      background-color: $gray-color-900;
    }
  }
}
</style>
