export const isNil = (value: any) => value === null || value === undefined

export const isValidURL = (str: string): boolean => {
  // eslint-disable-next-line prefer-regex-literals
  const pattern = new RegExp(
    `^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$`,
    'i',
  )
  return !!pattern.test(str) || str.includes('http://localhost') // ? Localhost helper
}
