<template>
  <footer class="footer">
    <div class="footer__content">
      <BaseFooterSection class="footer__section" title="Sprzedaż">
        <NuxtLink to="/"> Lorem ipsum </NuxtLink>
        <NuxtLink to="/"> Lorem ipsum </NuxtLink>
        <NuxtLink to="/"> Lorem ipsum </NuxtLink>
        <NuxtLink to="/"> Lorem ipsum </NuxtLink>
      </BaseFooterSection>
      <BaseFooterSection class="footer__section" title="Serwis">
        <NuxtLink to="/"> Lorem ipsum </NuxtLink>
        <NuxtLink to="/"> Lorem ipsum </NuxtLink>
        <NuxtLink to="/"> Lorem ipsum </NuxtLink>
        <NuxtLink to="/"> Lorem ipsum </NuxtLink>
      </BaseFooterSection>
      <BaseFooterSection class="footer__section" title="Finansowanie">
        <NuxtLink to="/"> Lorem ipsum </NuxtLink>
        <NuxtLink to="/"> Lorem ipsum </NuxtLink>
        <NuxtLink to="/"> Lorem ipsum </NuxtLink>
        <NuxtLink to="/"> Lorem ipsum </NuxtLink>
      </BaseFooterSection>
      <BaseFooterSection class="footer__section" title="Informacje" last>
        <NuxtLink to="/"> Lorem ipsum </NuxtLink>
        <NuxtLink to="/"> Lorem ipsum </NuxtLink>
        <NuxtLink to="/"> Lorem ipsum </NuxtLink>
        <NuxtLink to="/"> Lorem ipsum </NuxtLink>
      </BaseFooterSection>

      <div class="footer__section footer__section--main">
        <div class="footer__logo">LOGO</div>

        <div class="footer__text">
          <div class="footer__icon"><PinIcon /></div>
          ul. Zakopiańska 190, 60-467 Poznań
        </div>
        <div class="footer__text">
          <div class="footer__icon"><PhoneIcon /></div>
          tel. +48 61 842-53-00
        </div>
        <div class="footer__text">
          <div class="footer__icon"><MailIcon /></div>
          biuro@***REMOVED***.pl
        </div>

        <div class="footer__row">
          <a class="footer__social-icon" href="https://facebook.com" rel="nofollow noreferrer">
            <FacebookIcon />
          </a>
          <a class="footer__social-icon" href="https://instagram.com" rel="nofollow noreferrer">
            <InstagramIcon />
          </a>
          <a class="footer__social-icon" href="https://linkedin.com" rel="nofollow noreferrer">
            <LinkedinIcon />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import FacebookIcon from '@/assets/icons/facebook.svg?component'
import InstagramIcon from '@/assets/icons/instagram.svg?component'
import LinkedinIcon from '@/assets/icons/linkedin.svg?component'
import PinIcon from '@/assets/icons/pin.svg?component'
import PhoneIcon from '@/assets/icons/phone.svg?component'
import MailIcon from '@/assets/icons/mail.svg?component'
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
    // TODO: replace with logo
    width: 130px;
    height: 38px;
    background-color: $gray-color-600;
    border-radius: 8px;
    margin-bottom: 20px;
    color: #fff;
    font-weight: 600;
    font-size: rem(18);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__text {
    margin: 12px 0;
    font-size: rem(14);
    display: flex;
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
