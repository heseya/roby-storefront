declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void
      execute: (id: string, options: any) => Promise<string>
    }
  }
}

export const getRecaptchaToken = (publicToken: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    window.grecaptcha.ready(function () {
      window.grecaptcha
        .execute(publicToken, {
          action: 'submit',
        })
        .then((token: string) => resolve(token))
        .catch((err: Error) => reject(err))
    })
  })
}
