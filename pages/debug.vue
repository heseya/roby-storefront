<template>
  <div>
    <ClientOnly>
      <div class="flex">
        <div>
          <h3>Client RuntimeConfig</h3>
          <pre>{{ config }}</pre>
        </div>
        <div>
          <h3>Server RuntimeConfig</h3>
          <pre>{{ serverConfig }}</pre>
        </div>
      </div>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
/**
 * TODO: remove this file
 */
import type { RuntimeConfig } from 'nuxt/schema'

const config = useRuntimeConfig()

const { data: serverConfig } = await useFetch<RuntimeConfig>('/api/debug')
</script>

<style>
.flex {
  display: flex;
  justify-content: space-between;
  gap: 32px;

  > div {
    flex: 1;
  }
}
</style>
