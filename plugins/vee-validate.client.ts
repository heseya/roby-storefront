import { defineRule, configure } from 'vee-validate'
import { localize, setLocale } from '@vee-validate/i18n'
import { required, email, confirmed, alpha, alpha_spaces as alphaSpaces } from '@vee-validate/rules'

export default defineNuxtPlugin((nuxt) => {
  defineRule('email', email)
  defineRule('required', required)
  defineRule('password', (password: string) => password?.trim().length >= 12)
  defineRule('confirmedPassword', confirmed)
  defineRule('alpha', alpha)
  defineRule('alphaSpaces', alphaSpaces)

  configure({
    generateMessage: localize({
      pl: {
        messages: {
          required: 'To pole jest wymagane',
          email: 'To pole musi być poprawnym adresem email',
          password: 'Hasło musi mieć co najmniej 12 znaków',
          confirmedPassword: 'Hasła nie są takie same.',
          alpha: 'To pole może składać się tylko z liter.',
          alphaSpaces: 'To pole może składać się tylko z liter i spacji.',
        },
      },
      en: {
        messages: {
          required: 'This field is required',
          email: 'This field must be a valid email',
          password: 'Password must be at least 12 characters long',
          confirmedPassword: 'Passwords do not match.',
          alpha: 'This field may only contain alphabetic characters',
          alphaSpaces: 'This field may only contain alphabetic characters and spaces',
        },
      },
    }),
  })

  setLocale(nuxt.vueApp.$nuxt.$i18n.locale.value)

  nuxt.hook('i18n:localeSwitched', ({ newLocale }) => {
    setLocale(newLocale)
  })
})
