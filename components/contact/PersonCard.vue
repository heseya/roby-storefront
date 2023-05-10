<template>
  <div class="person-card">
    <div class="person-card__info-container">
      <img class="person-card__avatar" src="@/assets/images/gold-partner.jpg?url" :alt="name" />
      <div class="person-card__contact">
        <div class="person-card__name-container">
          <span class="person-card__name">{{ data.name }}</span>
          <NuxtLink v-show="data.link" :to="data.link">
            <LayoutIconButton class="person-card__social" :icon="Linkedin" :icon-size="16" />
          </NuxtLink>
        </div>
        <div class="person-card__contact-data">
          <span class="person-card__email">{{ data.email }}</span>
          <span>{{ data.phone }}</span>
        </div>
      </div>
    </div>
    <span>
      Urządzenia wielofunkcyjne, urządzenia wielkoformatowe/plotery, urządzenia wysokonakładowe
    </span>
  </div>
</template>

<script lang="ts" setup>
import Linkedin from '@/assets/icons/linkedin.svg?component'
export interface PersonCardProps {
  name: string
  email: string
  phone: string
  description: string
  link?: string
  avatar?: string
}

defineProps<{ data: PersonCardProps }>()
</script>

<style lang="scss" scoped>
.person-card {
  padding: 16px;
  border: solid 1px $gray-color-300;
  border-radius: 4px;

  &__info-container {
    margin-bottom: 16px;
    @include flex-row;
    gap: 20px;
  }

  &__contact {
    flex: 1;
    @include flex-column;
    justify-content: space-between;
  }

  &__avatar {
    height: 70px;
    width: 70px;

    border-radius: 50%;
    object-fit: cover;
  }

  &__name-container {
    @include flex-row;
    gap: 16px;
    justify-content: space-between;
  }

  &__name {
    text-transform: uppercase;
    font-weight: bold;
  }

  &__social {
    height: 20px;
    width: 20px;

    border-radius: 4px;
    background-color: #0e76a8;
    color: $white-color;
  }

  &__contact-data {
    @include flex-column;
  }

  &__email {
    color: var(--primary-color);
  }
}
</style>
