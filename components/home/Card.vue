<template>
  <nuxt-link class="card" :to="link">
    <div
      class="card__container"
      :class="subtitle ? 'card__container--main' : ''"
      :style="{ backgroundImage: `url(${backgroundSrc})` }"
    >
      <LayoutHeader :class="subtitle ? 'card__title--main' : 'card__title--normal'"
        >{{ title }}
      </LayoutHeader>
      <LayoutHeader class="card__subtitle">{{ subtitle }}</LayoutHeader>
    </div>
  </nuxt-link>
</template>

<script lang="ts" setup>
export interface CardProps {
  title: string
  subtitle?: string
  backgroundSrc: string
  link: string
}

withDefaults(defineProps<CardProps>(), { subtitle: '' })
</script>

<style lang="scss" scoped>
.card {
  flex: 1;
  text-decoration: none;

  &__container {
    display: flex;
    align-items: flex-end;
    padding: 50px;
    height: 100%;
    @include background-image-basic;

    &--main {
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      gap: 12px;
    }
  }

  &__title {
    &--main {
      font-weight: normal;
      font-size: rem(20);
      text-align: left;
    }

    &--normal {
      width: 50%;
      text-align: left;
    }
  }

  &__subtitle {
    text-align: left;
  }
}
</style>
