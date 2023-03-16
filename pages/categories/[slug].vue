<template>
  <div class="categories-page">
    <ProductListPage title="Test">
      <template #aside>
        <div class="box">Subcategories</div>
      </template>
    </ProductListPage>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.box {
  background-color: $gray-color-300;
  border-radius: 8px;
  height: 100px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
