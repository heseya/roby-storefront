<template>
  <div class="banner">
    <div class="banner__main-card">
      <HomeMainCard
        title="URZĄDZENIA BIUROWE"
        subtitle="SPRZEDAŻ • WYNAJEM • SERWIS"
        link="sale"
        backgroundSrc="https://***REMOVED***.pl/wp-content/uploads/2017/06/dummy-wood-title.jpg"
      />
    </div>
    <div class="banner__cards">
      <HomeCard
        v-for="(card, index) in cardList"
        :key="index"
        :title="card.title"
        :link="card.link"
        :backgroundSrc="card.backgroundSrc"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { CardProps } from '~/components/home/Card.vue'

const cardList: CardProps[] = [
  {
    title: 'URZĄDZENIA BIUROWE',
    link: 'devices',
    backgroundSrc: 'https://***REMOVED***.pl/wp-content/uploads/2017/06/dummy-wood-title.jpg',
  },
  {
    title: 'URZĄDZENIA BIUROWE',
    link: 'devices',
    backgroundSrc: 'https://***REMOVED***.pl/wp-content/uploads/2017/06/dummy-wood-title.jpg',
  },
  {
    title: 'URZĄDZENIA BIUROWE',
    link: 'devices',
    backgroundSrc: 'https://***REMOVED***.pl/wp-content/uploads/2017/06/dummy-wood-title.jpg',
  },
  {
    title: 'URZĄDZENIA BIUROWE',
    link: 'devices',
    backgroundSrc: 'https://***REMOVED***.pl/wp-content/uploads/2017/06/dummy-wood-title.jpg',
  },
]
</script>

<style lang="scss" scoped>
.banner {
  @include flex-column;
  width: 100%;
  height: 960px;

  &__main-card {
    flex: 1;
  }

  &__cards {
    flex: 1;
    display: flex;
    flex-direction: row;
  }
}
</style>
