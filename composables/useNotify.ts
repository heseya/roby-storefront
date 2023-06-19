export const useNotify = () => {
  const { $notify } = useNuxtApp()
  return $notify || {}
}
