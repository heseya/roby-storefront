import { useRouter } from 'vue-router'

export function useRedirect() {
  const router = useRouter()

  const redirectToRoute = (route: string, event: MouseEvent) => {
    event.preventDefault()
    router.push(route)
  }

  return {
    redirectToRoute,
  }
}
