import { defineRule, configure } from 'vee-validate'
import { localize, setLocale } from '@vee-validate/i18n'
import {
  required,
  email,
  confirmed,
  alpha,
  alpha_spaces as alphaSpaces,
  max,
} from '@vee-validate/rules'

export default defineNuxtPlugin((nuxt) => {
  defineRule('email', email)
  defineRule('required', required)
  defineRule('password', (password: string) => password?.trim().length >= 12)
  defineRule('confirmedPassword', confirmed)
  defineRule('alpha', alpha)
  defineRule('alphaSpaces', alphaSpaces)
  defineRule('beforeNow', (date: string) => new Date(date) < new Date())
  defineRule('phone', (value: string) => {
    return /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/g.test(value)
  })
  defineRule('vatNumber', (value: string) => {
    return /^((AT)?U[0-9]{8}|(BE)?0[0-9]{9}|(BG)?[0-9]{9,10}|(CY)?[0-9]{8}L|(CZ)?[0-9]{8,10}|(DE)?[0-9]{9}|(DK)?[0-9]{8}|(EE)?[0-9]{9}|(EL|GR)?[0-9]{9}|(ES)?[0-9A-Z][0-9]{7}[0-9A-Z]|(FI)?[0-9]{8}|(FR)?[0-9A-Z]{2}[0-9]{9}|(GB)?([0-9]{9}([0-9]{3})?|[A-Z]{2}[0-9]{3})|(HU)?[0-9]{8}|(IE)?[0-9]S[0-9]{5}L|(IT)?[0-9]{11}|(LT)?([0-9]{9}|[0-9]{12})|(LU)?[0-9]{8}|(LV)?[0-9]{11}|(MT)?[0-9]{8}|(NL)?[0-9]{9}B[0-9]{2}|(PL)?[0-9]{10}|(PT)?[0-9]{9}|(RO)?[0-9]{2,10}|(SE)?[0-9]{12}|(SI)?[0-9]{8}|(SK)?[0-9]{10})$/gm.test(
      value,
    )
  })
  defineRule('plZip', (value: string) => {
    return /^[0-9]{2}-[0-9]{3}$/gm.test(value)
  })
  defineRule('max', max)

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
          beforeNow: 'Data nie może być z przyszłości.',
          phone: 'Numer telefonu jest niepoprawny',
          vatNumber: 'Podany numer NIP jest nieprawidłowy',
          plZip: 'Kod pocztowy jest nieprawidłowy',
          max: 'Przekroczono maksymalną ilość znaków. Dopuszczalna liczba znaków to 0:{max}',
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
          beforeNow: 'Date cannot be in the future.',
          phone: 'The phone number is incorrect',
          vatNumber: 'Provided VAT Number is incorrect',
          plZip: 'Zip code is incorrect',
          max: 'The maximum number of characters has been exceeded. The allowed number of characters is 0:{max}',
        },
      },
    }),
  })

  setLocale(nuxt.vueApp.$nuxt.$i18n.locale.value)

  nuxt.hook('i18n:localeSwitched', ({ newLocale }) => {
    setLocale(newLocale)
  })
})
