import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      leaslink: (name: string, value: number, isNet: boolean, tax: number) =>
        `https://online2.leaselink.pl/client/rate-calculator?externalId=${nuxtApp.$config.public.leaslinkId}&value=${value}&isNet=${isNet}&tax=${tax}&productName=${name}`,
    },
  }
})
