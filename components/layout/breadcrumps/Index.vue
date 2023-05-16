<template>
  <BaseContainer class="breadcrumps">
    <NuxtLink
      v-for="{ link, label } in breadcrumbs"
      :key="link"
      :to="link"
      class="breadcrumps__item"
    >
      {{ label }}
    </NuxtLink>
  </BaseContainer>
</template>

<script setup lang="ts">
const breadcrumbs = useBreadcrumbsState()
</script>

<style lang="scss" scoped>
.breadcrumps {
  width: 100%;
  display: flex;
  align-items: center;
  padding-top: 22px;
  padding-bottom: 22px;

  &:empty {
    display: none;
  }

  &__item {
    text-decoration: none;
    color: $gray-color-600;
    display: flex;
    align-items: center;
    font-size: rem(12);
    line-height: 1em;
    transition: 0.3s;

    &:last-child {
      color: $text-color;
    }

    &:not(:last-child) {
      margin-right: 1em;

      &:hover {
        color: var(--secondary-color);
      }

      &:after {
        content: '';
        display: block;
        margin-left: 1em;
        width: 0.7em;
        height: 0.7em;
        background-image: url('@/assets/icons/chevron.svg');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        opacity: 0.4;
      }
    }
  }
}
</style>
