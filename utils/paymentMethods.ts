/**
 * This is a hack - only traditional (manual) bank transfer has this configuration (as of:2024-10-11).
 * The reason for using this hack is that the risk of a payment method appearing with the same configuration is minimal.
 * However, if a new payment method emerges that has the same configuration, this needs to be thought through architecturally better (on the backend side).
 */
export const isTraditionalTransferPayment = (paymentMethod: {
  creates_default_payment: boolean
  type: 'prepaid' | 'postpaid'
}): boolean => paymentMethod.creates_default_payment && paymentMethod.type === 'prepaid'
