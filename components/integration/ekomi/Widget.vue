<template>
  <div>
    <div
      v-if="ekomi.customerId"
      id="widget-container"
      :class="`ekomi-widget-container ekomi-widget-${props.token}`"
    ></div>
    <slot />
  </div>
</template>

<script setup lang="ts">
const { ekomi } = usePublicRuntimeConfig()
const props = withDefaults(
  defineProps<{
    token: string
    delayTime?: number
  }>(),
  { delayTime: 0 },
)

if (ekomi.customerId)
  onMountedDocumentLoad(() => {
    useHead(() => ({
      script: [
        {
          id: `ekomi-${props.token}`,
          children: `
        function registerWidget(w, token) {
          w['_ekomiWidgetsServerUrl'] = 'https://widgets.ekomi.com'
          w['_customerId'] = ${ekomi.customerId}

          if (w['_language'] == undefined) {
            w['_language'] = new Array()
          }
          w['_language'][token] = 'auto'

          if (typeof w['_ekomiWidgetTokens'] !== 'undefined') {
            w['_ekomiWidgetTokens'][w['_ekomiWidgetTokens'].length] = token
          } else {
            w['_ekomiWidgetTokens'] = new Array(token)
          }
          if (typeof ekomiWidgetJs == 'undefined') {
            ekomiWidgetJs = true
            var scr = document.createElement('script')
            scr.src = 'https://sw-assets.ekomiapps.de/static_resources/widget.js'
            var head = document.getElementsByTagName('head')[0]
            head.appendChild(scr)
          } else {
            if (typeof ekomiWidgetMain != 'undefined') {
              ekomiWidgetMain('ajax', token)
            }
          }
          return true
        }
        `,
        },
      ],
    }))
  }, 1000)

onMounted(() => {
  if (!ekomi.customerId) return

  setTimeout(() => {
    // eslint-disable-next-line no-console
    if (!window.registerWidget) console.error(`[${props.token}] Ekomi widget not loaded!`)

    window.registerWidget?.(window, props.token)
  }, props.delayTime)
})
</script>

<style lang="scss" scoped>
.ekomi-widget-container {
}
</style>
