<template>
  <div></div>
</template>

<script setup lang="ts">
import type { BreadcrumbLink, BreadcrumbsDto } from '~/interfaces/Breadcrumbs'

const props = withDefaults(
  defineProps<{
    breadcrumbs: BreadcrumbsDto
  }>(),
  {
    breadcrumbs: () => [],
  },
)

const { t } = useI18n({ useScope: 'global' })
const state = useBreadcrumbsState()

const HOME_LINK = { link: '/', label: t('breadcrumbs.home') }

const setBreadcrumbs = (links?: BreadcrumbsDto) => {
  const filtered = (links?.filter(Boolean) || []) as BreadcrumbLink[]
  if (filtered.length) state.value = [HOME_LINK, ...filtered] as BreadcrumbLink[]
  else state.value = []
}

watch(
  () => props.breadcrumbs,
  (breadcrumbs) => setBreadcrumbs(breadcrumbs),
  { deep: true, immediate: true },
)
</script>
