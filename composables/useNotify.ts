export const useNotify = () => {
  const notify = useNotification()
  return notify || {}
}
