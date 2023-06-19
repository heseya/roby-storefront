<template>
  <div class="banner" :style="{ backgroundImage: `url(${imageUrl})` }">
    <div class="banner__gray-filter">
      <BaseContainer class="banner__content">
        <LayoutHeader tag="h2" class="banner__title"> {{ title }} </LayoutHeader>
        <span class="banner__text">
          {{ text }}
        </span>
      </BaseContainer>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  title: string
  text: string
  imageUrl: string
}>()
</script>

<style lang="scss" scoped>
.banner {
  margin-top: 80px;
  @include background-image-basic;

  @media ($max-viewport-9) {
    margin-top: 40px;
  }

  &__gray-filter {
    background-color: $gray-filter;
  }

  &__content {
    padding: 20px $container-padding;
    color: $white-color;

    @media ($viewport-9) {
      padding: 32px $container-padding;
    }
  }

  &__title {
    text-align: left;
    margin-bottom: 16px;

    font-size: rem(22);
    @media ($viewport-9) {
      margin-bottom: 21px;
      width: 50%;
      font-size: rem(45);
    }
  }

  &__text {
    display: inline-block;
    @media ($viewport-9) {
      width: 50%;
      font-size: rem(18);
    }
  }
}
</style>
