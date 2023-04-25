<template>
  <div class="advantages">
    <LayoutHeader tag="h2" class="advantages__title" variant="black">
      Jakie są zalety wynajmu?
    </LayoutHeader>
    <div class="advantages__content">
      <RentAdvantagesItem v-for="item in items" :key="item.title" :item="item" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { AdvantageProps } from '~/components/rent/advantages/Item.vue'

import PrinterIcon from '@/assets/icons/printer.svg?component'
import PaymentIcon from '@/assets/icons/payments.svg?component'
import DesignIcon from '@/assets/icons/design.svg?component'
import SupportIcon from '@/assets/icons/support.svg?component'

const items: AdvantageProps[] = [
  {
    title: 'Nowoczesny sprzęt',
    text: 'Nowoczesne urządzenia, które wspierają wykonywanie codziennych zadań.',
    icon: PrinterIcon,
  },
  {
    title: 'Elastyczne finansowanie',
    text: 'Niskie opłaty miesięczne oraz pakiety dopasowane do indywidualnych potrzeb.',
    icon: PaymentIcon,
  },
  {
    title: 'Płynne działanie',
    text: 'Pełna dostępność materiałów eksploatacyjnych i sprawnie działający serwis.',
    icon: DesignIcon,
  },
  {
    title: 'Wsparcie',
    text: 'Wsparcie sprzętowe, techniczne i doradcze przez cały okres wynajmu drukarki.',
    icon: SupportIcon,
  },
]
</script>

<style lang="scss" scoped>
.advantages {
  &__title {
    font-size: rem(30);
    text-align: left;
    margin-bottom: 30px;

    @media ($max-viewport-9) {
      margin-bottom: 15px;
      font-size: rem(22);
    }
  }

  &__content {
    display: grid;
    column-gap: 26px;
    row-gap: 30px;

    grid-template-columns: 1fr 1fr;

    @media ($max-viewport-9) {
      grid-template-columns: 1fr;
      row-gap: 10px;
    }
  }
}
</style>
