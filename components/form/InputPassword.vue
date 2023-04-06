<template>
  <FormInput
    v-model="inputValue"
    name="password"
    :label="t('input.password')"
    :html-type="showPassword ? 'text' : 'password'"
    rules="password"
  >
    <span class="icon" @click="toogleShowPassword">
      <Visibility v-if="showPassword" />
      <VisibilityOff v-else />
    </span>
  </FormInput>
</template>

<i18n lang="json">
{
  "pl": {
    "input": {
      "password": "Hasło"
    }
  }
}
</i18n>

<script setup lang="ts">
import Visibility from '@/assets/icons/visibility.svg?component'
import VisibilityOff from '@/assets/icons/visibility-off.svg?component'

const t = useLocalI18n()

const props = withDefaults(
  defineProps<{
    modelValue?: string
  }>(),
  {
    modelValue: '',
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
.icon {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
}
</style>
