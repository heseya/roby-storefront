<template>
  <div v-if="isCookiesBarVisible" class="cookies-bar-wrapper">
    <div class="cookies-bar">
      <div class="cookies-bar__content">
        <span class="cookies-bar__text cookies-bar__text--bold">
          {{ t('content.title') }}
        </span>
        <p class="cookies-bar__text">
          {{ t('content.text') }}
          <NuxtLink to="/polityka-prywatnosci">{{ t('content.privacyPolicy') }}</NuxtLink
          >.
        </p>

        <div class="cookies-bar__checkboxes">
          <FormCheckbox name="cookies-required" model-value disabled>
            {{ t('consents.required.title') }}
          </FormCheckbox>
          <FormCheckbox v-model="optInForm.functional" name="cookies-functional">
            {{ t('consents.functional.title') }}
          </FormCheckbox>
          <FormCheckbox v-model="optInForm.ads" name="cookies-ads">
            {{ t('consents.ads.title') }}
          </FormCheckbox>
          <FormCheckbox v-model="optInForm.analytics" name="cookies-analytics">
            {{ t('consents.analytics.title') }}
          </FormCheckbox>
        </div>

        <div class="cookies-bar__action">
          <span class="cookies-bar__text cookies-bar__text--bold">
            {{ t('content.question') }}
          </span>

          <div class="cookies-bar__btns">
            <LayoutButton class="cookies-bar__btn" variant="white" @click="rejectCookies">
              {{ t('actions.reject') }}
            </LayoutButton>
            <LayoutButton class="cookies-bar__btn" variant="primary" @click="acceptSelectedCookies">
              {{ t('actions.selected') }}
            </LayoutButton>
            <LayoutButton class="cookies-bar__btn" variant="primary" @click="acceptAllCookies">
              {{ t('actions.accept') }}
            </LayoutButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "content": {
      "title": "Niniejsza strona korzysta z plików cookie",
      "text": "W celu poprawienia jakości usług, dostosowania zawartości strony do potrzeb użytkowników, a także korzystania z narzędzi analitycznych, reklamowych i społecznościowych, korzystamy z plików cookie i pochodnych technologii. Klikając przycisk „Zezwól na wszystkie” wyrażasz zgodę na przechowywanie plików cookie w Twoim urządzeniu, ich wykorzystywanie w celu analizy, personalizacji i marketingu. Więcej na ten temat dowiesz się",
      "privacyPolicy": "tutaj",
      "question": "Czy wyrażasz zgodę na korzystanie z innych niż niezbędne plików cookies na zasadach opisanych w polityce prywatności?"
    },
    "consents": {
      "required": {
        "title": "Niezbędne",
        "text": "Niezbędne pliki cookie przyczyniają się do użyteczności strony poprzez umożliwianie podstawowych funkcji takich jak nawigacja na stronie i dostęp do bezpiecznych obszarów strony internetowej. Strona internetowa nie może funkcjonować poprawnie bez tych ciasteczek."
      },
      "functional": {
        "title": "Funkcjonalne",
        "text": "Pliki cookie dotyczące preferencji umożliwiają stronie zapamiętanie informacji, które zmieniają wygląd lub funkcjonowanie strony, np. preferowany język lub region, w którym znajduje się użytkownik."
      },
      "analytics": {
        "title": "Statystyczne",
        "text": "Statystyczne pliki cookie pomagają właścicielem stron internetowych zrozumieć, w jaki sposób różni użytkownicy zachowują się na stronie, gromadząc i zgłaszając anonimowe informacje."
      },
      "ads": {
        "title": "Reklamowe",
        "text": "Marketingowe pliki cookie stosowane są w celu śledzenia użytkowników na stronach internetowych. Celem jest wyświetlanie reklam, które są istotne i interesujące dla poszczególnych użytkowników i tym samym bardziej cenne dla wydawców i reklamodawców strony trzeciej."
      }
    },
    "actions": {
      "reject": "Odmowa wszystkich",
      "selected": "Potwierdzenie moich wyborów",
      "accept": "Zezwól na wszystkie"
    }
  },
  "en": {}
}
</i18n>

<script setup lang="ts">
import {
  COOKIE_REQUIRED_ACCEPTED_KEY,
  COOKIE_ANALYTICS_ACCEPTED_KEY,
  COOKIE_ADS_ACCEPTED_KEY,
  COOKIE_FUNCTIONAL_ACCEPTED_KEY,
  COOKIES_CONFIG,
} from '@/consts/cookiesKeys'

const t = useLocalI18n()

// const cookiesCategories = ['required', 'functional', 'analytics', 'ads'] as const

const optInForm = reactive({
  functional: true,
  analytics: true,
  ads: true,
})

const requiredCookie = useStatefulCookie<number>(COOKIE_REQUIRED_ACCEPTED_KEY, COOKIES_CONFIG)
const functionalCookie = useStatefulCookie<number>(COOKIE_FUNCTIONAL_ACCEPTED_KEY, COOKIES_CONFIG)
const analyticsCookie = useStatefulCookie<number>(COOKIE_ANALYTICS_ACCEPTED_KEY, COOKIES_CONFIG)
const adsCookie = useStatefulCookie<number>(COOKIE_ADS_ACCEPTED_KEY, COOKIES_CONFIG)

// TODO: remove debug
const DEBUG = true

const isCookiesBarVisible = computed(() => DEBUG || requiredCookie.value !== 1)

const acceptAllCookies = () => setCookies([true, true, true, true])
const acceptSelectedCookies = () =>
  setCookies([true, optInForm.functional, optInForm.analytics, optInForm.ads])
const rejectCookies = () => setCookies([true, false, false, false])

const setCookies = ([required, functional, analytics, ads]: [
  boolean,
  boolean,
  boolean,
  boolean,
]) => {
  requiredCookie.value = required ? 1 : 0
  functionalCookie.value = functional ? 1 : 0
  analyticsCookie.value = analytics ? 1 : 0
  adsCookie.value = ads ? 1 : 0
}
</script>

<style lang="scss" scoped>
.cookies-bar-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: -1;
  z-index: 9999;
}

.cookies-bar {
  height: 100vh;
  width: 100vw;
  background-color: #fff;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 10000;
  padding: 32px 16px 250px;
  overflow: auto;

  @media ($viewport-8) {
    height: auto;
    padding-bottom: 32px;
  }

  &__content {
    max-width: 1080px;
    margin: 0 auto;
  }

  &__checkboxes {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
  }

  &__text {
    display: block;
    font-size: rem(13);
    margin-bottom: 14px;

    &--bold {
      font-weight: bold;
      font-size: rem(15);
    }
  }

  &__action {
    @media ($max-viewport-8) {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      padding: 16px;
      background-color: #fff;
      border-top: solid 1px $gray-color-300;
    }
  }

  &__btns {
    display: grid;
    grid-template-columns: 1fr;
    gap: 8px;
    margin-top: 20px;

    @media ($viewport-5) {
      gap: 16px;
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
}
</style>
