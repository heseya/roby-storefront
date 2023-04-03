<template>
  <div class="layout-container">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.layout-container {
  background-color: #00000080;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
