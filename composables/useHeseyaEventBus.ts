export const useHeseyaEventBus = () => {
  const { $ev } = useNuxtApp()
  return $ev
}
