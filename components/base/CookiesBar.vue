<template>
  <div
    v-if="isCookiesBarVisible"
    class="cookies-bar"
    :class="{ 'cookies-bar--hidden': manuallyHidden }"
  >
    <p class="cookies-bar__text">
      {{ t('content_line1') }} <br />
      {{ t('content_line2') }}
    </p>
    <LayoutButton class="cookies-bar__btn" type="white" @click="acceptCookies">
      {{ t('accept') }}
    </LayoutButton>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "content_line1": "Klikając „OK”, wyrażasz zgodę na przechowywanie plików cookie na Twoim urządzeniu w celu poprawy działania serwisu,",
    "content_line2": "analizowania korzystania z witryny oraz lepszego dopasowania treści marketingowych",
    "accept": "OK"
  },
  "en": {
    "content_line1": "By clicking „OK”, you agree to store cookies on your device to improve the performance of the website,",
    "content_line2": "analyze site usage and better tailor marketing content",
    "accept": "OK"
  }
}
</i18n>

<script setup lang="ts">
const manuallyHidden = ref<boolean>(false)
const t = useLocalI18n()

const cookie = useCookie<number>('COOKIE_ACCEPTED_KEY', {
  maxAge: 365 * 24 * 60 * 60,
  path: '/',
})

const isCookiesBarVisible = computed(() => cookie.value !== 1)

const acceptCookies = () => {
  manuallyHidden.value = true
  cookie.value = 1
}
</script>

<style lang="scss" scoped>
.cookies-bar {
  width: 90vw;
  max-width: $container-width;
  position: fixed;
  z-index: 2147483647;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  padding: 16px 22px;
  background-color: #000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  transition: 0.3s;

  @media ($viewport-5) {
    flex-direction: row;
  }

  &--hidden {
    transform: translate(-50%, 200%);
  }

  &__text {
    color: #fff;
    font-size: rem(13);
    line-height: rem(16);

    @media ($viewport-5) {
      margin-right: 12px;
    }
  }

  &__btn {
    margin-left: auto;

    @media ($max-viewport-5) {
      margin-top: 12px;
    }
  }
}
</style>
