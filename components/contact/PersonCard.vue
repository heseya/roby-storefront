<template>
  <div class="person-card">
    <div class="person-card__info-container">
      <div class="person-card__avatar-container">
        <img
          v-show="avatarUrl"
          class="person-card__avatar"
          :src="avatarUrl"
          :alt="person.name"
          loading="lazy"
        />
      </div>
      <div class="person-card__contact">
        <div class="person-card__name-container">
          <span class="person-card__name">{{ person.name }}</span>
          <a
            v-show="person.linkedin_url"
            :href="person.linkedin_url"
            target="_blank"
            rel="nofollow noopener"
          >
            <LayoutIconButton
              class="person-card__social"
              :icon="Linkedin"
              :icon-size="16"
              :title="t('linkedinAction')"
            />
          </a>
        </div>
        <div class="person-card__details">
          <a v-if="person.email" class="person-card__email" :href="`mailto:${person.email}`">
            {{ person.email }}
          </a>
          <span v-if="person.phone" class="person-card__phone">
            {{ $t('phonePrefix.default') }} {{ person.phone }}
          </span>
        </div>
      </div>
    </div>
    <span>{{ description }}</span>
  </div>
</template>

<i18n lang="json">
{
  "pl": {
    "linkedinAction": "Przejdź do LinkedIn"
  },
  "en": {
    "linkedinAction": "Go to LinkedIn"
  }
}
</i18n>

<script lang="ts" setup>
import Linkedin from '@/assets/icons/linkedin.svg?component'
import { ContactPerson } from '@/interfaces/contactPage'

const $t = useGlobalI18n()
const t = useLocalI18n()

const props = defineProps<{ person: ContactPerson }>()

const avatarUrl = computed(() => getImageUrl(props.person.avatar, { width: 70 }))
const description = computed(
  () => getTranslated(props.person.translations, 'description')?.description || '',
)
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

  &__details {
    display: flex;
    flex-direction: column;
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
    text-decoration: none;
  }
}
</style>
