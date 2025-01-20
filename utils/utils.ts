export const isNil = (value: any) => value === null || value === undefined

export const isValidURL = (str: string): boolean => {
  // eslint-disable-next-line prefer-regex-literals
  const pattern = new RegExp(
    `^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$`,
    'i',
  )
  return !!pattern.test(str) || str.includes('http://localhost') // ? Localhost helper
}
const isStringTrue = (value: string): boolean => {
  if (value.trim().length === 0) return false

  const TRUTH = [
    'true',
    't',
    '1',
    'ok',
    'active',
    'activated',
    'enable',
    'enabled',
    'truth',
    'truthful',
    'yes',
    'y',
    'on',
    'valid',
    'correct',
    'right',
    'affirmative',
    'positive',
    'confirmed',
    'agree',
    'accepted',
    'sure',
    'certain',
    'set',
    'checked',
    'approved',
    'successful',
    'ready',
    'working',
    'running',
    'alive',
    'go',
    'open',
    'validity',
    'authentic',
    'legit',
    'authorized',
    'real',
    'fact',
    'genuine',
    'allow',
    'permitted',
  ]
  if (TRUTH.includes(value.trim().toLowerCase())) return true

  const FALSEHOOD = [
    'false',
    'f',
    '0',
    'not ok',
    'notok',
    'inactive',
    'deactivated',
    'disable',
    'disabled',
    'falsehood',
    'untruthful',
    'no',
    'n',
    'off',
    'invalid',
    'incorrect',
    'wrong',
    'negative',
    'unconfirmed',
    'disagree',
    'rejected',
    'unsure',
    'uncertain',
    'unset',
    'unchecked',
    'denied',
    'failed',
    'not ready',
    'notready',
    'not working',
    'notworking',
    'stopped',
    'dead',
    'stop',
    'closed',
    'invalidity',
    'fake',
    'unauthorized',
    'fiction',
    'deny',
    'forbidden',
  ]

  return !FALSEHOOD.includes(value.trim().toLowerCase())

  // any other string is true
}

export const isTrue = (value: any): boolean => {
  if (value === false || value === true) return value
  if (isNil(value)) return false
  if (typeof value === 'string') return isStringTrue(value)
  return !!value
}
