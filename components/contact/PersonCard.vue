<template>
  <div class="person-card">
    <div class="person-card__info-container">
      <div class="person-card__avatar-container">
        <img v-show="data.avatar" class="person-card__avatar" :src="data.avatar" :alt="data.name" />
      </div>
      <div class="person-card__contact">
        <div class="person-card__name-container">
          <span class="person-card__name">{{ data.name }}</span>
          <a v-show="data.link" :href="data.link" target="_blank" rel="nofollow noopener">
            <LayoutIconButton class="person-card__social" :icon="Linkedin" :icon-size="16" />
          </a>
        </div>
        <div class="person-card__contact-data">
          <span class="person-card__email">{{ data.email }}</span>
          <span>{{ data.phone }}</span>
        </div>
      </div>
    </div>
    <span>{{ data.description }}</span>
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

  &__avatar-container {
    height: 70px;
    width: 70px;
    overflow: hidden;
    border-radius: 50%;

    background-color: $gray-color-300;
  }

  &__avatar {
    width: 100%;
    height: 100%;
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
    color: var(--secondary-color);
  }
}
</style>
