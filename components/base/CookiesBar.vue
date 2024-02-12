<template>
  <div v-if="isCookiesBarVisible" class="cookies-bar-wrapper">
    <div class="cookies-bar">
      <div class="cookies-bar__content">
        <span class="cookies-bar__text cookies-bar__text--bold">
          {{ t('content.title') }}
        </span>
        <p class="cookies-bar__text">
          {{ t('content.text') }}
          <NuxtLink :to="localePath(privacyPolicyUrl)">{{ t('content.privacyPolicy') }}</NuxtLink
          >.
        </p>

        <div class="cookies-bar__sections cookies-tabs">
          <div class="cookies-tabs__menu">
            <button
              v-for="section in cookiesCategories"
              :key="section"
              type="button"
              class="cookies-tabs__menu-item"
              :class="{ 'cookies-tabs__menu-item--active': section === visibleTab }"
              @click="visibleTab = section"
            >
              {{ t(`consents.${section}.title`) }}
            </button>
          </div>

          <div class="cookies-tabs__content">
            <div
              v-for="section in cookiesCategories"
              :key="section"
              class="cookies-tabs__tab"
              :class="{ 'cookies-tabs__tab--active': section === visibleTab }"
            >
              <div class="cookies-tabs__row">
                <span class="cookies-bar__text cookies-bar__text--bold">
                  {{ t(`consents.${section}.title`) }}
                </span>
                <FormSwitch
                  v-model:checked="optInForm[section]"
                  :name="`cookies-${section}`"
                  :disabled="section === 'required'"
                />
              </div>
              <p class="cookies-bar__text">{{ t(`consents.${section}.text`) }}</p>
            </div>
          </div>
        </div>

        <div class="cookies-bar__action">
          <span class="cookies-bar__text cookies-bar__text--bold">
            {{ t('content.question') }}
          </span>

          <div class="cookies-bar__btns">
            <!-- <LayoutButton class="cookies-bar__btn" variant="white" @click="rejectCookies">
              {{ t('actions.reject') }}
            </LayoutButton> -->
            <LayoutButton class="cookies-bar__btn" variant="white" @click="acceptSelectedCookies">
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
      "selected": "Zezwól na wybrane",
      "accept": "Zezwól na wszystkie"
    }
  },
  "en": {
    "content": {
      "title": "This site uses cookies",
      "text": "In order to improve the quality of services, adapt the content of the page to the needs of users, as well as to use analytical, advertising and social tools, we use cookies and derivative technologies. By clicking the \"Allow all\" button, you consent to the storage of cookies on your device, their use for analysis, personalization and marketing. You can find out more about this",
      "privacyPolicy": "here",
      "question": "Do you agree to the use of cookies other than necessary on the terms described in the privacy policy?"
    },
    "consents": {
      "required": {
        "title": "Required",
        "text": "Required cookies contribute to the usability of the site by enabling basic functions such as page navigation and access to secure areas of the website. The website cannot function properly without these cookies."
      },
      "functional": {
        "title": "Functional",
        "text": "Preference cookies allow the website to remember information that changes the appearance or behavior of the website, e.g. preferred language or region in which the user is located."
      },
      "analytics": {
        "title": "Analytics",
        "text": "Statistical cookies help website owners understand how different users behave on the website by collecting and reporting anonymous information."
      },
      "ads": {
        "title": "Advertising",
        "text": "Marketing cookies are used to track users on websites. The purpose is to display ads that are relevant and engaging to individual users, and thus more valuable to publishers and third-party advertisers."
      }
    },
    "actions": {
      "selected": "Confirm my choices",
      "accept": "Allow all"
    }
  }
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
import { useConfigStore } from '~/store/config'

const t = useLocalI18n()
const config = useConfigStore()
const localePath = useLocalePath()

const optInForm = reactive({
  required: true,
  functional: true,
  analytics: true,
  ads: true,
})

const requiredCookie = useStatefulCookie<number>(COOKIE_REQUIRED_ACCEPTED_KEY, COOKIES_CONFIG)
const functionalCookie = useStatefulCookie<number>(COOKIE_FUNCTIONAL_ACCEPTED_KEY, COOKIES_CONFIG)
const analyticsCookie = useStatefulCookie<number>(COOKIE_ANALYTICS_ACCEPTED_KEY, COOKIES_CONFIG)
const adsCookie = useStatefulCookie<number>(COOKIE_ADS_ACCEPTED_KEY, COOKIES_CONFIG)

const privacyPolicyUrl = computed(
  () => config.env.privacy_policy_url?.toString() ?? 'polityka-prywatnosci',
)

const isCookiesBarVisible = computed(() => requiredCookie.value !== 1)

const acceptAllCookies = () => setCookies([true, true, true, true])
const acceptSelectedCookies = () =>
  setCookies([true, optInForm.functional, optInForm.analytics, optInForm.ads])

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

// Tabs
const cookiesCategories = ['required', 'functional', 'analytics', 'ads'] as const
const visibleTab = ref('required')
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
  padding: 24px 12px 280px;
  overflow: auto;
  --text-font-family: Arial, Helvetica, sans-serif;
  font-family: Arial, Helvetica, sans-serif;

  @media ($viewport-8) {
    height: auto;
    padding: 32px 16px;
  }

  &__content {
    max-width: 1080px;
    margin: 0 auto;
  }

  &__text {
    display: block;
    font-size: rem(13);
    line-height: rem(20);
    margin-bottom: 14px;

    &--bold {
      font-weight: bold;
      font-size: rem(15);
      line-height: rem(20);
    }
  }

  &__sections {
    margin: 32px 0 40px;
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

    * {
      font-weight: 600;
    }

    @media ($viewport-5) {
      gap: 16px;
      grid-template-columns: 1fr 1fr;
    }
  }
}

.cookies-tabs {
  display: flex;
  border: solid 1px $gray-color-300;
  border-radius: 4px;
  padding: 8px;
  gap: 16px;

  &__menu {
    width: 100%;
    max-width: 200px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    position: relative;

    @media ($max-viewport-8) {
      display: none;
    }

    &::before {
      content: '';
      display: block;
      width: 1px;
      height: calc(100% + 16px);
      background-color: $gray-color-300;
      position: absolute;
      right: -8px;
      top: -8px;
    }
  }

  &__menu-item {
    padding: 8px 16px;
    background-color: $transparent;
    font-family: var(--text-font-family, $textFont);
    font-size: rem(14);
    line-height: rem(18);
    font-weight: 500;
    text-align: left;
    transition: 200ms ease-in-out;
    cursor: pointer;
    border: solid 1px $transparent;
    text-decoration: none;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: var(--primary-color);
      border-radius: 4px;
      z-index: -1;
      opacity: 0;
      transition: 0.3s;
    }

    &:hover::before {
      opacity: 0.6;
    }

    &--active::before {
      opacity: 0.2;
    }
  }

  &__content {
    width: 100%;
    padding: 4px;
    display: flex;
    flex-direction: column;
    gap: 24px;

    @media ($viewport-8) {
      padding: 8px;
    }
  }

  &__row {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  &__tab {
    display: none;

    @media ($max-viewport-8) {
      display: block;
    }

    &--active {
      display: block;
    }
  }
}
</style>
