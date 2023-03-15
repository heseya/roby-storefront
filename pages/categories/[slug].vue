<template>
  <div class="categories-page">
    <ProductListPage title="Test">
      <template #aside>
        <div class="box"></div>
      </template>
    </ProductListPage>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.box {
  background-color: red;
  height: 100px;
  width: 100%;
}
</style>
