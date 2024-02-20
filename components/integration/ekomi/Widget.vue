<template>
  <div v-if="ekomiCustomerId" :key="token" v-html="widgetHtml"></div>
</template>

<script setup lang="ts">
const { ekomiCustomerId } = usePublicRuntimeConfig()
const props = withDefaults(
  defineProps<{
    token: string
    delayTime?: number
    contentHtml?: string
  }>(),
  { delayTime: 2000, contentHtml: '' },
)

const widgetHtml = computed(
  () =>
    `
<div class="ekomi-widget-container ekomi-widget-${props.token}"></div>
<div>${props.contentHtml}</div>
`,
)

if (ekomiCustomerId)
  useHead(() => ({
    script: [
      {
        id: `ekomi-${ekomiCustomerId}`,
        hid: `ekomi-${ekomiCustomerId}`,
        children: `
        function registerWidget(w, token) {
          w['_ekomiWidgetsServerUrl'] = 'https://widgets.ekomi.com'
          w['_customerId'] = ${ekomiCustomerId}

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

onMounted(() => {
  if (!ekomiCustomerId) return

  setTimeout(() => {
    // eslint-disable-next-line no-console
    if (!window.registerWidget) console.error(`[${props.token}] Ekomi widget not loaded!`)

    const k = document.getElementsByClassName(`ekomi-widget-${props.token}`)
    for (let x = 0; x < k.length; x++) {
      window.registerWidget?.(window, props.token)
    }
  }, props.delayTime)
})
</script>

<style lang="scss">
.ekomi-widget-container + div {
  // display: none;
}
</style>
