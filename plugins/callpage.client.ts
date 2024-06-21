import { onDocumentLoad } from '#imports'

export default defineNuxtPlugin(() => {
  const { callpageId } = usePublicRuntimeConfig()

  if (!callpageId) return

  onDocumentLoad(() => {
    useHead({
      script: [
        {
          hid: 'callpage-polyfill',
          defer: true,
          children: `(function () {var script = document.createElement('script');script.src = 'https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.26.0/polyfill.min.js';script.async = false;document.head.appendChild(script);}())`,
        },
        {
          hid: 'callpage',
          defer: true,
          children: `var __cp = {"id":"${callpageId}","version":"1.1"};(function (window, document) {var cp = document.createElement('script');cp.type = 'text/javascript';cp.async = false;cp.src = "++cdn-widget.callpage.io+build+js+callpage.js".replace(/[+]/g, '/').replace(/[=]/g, '.');var s = document.getElementsByTagName('script')[0];s.parentNode.insertBefore(cp, s);if (window.callpage) {alert('You could have only 1 CallPage code on your website!');} else {window.callpage = function (method) {if (method == '__getQueue') {return this.methods;}else if (method) {if (typeof window.callpage.execute === 'function') {return window.callpage.execute.apply(this, arguments);}else {(this.methods = this.methods || []).push({arguments: arguments});}}};window.callpage.__cp = __cp;window.callpage('api.button.autoshow');}})(window, document);`,
        },
      ],
    })
  }, 2000)
})
