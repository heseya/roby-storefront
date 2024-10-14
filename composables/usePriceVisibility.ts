import { computed } from 'vue'
import type { ProductListed } from '@heseya/store-core'
import { ASK_FOR_PRICE_KEY } from '~/consts/metadataKeys'
import { useConfigStore } from '@/store/config'
import { useChannelsStore } from '~/store/channels'

export function usePriceVisibility(
  product: Ref<ProductListed>,
  productPrice: ComputedRef<number | string>,
) {
  const isLogged = useIsLogged()
  const { isModeB2B } = useSiteMode()
  const channels = useChannelsStore()
  const config = useConfigStore()

  /**
   * Business logic
   * Written down in this way, it is easier to understand
   */
  const getViewModel = () => {
    // if product has ASK_FOR_PRICE_KEY then everything else must be hide
    const shouldUserAskForPrice = !!product.value?.metadata?.[ASK_FOR_PRICE_KEY]
    const shouldUserNeedLogInToBuy = isModeB2B.value ? !isLogged.value : false
    const productIsAvailableAtAll = !!product.value?.available

    const isProductAvailableForRegion = !(
      +productPrice.value === 0 && config.unavailableIfPriceZero
    )

    const vm = {
      showAskForPrice: shouldUserAskForPrice,
      showLogInToBuy: shouldUserNeedLogInToBuy,
      showPrice: productIsAvailableAtAll && isProductAvailableForRegion,
      showSchemas: !!product.value?.has_schemas,
      showAddToCartOnList: config.env.show_add_to_cart_on_lists === '1',
      showOmnibus: isModeB2B.value ? false : useShowOmnibus(product.value).value,
      isProductUnavailable: !productIsAvailableAtAll || !isProductAvailableForRegion,
      showProductUnavailableAtAll: !productIsAvailableAtAll,
      showProductUnavailableForRegion: productIsAvailableAtAll && !isProductAvailableForRegion,
    }

    if (shouldUserAskForPrice) {
      vm.showLogInToBuy = false
    }

    if (shouldUserAskForPrice || shouldUserNeedLogInToBuy) {
      vm.showPrice = false
    }

    if (!vm.showPrice) {
      vm.showSchemas = false
      vm.showAddToCartOnList = false
      vm.showOmnibus = false
    }

    /**
     * If the user has only one sales channel, he does not know what the regions are
     * Organizations have only one sales channel
     */
    if (
      vm.showProductUnavailableForRegion &&
      ((isModeB2B.value && isLogged.value) || channels.channels.length === 1)
    ) {
      vm.showProductUnavailableAtAll = true
      vm.showProductUnavailableForRegion = false
    }

    return vm
  }

  const viewModel = computed(() => getViewModel())

  const showAskForPrice = computed(() => viewModel.value.showAskForPrice)
  const showLogInToBuy = computed(() => viewModel.value.showLogInToBuy)
  const showPrice = computed(() => viewModel.value.showPrice)
  const showSchemas = computed(() => viewModel.value.showSchemas)
  const showAddToCartOnList = computed(() => viewModel.value.showAddToCartOnList)
  const showOmnibus = computed(() => viewModel.value.showOmnibus)
  const isProductUnavailable = computed(() => viewModel.value.isProductUnavailable)
  const showProductUnavailableAtAll = computed(() => viewModel.value.showProductUnavailableAtAll)
  const showProductUnavailableForRegion = computed(
    () => viewModel.value.showProductUnavailableForRegion,
  )

  return {
    showAskForPrice,
    showLogInToBuy,
    showPrice,
    showSchemas,
    showAddToCartOnList,
    showOmnibus,
    isProductUnavailable,
    showProductUnavailableAtAll,
    showProductUnavailableForRegion,
  }
}
