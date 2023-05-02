import { defineRule, configure } from 'vee-validate'
import { localize, setLocale } from '@vee-validate/i18n'
import { required, email, confirmed, alpha } from '@vee-validate/rules'

export default defineNuxtPlugin((_nuxt) => {
  defineRule('email', email)
  defineRule('required', required)
  defineRule('password', (password: string) => password?.trim().length >= 12)
  defineRule('confirmedPassword', confirmed)
  defineRule('alphaCharacters', alpha)

  configure({
    generateMessage: localize({
      pl: {
        messages: {
          required: 'To pole jest wymagane',
          email: 'To pole musi być poprawnym adresem email',
          password: 'Hasło musi mieć co najmniej 12 znaków',
          confirmedPassword: 'Hasła nie są takie same.',
          alphaCharacters: 'To pole może składać się tylko z liter.',
        },
      },
    }),
  })

  setLocale('pl')
})
