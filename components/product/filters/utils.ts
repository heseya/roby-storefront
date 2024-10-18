import type { AttributeOption } from '@heseya/store-core'

export const makeOptionsUniq = (options: AttributeOption[]): AttributeOption[] => {
  const uniqValues: string[] = []

  return options.filter((option) => {
    const optionValue = getValueFromOption(option)

    if (uniqValues.includes(optionValue)) return false

    uniqValues.push(optionValue)
    return true
  })
}

export const groupOptionsByValue = (options: AttributeOption[]): Record<string, string[]> =>
  options.reduce(
    (acc, option) => {
      const value = getValueFromOption(option)

      if (!acc[value]) {
        acc[value] = []
      }

      acc[value].push(option.id)
      return acc
    },
    {} as Record<string, string[]>,
  )

const getValueFromOption = (option: AttributeOption): string => {
  if (option.value_number !== null) return option.value_number.toString()
  if (option.value_date !== null) return option.value_date.toString()
  return option.name.toLowerCase()
}

export const fixAttributeOptionName = (option: AttributeOption) => {
  // for some reason it's sometimes number
  if (typeof option.name !== 'string') return option

  return {
    ...option,
    name: option.name.trim(),
  }
}

export const removeStringsFromArray = (source: string[], toRemove: string[]): string[] =>
  source.filter((item) => !toRemove.includes(item))

export const mergeArraysWithoutDuplicates = (array1: string[], array2: string[]): string[] => [
  ...new Set([...array1, ...array2]),
]
