<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <div ref="containerRef" class="hs-html-content" v-html="modifiedContent"></div>
</template>

<script setup lang="ts">
import { parse } from 'node-html-parser'

const props = defineProps<{
  content?: string
}>()

const containerRef = ref<HTMLElement>()

const modifiedContent = ref<string>(props.content || '')

const createElement = (content: string) => {
  if (process.server) return parse(content)

  const root = document.createElement('div') as HTMLElement
  root.innerHTML = content
  return root
}

watch(
  () => props.content,
  () => {
    const root = createElement(props.content || '')
    ;[...root.getElementsByTagName('img')].forEach((img) => {
      img.setAttribute('loading', 'lazy')
      const imgSrc = img.getAttribute('src')
      if (!imgSrc) return

      const imgUrl = new URL(imgSrc)

      if (!imgUrl.searchParams.get('w')) imgUrl.searchParams.set('w', '800')
      if (!imgUrl.searchParams.get('format')) imgUrl.searchParams.set('format', 'auto')

      img.setAttribute('src', imgUrl.toString())
    })

    modifiedContent.value = root.innerHTML
  },
  { immediate: true },
)
</script>

<style lang="scss">
@import '@/assets/scss/components/html-content.scss';
</style>
