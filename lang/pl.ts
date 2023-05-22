export default {
  breadcrumbs: {
    home: 'Strona główna',
    account: 'Moje konto',
    blog: 'Blog',
  },

  common: {
    save: 'Zapisz',
    cancel: 'Anuluj',
    yes: 'Tak',
    no: 'Nie',
    name: 'Nazwa',
    error: 'Bład',
    in: 'w',
    from: 'od',
    to: 'do',
    message: 'Wiadomość',
  },

  payments: {
    deliveryAddress: 'Adres dostawy',
    billingAddress: 'Dane do rachunku',
    payment: 'Płatność',
    paid: 'Opłacono',
    notPaid: 'Nie opłacono',
    confirmAndPay: 'Potwierdzam i płacę',
    traditionalTransfer: 'Przelew tradycyjny',
    payForOrder: 'Opłać zamówienie',
  },

  custom: {
    myData: 'Moje dane',
    deleteAccount: 'Usuń konto',
    status: 'Status',
    delivery: 'Dostawa',
    totalAmount: 'Łączna kwota',
    productsPrice: 'Cena produktów',
    wishlist: 'Lista życzeń',
    addresses: 'Adresy',
    login: 'Zaloguj się',
    register: 'Zarejestruj się',
    registerTitle: 'Rejestracja',
    emptyCart: 'Twój koszyk jest pusty',
    noAccount: 'Nie masz konta?',
    discount: 'Oszczędzasz',
    needInvoice: 'Potrzebuje fakturę VAT',
    workingDays: 'dni roboczych',
    showAll: 'Pokaż wszystkie',
    conditions: 'Warunki',
    privacy: 'Prywatność',
    orders: 'Zamówienia',
    orderDetails: 'Szczegóły Zamówienia',
    logout: 'Wyloguj się',
    cart: 'Koszyk',
    renting: 'Zapytaj o wynajem',
    pricing: 'Zapytaj o cenę',
    settings: 'Ustawienia konta',
    quantity: 'Ilość:',
    search: 'Czego szukasz?',
  },

  form: {
    send: 'Wyślij',
    email: 'Adres e-mail',
    vat: 'NIP',
    password: 'Hasło',
    confirmPassword: 'Powtórz Hasło',
    backToLogin: 'Wróć do logowania',
    currentPassword: 'Aktualne hasło',
    nameAndSurname: 'Imię i nazwisko',
  },

  nav: {
    goToMainPage: 'Przejdź na stronę główną',
  },

  seo: {
    loading: 'Wczytywanie...',
  },

  wishlist: {
    added: 'Produkt został dodany do listy życzeń.',
    removed: 'Produkt został usunięty z listy życzeń.',
    empty: 'Nie masz żadnego produktu dodanego do listy życzeń',
  },

  phonePrefix: {
    default: 'tel.:',
    mobile: 'tel. kom.:',
  },

  errors: {
    CLIENT_INVALID_CREDENTIALS: 'Nieprawidłowy login lub hasło.',
    CLIENT_INVALID_PASSWORD: 'Nieprawidłowe aktualne hasło.',
    CLIENT_INVALID_TOKEN: 'Nieprawidłowy token dostępowy.',
    CLIENT_TOKEN_INVALID_OR_INACTIVE: 'Token dostępowy wygasł lub jest nieaktywny.',
    CLIENT_NOT_ENOUGH_ITEMS: 'Nie ma wystarczającej ilości przedmiotów.',
    CLIENT_ORDER_PAID: 'Zamówienie zostało już opłacone.',
    CLIENT_UNKNOWN_PAYMENT_METHOD: 'Nieznana metoda płatności.',
    CLIENT_TFA_REQUIRED: 'Do zalogowania potrzebne jest wpisanie kodu z podwójnej autoryzacji.',
    CLIENT_TFA_INVALID_TOKEN: 'Nieprawidłowy token podwójnej autoryzacji.',
    CLIENT_NO_ACCESS: 'Nie posiadasz dostępu do tego miejsca.',

    ORDER_WITH_THIS_NUMBER_DOESNT_EXIST: 'Zamówienie o tym numerze nie istnieje',

    VALIDATION_ERROR: 'Błąd walidacji.',
    VALIDATION_PASSWORD_COMPROMISED:
      'Podane hasło pojawiło się w wycieku danych. Proszę wybrać inne hasło.',
    CLIENT_REGISTER_WITH_NON_REGISTRATION_ROLE: 'Nie możesz się zarejestrować z tą rolą.',
    VALIDATION_REQUIRED: 'Pole jest wymagane.',
    VALIDATION_REQUIRED_CONSENTS: 'Nie zostały zaakcepowane wszystkie wymagane zgody.',
    VALIDATION_PASSWORD_LENGTH: 'Hasło musi mieć przynajmniej 12 znaków.',
    VALIDATION_UNIQUE: 'Podany adres e-mail został już zarejestrowany w systemie.',

    UNPROCESSABLE_ENTITY: 'Błąd walidacji.',

    NOT_FOUND: 'Podana strona nie została znaleziona.',
    INTERNAL_SERVER_ERROR: 'Wewnętrzny błąd serwera.',
    UNAUTHORIZED: 'Nie posiadasz dostępu do tego miejsca.',
    FORBIDDEN: 'Nie posiadasz dostepu do tego miejsca.',
    BAD_REQUEST: 'Nieprawidłowe zapytanie.',
    BAD_GATEWAY: 'Błąd bramy serwera.',
  },
}
