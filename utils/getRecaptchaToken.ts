declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void
      execute: (id: string, options: any) => Promise<string>
    }
  }
}

export const getRecaptchaToken = (publicToken: string, action: string): Promise<string> => {
  if (!window.grecaptcha) return Promise.reject(new Error('Recaptcha not loaded'))
  if (!publicToken) return Promise.reject(new Error('Recaptcha public token not provided'))

  return new Promise((resolve, reject) => {
    window.grecaptcha.ready(function () {
      window.grecaptcha
        .execute(publicToken, {
          action,
        })
        .then((token: string) => resolve(token))
        .catch((err: Error) => reject(err))
    })
  })
}
