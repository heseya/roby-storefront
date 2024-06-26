<template>
  <div class="team">
    <LayoutHeader class="team__title" variant="black" tag="h2">{{ title }}</LayoutHeader>
    <div class="team__person-container">
      <div v-for="(person, index) in persons" :key="index" class="team-person-card">
        <div class="team-person-card__avatar-container">
          <img
            v-show="person.avatar"
            class="team-person-card__avatar"
            :src="person.avatar"
            :alt="person.name"
            loading="lazy"
          />
        </div>
        <span class="team-person-card__name">{{ person.name }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  title: string
}>()

const { data: persons } = useAsyncData('team-persons', async () => {
  const directus = useDirectus()
  const { data } = await directus.items('Person').readByQuery({
    fields: [
      'id',
      'name',
      // @ts-ignore files are not properly typed?
      'avatar.filename_disk',
    ],
    filter: {
      part_of_team: true,
    },
  })
  return data?.map((person: any) => ({
    ...person,
    avatar: getImageUrl(person.avatar, { width: 70 }),
  }))
})
</script>

<style lang="scss" scoped>
.team {
  &__title {
    margin-bottom: 25px;
    text-align: left;
    font-size: rem(30);

    @media ($max-viewport-9) {
      font-size: rem(20);
    }
  }

  &__person-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 12px;
    row-gap: 10px;

    @media ($max-viewport-12) {
      grid-template-columns: 1fr 1fr;
    }
    @media ($max-viewport-9) {
      grid-template-columns: 1fr;
    }
  }
}

.team-person-card {
  padding: 16px 28px;
  border: solid 1px $gray-color-300;
  border-radius: 4px;

  @include flex-row;
  gap: 20px;
  align-items: center;

  &__avatar-container {
    height: 70px;
    width: 70px;
    overflow: hidden;
    border-radius: 50%;

    background-color: $gray-color-300;

    @media ($max-viewport-9) {
      height: 50px;
      width: 50px;
    }
  }

  &__avatar {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__name {
    font-weight: bold;
    font-size: rem(18);

    @media ($max-viewport-9) {
      font-size: rem(16);
    }
  }
}
</style>
