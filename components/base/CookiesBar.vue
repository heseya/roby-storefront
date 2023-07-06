<template>
  <div
    v-if="isCookiesBarVisible"
    class="cookies-bar"
    :class="{ 'cookies-bar--hidden': manuallyHidden }"
  >
    <p class="cookies-bar__text">
      Klikając „OK”, wyrażasz zgodę na przechowywanie plików cookie na Twoim urządzeniu w celu
      poprawy działania serwisu, <br />
      analizowania korzystania z witryny oraz lepszego dopasowania treści marketingowych
    </p>
    <LayoutButton class="cookies-bar__btn" type="white" @click="acceptCookies"> OK </LayoutButton>
  </div>
</template>

<script setup lang="ts">
const manuallyHidden = ref<boolean>(false)

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
  z-index: 1000;
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
