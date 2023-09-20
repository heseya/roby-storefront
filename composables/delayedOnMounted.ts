export const delayedOnMounted = (cb: Function, time = 1000) => {
  onMounted(() => setTimeout(cb, time))
}
