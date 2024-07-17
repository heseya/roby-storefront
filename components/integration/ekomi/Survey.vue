<template>
  <div v-if="ekomi.customerId && ekomi.surveyFormId" id="sff_127__widget-container"></div>
</template>

<script setup lang="ts">
const { ekomi } = usePublicRuntimeConfig()
const props = defineProps<{ orderCode: string }>()

onMounted(() => {
  if (!ekomi.customerId || !ekomi.surveyFormId) return

  onMountedDocumentLoad(() => {
    useHead({
      script: [
        {
          id: 'ekomi-survey-script',
          hid: 'ekomi-survey-script',
          defer: true,
          children: `
    (function(w) {
      w['_ekomiServerUrl'] = 'https://smartforms.ekomi.com';
      w['_ekomiShopId'] = '${ekomi.customerId}';
      w['_ekomiFormId'] = '${ekomi.surveyFormId}';
      w['_ekomiTransactionId'] = '${props.orderCode}';
      w['_ekomiProductIds'] = '';
      w['_ekomiWidgetWidth'] = '1020px';
      w['_ekomiWidgetHeight'] = '1290px';
      w['_ekomiEmbedWidget'] = '0';
      w['_ekomiDisableAutoClose'] = '0';
      w['_ekomiEmail'] = '';
      var s = document.createElement('script');
      s.id = 'ekomi-survey'
      s.src = w['_ekomiServerUrl']+'/script/widget.js?v='+ new Date().getTime();
      s.async = true;
      var e = document.getElementsByTagName('script')[0];
      e.parentNode.insertBefore(s, e);
      })(window);
      `,
        },
      ],
    })
  }, 500)
})
</script>

<style lang="scss" scoped>
.ekomi-widget-container {
}
</style>
