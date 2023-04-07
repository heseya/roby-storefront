<template>
  <div class="site">
    <div class="site__nav">
      <LayoutNav />
    </div>
    <div class="site__content">
      <LayoutBreadcrumps />
      <slot></slot>
    </div>
    <div class="site__footer">
      <BaseFooter />
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss">
.site {
  @include flex-column;
  min-height: 100vh;

  &__content {
    flex: 1;
    padding-top: 225px;
    // TODO: handle when notification is closed
    // padding-top: 185px;
    padding-bottom: 100px;

    @media ($max-viewport-12) {
      padding-top: 100px;
      // padding-top: 60px;
      padding-bottom: 74px;
    }
  }
}
</style>
