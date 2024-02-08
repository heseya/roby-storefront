<template>
  <div class="layout-nav-top-bar">
    <LazyLayoutNavCustomRedirect />
    <LazyLayoutNavChannelSwitch />
    <LazyLayoutNavLanguageSwitch />
  </div>
</template>

<style lang="scss" scoped>
.layout-nav-top-bar {
  height: 50px;
  display: flex;
  gap: 16px;
  padding: 0 16px;
  justify-content: flex-end;
  border-bottom: 1px solid $gray-color-300;
}
</style>
