<template>
  <BaseContainer>
    {{ route.params }}
    <div class="reset-password" @submit.prevent="onSubmit">
      <LayoutBreadcrumpsProvider :breadcrumbs="[{ label: t('title'), link: '/forgot-password' }]" />
      <form class="forgot-password__form">
        <h2 class="forgot-password__header">{{ t('form.header') }}</h2>
        <span class="forgot-password__description">{{ t('form.description') }}</span>
        <FormInput
          v-model="form.values.password"
          name="email"
          :label="t('form.email')"
          rules="required|email"
        />
        <LayoutButton class="forgot-password__btn" :label="t('form.send')" html-type="submit" />
      </form>

      <NuxtLink :to="'/login'" class="forgot-password__nav">
        &lt; {{ t('form.backToLogin') }}</NuxtLink
      >
    </div></BaseContainer
  >
</template>

<script lang="ts" setup>
import { useForm } from 'vee-validate'

const t = useLocalI18n()
const heseya = useHeseya()
const formatError = useErrorMessage()
const route = useRoute()

const form = useForm({
  initialValues: {
    password: '',
    confirmPassword: '',
  },
})

const errorMessage = ref<string | null>(null)

const onSubmit = form.handleSubmit(async (values) => {
  try {
    const { appHost } = useRuntimeConfig()
  } catch (e: any) {
    errorMessage.value = formatError(e)
  }
})
</script>
