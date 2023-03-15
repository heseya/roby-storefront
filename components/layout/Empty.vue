<template>
  <div class="empty">
    <span class="empty__title">
      <slot />
    </span>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.empty {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 24px;

  &__title {
    font-size: 1.6em;
    text-align: center;
    margin-top: 16px;

    @media ($viewport-10) {
      max-width: 60%;
    }
  }
}
</style>
