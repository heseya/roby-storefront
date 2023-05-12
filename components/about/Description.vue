<template>
  <div class="description">
    <div class="description__content">
      <span>
        Specjalizujemy się w dziedzinie urządzeń biurowych i wielkoformatowych. Skupiamy się na
        dostarczaniu rozwiązań, które usprawnią funkcjonowanie Twojego biznesu. Wieloletnie
        doświadczenie pozwala nam na wybór sprawdzonych rozwiązań, które w pełni dopasują się do
        Twoich indywidualnych potrzeb.
      </span>
      <div class="description__point">
        <LayoutIcon class="description__point-icon" :icon="Chevron" :size="12" />
        <span>
          Dobrze wiemy, że na działanie Twojego biznesu wpływ ma również sprawna obsługa urządzeń.
          Dlatego w całości angażujemy się w szybkie dostarczanie materiałów i usług niezbędnych do
          zaspokojenia wszelkich potrzeb w obszarze druku.
        </span>
      </div>
      <div class="description__point">
        <LayoutIcon class="description__point-icon" :icon="Chevron" :size="12" />
        <span>
          Co możemy zrobić dla Twojej firmy? Naszym głównym celem jest sprawienie, abyś mógł w pełni
          skupić się na prowadzeniu swojego biznesu, nie zaprzątając sobie głowy sprzętem biurowym i
          jego prawidłowym funkcjonowaniem.
        </span>
      </div>
    </div>
    <div class="description__image-container">
      <img class="description__image" src="@/assets/images/about.jpg" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Chevron from '@/assets/icons/chevron.svg?component'
</script>

<style lang="scss" scoped>
.description {
  @include flex-row;
  gap: 26px;

  @media ($max-viewport-9) {
    flex-direction: column;
    gap: 30px;
  }

  &__content {
    flex: 1;

    @include flex-column;
    gap: 30px;
    font-size: rem(16);
  }

  &__point {
    @include flex-row;
    gap: 14px;
  }

  &__point-icon {
    flex-shrink: 0;
    margin-top: 4px;

    color: var(--secondary-color-alt);
  }

  &__image-container {
    flex: 1;
    position: relative;
    min-height: 200px;
  }

  &__image {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
