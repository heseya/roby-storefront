<template>
  <div
    v-if="ekomiCustomerId && ekomiToken"
    id="widget-container"
    :class="`ekomi-widget-container ekomi-widget-${ekomiToken}`"
  ></div>
</template>

<script setup lang="ts">
const { ekomiCustomerId, ekomiToken } = usePublicRuntimeConfig()

if (ekomiCustomerId && ekomiToken)
  useHead({
    script: [
      {
        hid: 'ekomi-widget-sprzedawcy',
        defer: true,
        children: `
        function registerWidget (w, token) {
          w['_ekomiWidgetsServerUrl'] = 'https://widgets.ekomi.com';
          w['_customerId'] = ${ekomiCustomerId};
          if (w['_language'] == undefined) {
              w['_language'] = new Array();
          }
          w['_language'][token] = 'auto';
          if(typeof(w['_ekomiWidgetTokens']) !== 'undefined'){
              w['_ekomiWidgetTokens'][w['_ekomiWidgetTokens'].length] = token;
          } else {
              w['_ekomiWidgetTokens'] = new Array(token);
          }
          if(typeof(ekomiWidgetJs) == 'undefined') {
              ekomiWidgetJs = true;
              var scr = document.createElement('script');scr.src = 'https://sw-assets.ekomiapps.de/static_resources/widget.js';
              var head = document.getElementsByTagName('head')[0];head.appendChild(scr);
          } else {if (typeof ekomiWidgetMain != 'undefined') {ekomiWidgetMain('ajax', token);}}
          return true;
      }
      (function (w) {
          var token = '${ekomiToken}';
          var k = document.getElementsByClassName("ekomi-widget-" + token);
          for(var x=0;x<k.length;x++){ registerWidget(w,token); }
      })(window);
        `,
      },
    ],
  })
</script>

<style lang="scss" scoped>
.ekomi-widget-container {
}
</style>
