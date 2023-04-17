<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <ClientOnly>
      <Notifications position="bottom right" />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped></style>
