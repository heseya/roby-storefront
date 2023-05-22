<template>
  <div class="spacer" />
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.spacer {
  display: flex;
  justify-content: center;
  width: 100%;
  border-bottom: 2px solid $gray-color-300;

  @media ($viewport-7) {
    border-bottom: none;
    height: 100%;
    width: 2px;
    background-color: $gray-color-300;
    margin-left: 50%;
  }
}
</style>
