export const useAuthMiddleware = (): void => {
  definePageMeta({
    middleware: 'auth',
  })
}
