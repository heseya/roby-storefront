import { MaybeRef } from 'vue'
import { useConfigStore } from '~/store/config'

export const useContrastColor = (color: MaybeRef<string>): ComputedRef<'dark' | 'light'> => {
  /**
   * Returns true if the text should be black, false if it should be white for a given background hex color.
   */
  const shouldTextBeBlack = (hex: string) => {
    const [red, green, blue] = hex // Hex color e.g. #ff0000
      .replace('#', '')
      .match(/.{1,2}/g)
      ?.map((x) => parseInt(x, 16)) || [0, 0, 0]

    // Formula from https://stackoverflow.com/a/3943023
    return red * 0.299 + green * 0.587 + blue * 0.114 > 186
  }

  return computed(() => (shouldTextBeBlack(unref(color)) ? 'dark' : 'light'))
}

export const useContrastColorFromCssVar = (colorKey: string): ComputedRef<'dark' | 'light'> => {
  const config = useConfigStore()

  const parent = useParentElement()
  const configColor = computed(() => config.env[colorKey.replace('-', '_')] as string | undefined)
  const cssColor = useCssVar(`--${colorKey}`, parent)

  return useContrastColor(configColor.value || cssColor.value)
}
