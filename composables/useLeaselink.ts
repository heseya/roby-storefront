export const useLeaselink = () => {
  const { leaslinkId } = usePublicRuntimeConfig()

  const getUrl = (name: string, value: number, isNet: boolean, tax: number) =>
    `https://online2.leaselink.pl/client/rate-calculator?externalId=${leaslinkId}&value=${value}&isNet=${isNet}&tax=${tax}&productName=${name}`

  return {
    enabled: !!leaslinkId,
    getUrl,
  }
}
