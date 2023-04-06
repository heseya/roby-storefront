<template>
  <div class="checkout-comment">
    <FormInput :label="t('comment.label')" name="comment" :placeholder="t('comment.placeholder')" />
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "comment": {
      "label": "Uwagi do zamówienia",
      "placeholder": "Uwagi do zamówienia np. Informacje o dostarczeniu przesyłki"
    }
  }
}
</i18n>

<script setup lang="ts">
const t = useLocalI18n()
</script>

<style lang="scss" scoped></style>
