<template>
  <div v-if="!isURL" @click="onClick">
    <slot></slot>
  </div>

  <a
    v-else-if="treatLikeExternalURL"
    :href="to.toString()"
    :rel="rel"
    :target="target"
    @click="onClick"
  >
    <slot></slot>
  </a>

  <NuxtLink v-else :to="localePath(to)" :exact="exact" @click="onClick">
    <slot></slot>
  </NuxtLink>
</template>

<script lang="ts" setup>
import { isValidURL } from '@/utils/utils'

const props = withDefaults(
  defineProps<{
    to?: string | Record<string, unknown>
    exact?: boolean
    external?: boolean
    target?: string
    rel?: string
  }>(),
  {
    to: '',
    exact: false,
    external: false,
    target: '_blank',
    rel: 'nofollow noreferrer',
  },
)

const emit = defineEmits(['click'])

const localePath = useLocalePath()

const isURL = computed(() => !!props.to)
const isExternalURL = computed(() => (typeof props.to === 'string' ? isValidURL(props.to) : false))
const treatLikeExternalURL = computed(() => isExternalURL.value || props.external)
const onClick = () => {
  emit('click')
}
</script>
