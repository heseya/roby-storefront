export const useEdrone = () => {
  const emit = (actionType: string, data: Record<string, string | number>) => {
    if (!window?._edrone) return

    Object.entries(data).forEach(([key, value]) => {
      window._edrone[key] = value
    })
    window._edrone.action_type = actionType
    window._edrone?.init?.()
  }

  const subscribe = (data: { customer_tags: string; email: string; first_name: string }) =>
    emit('subscribe', data)

  return { emit, subscribe }
}
