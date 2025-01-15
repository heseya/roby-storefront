import { onDocumentLoad } from '#imports'

export default defineNuxtPlugin(() => {
  const { kodabotChatbotToken } = usePublicRuntimeConfig()

  if (!kodabotChatbotToken) return

  onDocumentLoad(() => {
    useHead({
      script: [
        {
          hid: 'kodabot',
          defer: true,
          children: `(function () {var kb = document.createElement('script'); kb.type = 'text/javascript'; kb.async = true; kb.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'web.kodabots.com/web.sdk.js'; var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(kb, s); })();`,
        },
        {
          hid: 'kodabot-init',
          defer: true,
          children: `window.initKBWebSDK = function(SDK) {	SDK.initKBChatbot({"token":"${kodabotChatbotToken}"});}`,
        },
      ],
    })
  }, 2000)
})
