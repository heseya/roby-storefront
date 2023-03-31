<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.container {
  max-width: $container-width;
  margin: 0 auto;
  padding: $container-padding;

  @media ($viewport-13) {
    padding: 0;
  }
}
</style>
