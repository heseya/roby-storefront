<template>
  <div class="site">
    <div class="site__nav">
      <LayoutNav />
    </div>
    <div class="site__content">
      <slot></slot>
    </div>
    <div class="site__footer">
      <BaseFooter />
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss"></style>
