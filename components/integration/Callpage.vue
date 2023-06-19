<template>
  <div class="tmp"></div>
</template>

<script setup lang="ts">
const config = usePublicRuntimeConfig()

if (config.callpageId)
  useHead({
    script: [
      {
        hid: 'callpage',
        defer: true,
        children: `var __cp = {"id":"${config.callpageId}","version":"1.1"};(function (window, document) {var cp = document.createElement('script');cp.type = 'text/javascript';cp.async = false;cp.src = "++cdn-widget.callpage.io (http://cdn-widget.callpage.io/)+build+js+callpage.js".replace(/[+]/g, '/').replace(/[=]/g, '.');var s = document.getElementsByTagName('script')[0];s.parentNode.insertBefore(cp, s);if (window.callpage) {alert('You could have only 1 CallPage code on your website!');} else {window.callpage = function (method) {if (method == '__getQueue') {return this.methods;}else if (method) {if (typeof window.callpage.execute === 'function') {return window.callpage.execute.apply(this, arguments);}else {(this.methods = this.methods || []).push({arguments: arguments});}}};window.callpage.__cp = __cp;window.callpage('api.button.autoshow');}})(window, document);`,
      },
    ],
  })
</script>

<style lang="scss" scoped>
.tmp {
}
</style>
