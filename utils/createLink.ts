const { appHost } = usePublicRuntimeConfig()

export const createLink = (base: string, url: string) => new URL(url, base).href

export const createSublink = (url: string) => createLink(appHost, url)
