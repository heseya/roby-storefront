<template>
  <div class="index-page">
    <div>
      <h1 class="index-page__title">{{ t('home.title') }}</h1>
      <HomeLinkBox
        text="ZAPYTAJ O WYNAJEM"
        background-src="https://***REMOVED***.pl/wp-content/uploads/2017/06/dummy-wood-title.jpg"
        link="rent"
        link-text="Zapytaj"
      />
    </div>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "home": {
      "title": "***REMOVED***"
    }
  }
}
</i18n>

<script setup lang="ts">
const { t } = useI18n({
  useScope: 'local',
})
</script>

<style lang="scss" scoped>
.index-page {
  margin: 200px auto;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  &__title {
    display: block;
    font-weight: 600;
    font-size: 100px;
    color: var(--primary-color);
    letter-spacing: 1px;
  }
}
</style>
