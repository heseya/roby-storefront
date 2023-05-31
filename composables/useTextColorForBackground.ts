import { useConfigStore } from '~/store/config'

export const useTextColorForBackground = (colorKey: string): ComputedRef<'dark' | 'light'> => {
  const config = useConfigStore()

  const parent = useParentElement()
  const configColor = computed(() => config.env[colorKey.replace('-', '_')] as string | undefined)
  const cssColor = useCssVar(`--${colorKey}`, parent)

  return computed(() => (shouldTextBeBlack(configColor.value || cssColor.value) ? 'dark' : 'light'))
}
