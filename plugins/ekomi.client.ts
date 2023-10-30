export default defineNuxtPlugin(() => {
  const { ekomiCustomerId } = usePublicRuntimeConfig()

  if (!ekomiCustomerId) return

  useHead({
    script: [
      {
        hid: 'ekomi-script',
        id: 'ekomi',
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
        `,
      },
    ],
  })
})
