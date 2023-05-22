<template>
  <div class="banner">
    <BaseContainer class="banner__text-container">
      <LayoutHeader tag="h2" class="banner__text">
        {{ parts[0] }}
        <span class="banner__text banner__text--color"> {{ parts[1] }} </span>
        {{ parts[2] }}
      </LayoutHeader>
    </BaseContainer>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ text: string }>()

const parts = computed(() => props.text?.split('|') || [])
</script>

<style lang="scss" scoped>
.banner {
  width: 100%;
  background-color: $gray-color-900;

  &__text-container {
    padding: 36px 0;
    @include flex-row;
    justify-content: center;
  }

  &__text {
    width: 80%;
    font-size: rem(30);

    @media ($max-viewport-9) {
      font-size: rem(20);
    }

    &--color {
      color: var(--primary-color-alt);
    }
  }
}
</style>
