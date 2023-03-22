import { defineRule, configure } from 'vee-validate'
import { localize } from '@vee-validate/i18n'
import { required, email } from '@vee-validate/rules'

export default defineNuxtPlugin((_nuxt) => {
  defineRule('email', email)
  defineRule('required', required)
  defineRule('password', (password: string) => password?.trim().length >= 12)

  configure({
    generateMessage: localize({
      pl: {
        messages: {
          required: 'To pole jest wymagane',
          email: 'To pole musi być poprawnym adresem email',
          password: 'Hasło musi mieć co najmniej 12 znaków',
        },
      },
    }),
  })
})
