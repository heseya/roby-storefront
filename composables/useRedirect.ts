import { useRouter } from 'vue-router'

export function useRedirect() {
  const router = useRouter()
  const localePath = useLocalePath()

  const redirectToRoute = (route: string, event: MouseEvent) => {
    event.preventDefault()
    router.push(localePath(route))
  }

  return {
    redirectToRoute,
  }
}
