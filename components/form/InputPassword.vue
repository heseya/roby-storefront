<template>
  <FormInput
    v-model="inputValue"
    :name="name"
    :label="label"
    :html-type="showPassword ? 'text' : 'password'"
    :rules="rules"
  >
    <span class="input-icon" @click="toogleShowPassword">
      <Visibility v-if="showPassword" />
      <VisibilityOff v-else />
    </span>
  </FormInput>
</template>

<script setup lang="ts">
import Visibility from '@/assets/icons/visibility.svg?component'
import VisibilityOff from '@/assets/icons/visibility-off.svg?component'

const props = withDefaults(
  defineProps<{
    modelValue: string
    label: string
    name: string
    rules: string
  }>(),
  {
    modelValue: '',
    label: '',
    name: 'password',
    rules: 'password',
  },
)

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
}>()

const showPassword = ref<boolean>(false)

const toogleShowPassword = () => (showPassword.value = !showPassword.value)

const inputValue = computed({
  get(): string {
    return props.modelValue
  },
  set(value: string) {
    emit('update:modelValue', value)
  },
})
</script>

<style lang="scss" scoped>
.input-icon {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
}
</style>
