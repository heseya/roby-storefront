export default {
  breadcrumbs: {
    home: 'Home',
    account: 'Account',
    blog: 'Blog',
  },

  common: {
    save: 'Save',
    cancel: 'Cancel',
    edit: 'Edit',
    yes: 'Yes',
    no: 'No',
    name: 'Name',
    error: 'Error',
    in: 'in',
    from: 'from',
    to: 'to',
    message: 'message',
  },

  payments: {
    deliveryAddress: 'Delivery address',
    billingAddress: 'Billing details',
    payment: 'Payment',
    paid: 'Paid',
    unpaid: 'Unpaid',
    confirmAndPay: 'Buy and pay',
    traditionalTransfer: 'Bank transfer',
    payForOrder: 'Pay for order',
    discount: 'Discount',
  },

  account: {
    myData: 'My data',
    deleteAccount: 'Delete account',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    addresses: 'Adresy',
    registerTitle: 'Create account',
    settings: 'Settings',
    noAccount: 'Not have account?',
  },

  orders: {
    title: 'Orders',
    details: 'Order details',
    status: 'Status',
    delivery: 'Delivery',
    totalAmount: 'Total Amount',
    productsPrice: 'Products price',
  },

  offers: {
    renting: 'Ask for rental',
    pricing: 'Ask for price',
  },

  cart: {
    title: 'Cart',
    empty: 'Your shopping cart is empty',
    quantity: 'Quantity:',
    remove: 'Remove the product from the cart',
  },

  custom: {
    workingDays: 'working days',
    showAll: 'Show all',
  },

  form: {
    send: 'Send',
    email: 'E-mail',
    vat: 'TIN',
    password: 'Password',
    confirmPassword: 'Confirm password',
    backToLogin: 'Back to login',
    currentPassword: 'Current password',
    nameAndSurname: 'Name and surname',
    needInvoice: 'I need invoice',
  },

  nav: {
    title: 'Menu',
    goToMainPage: 'Go to home page',
    close: 'Close the navigation menu',
    showSubcategories: 'Show subcategories',
    showCategories: 'Show categories',
  },

  search: {
    action: 'Search',
    open: 'Open search',
    close: 'Close search',
    placeholder: 'What are you looking for?',
  },

  languages: {
    pl: 'Polish',
    en: 'English',
  },

  seo: {
    loading: 'Loading...',
  },

  wishlist: {
    title: 'Wishlist',
    added: 'The product has been added to the wishlist.',
    removed: 'The product has been removed from the wishlist.',
    empty: 'You have no products added to your wishlist',
  },

  phonePrefix: {
    default: 'e.g.:',
    mobile: 'e.g.:',
  },

  errors: {
    CLIENT_INVALID_CREDENTIALS: 'Incorrect login or password.',
    CLIENT_INVALID_PASSWORD: 'Invalid password.',
    CLIENT_INVALID_TOKEN: 'Invalid access token.',
    CLIENT_TOKEN_INVALID_OR_INACTIVE: 'The access token has expired or is inactive.',
    CLIENT_NOT_ENOUGH_ITEMS: 'There are not enough items.',
    CLIENT_ORDER_PAID: 'The order has already been paid.',
    CLIENT_UNKNOWN_PAYMENT_METHOD: 'Unknown payment method.',
    CLIENT_TFA_REQUIRED: 'To log in, you need to enter the code from the two-factor authorization.',
    CLIENT_TFA_INVALID_TOKEN: 'Invalid two-factor authorization token.',
    CLIENT_NO_ACCESS: 'You do not have access to these resources.',

    ORDER_WITH_THIS_NUMBER_DOESNT_EXIST: 'Order with this number doesnt exist',

    VALIDATION_ERROR: 'Validation error.',
    VALIDATION_PASSWORD_COMPROMISED:
      'The password you provided appeared in a data leak. Please choose a different password.',
    CLIENT_REGISTER_WITH_NON_REGISTRATION_ROLE: 'You cannot register with this role.',
    VALIDATION_REQUIRED: 'The field is required.',
    VALIDATION_REQUIRED_CONSENTS: 'Not all required consents have been accepted.',
    VALIDATION_PASSWORD_LENGTH: 'The password must be at least 12 characters long.',
    VALIDATION_UNIQUE: 'The given e-mail has already been registered in the system.',
    VALIDATION_CONSENT_EXISTS: 'Accepted consent doesnt exist in the system.',

    UNPROCESSABLE_ENTITY: 'Validation error.',

    NOT_FOUND: 'The specified page was not found.',
    INTERNAL_SERVER_ERROR: 'Internal server error.',
    UNAUTHORIZED: 'Nie posiadasz dostępu do tego miejsca.',
    FORBIDDEN: 'You do not have access to this place.',
    BAD_REQUEST: 'Invalid request.',
    BAD_GATEWAY: 'Server gateway error.',
  },
}
