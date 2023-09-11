export default {
  breadcrumbs: {
    home: 'Strona główna',
    account: 'Moje konto',
    blog: 'Blog',
  },

  common: {
    save: 'Zapisz',
    cancel: 'Anuluj',
    edit: 'Edytuj',
    yes: 'Tak',
    no: 'Nie',
    name: 'Nazwa',
    error: 'Błąd',
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
    unpaid: 'Nie opłacono',
    paymentOnDelivery: 'Za pobraniem',
    confirmAndPay: 'Potwierdzam i płacę',
    traditionalTransfer: 'Przelew tradycyjny',
    payForOrder: 'Opłać zamówienie',
    discount: 'Oszczędzasz',
  },

  account: {
    myData: 'Moje dane',
    deleteAccount: 'Usuń konto',
    login: 'Zaloguj się',
    register: 'Zarejestruj się',
    logout: 'Wyloguj się',
    addresses: 'Adresy',
    registerTitle: 'Rejestracja',
    settings: 'Ustawienia konta',
    noAccount: 'Nie masz konta?',
  },

  orders: {
    summary: 'Podsumowanie zamówienia',
    title: 'Zamówienia',
    details: 'Szczegóły Zamówienia',
    status: 'Status',
    delivery: 'Dostawa',
    totalAmount: 'Łączna kwota',
    productsPrice: 'Cena produktów',
  },

  offers: {
    renting: 'Zapytaj o wynajem',
    pricing: 'Zapytaj o cenę',
    unavailable: 'Produkt niedostępny',
  },

  cart: {
    title: 'Koszyk',
    empty: 'Twój koszyk jest pusty',
    quantity: 'Ilość:',
    remove: 'Usuń produkt z koszyka',
  },

  custom: {
    workingDays: 'dni roboczych',
    showAll: 'Pokaż wszystkie',
  },

  form: {
    send: 'Wyślij',
    email: 'Adres e-mail',
    vat: 'NIP',
    password: 'Hasło',
    confirmPassword: 'Powtórz hasło',
    backToLogin: 'Wróć do logowania',
    currentPassword: 'Aktualne hasło',
    nameAndSurname: 'Imię i nazwisko',
    phone: 'Telefon',
    birthdayDate: 'Data urodzenia',
    needInvoice: 'Potrzebuje fakturę VAT',
    name: 'Imię',
    surname: 'Nazwisko',
  },

  nav: {
    title: 'Menu',
    goToMainPage: 'Przejdź na stronę główną',
    close: 'Zamknij menu nawigacyjne',
    showSubcategories: 'Pokaż podkategorie',
    showCategories: 'Pokaż kategorie',
  },

  search: {
    action: 'Wyszukaj',
    open: 'Otwórz wyszukiwarkę',
    close: 'Zamknij wyszukiwarkę',
    placeholder: 'Czego szukasz?',
  },

  languages: {
    pl: 'Polski',
    en: 'Angielski',
  },

  seo: {
    loading: 'Wczytywanie...',
  },

  wishlist: {
    title: 'Lista życzeń',
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
    VALIDATION_EMAIL: 'Podany adres e-mail jest nieprawidłowy.',
    VALIDATION_PASSWORD_COMPROMISED:
      'Podane hasło pojawiło się w wycieku danych. Proszę wybrać inne hasło.',
    CLIENT_REGISTER_WITH_NON_REGISTRATION_ROLE: 'Nie możesz się zarejestrować z tą rolą.',
    VALIDATION_REQUIRED: 'Pole jest wymagane.',
    VALIDATION_REQUIRED_CONSENTS: 'Nie zostały zaakcepowane wszystkie wymagane zgody.',
    VALIDATION_PASSWORD_LENGTH: 'Hasło musi mieć przynajmniej 12 znaków.',
    VALIDATION_UNIQUE: 'Podany adres e-mail został już zarejestrowany w systemie.',
    VALIDATION_CONSENT_EXISTS: 'Zaakceptowana zgoda nie istnieje w systemie.',
    VALIDATION_PHONE:
      'Podany numer telefonu jest nieprawidłowy, pamiętaj by uwzględnić w nim numer kierunkowy kraju.',

    UNPROCESSABLE_ENTITY: 'Błąd walidacji.',

    NOT_FOUND: 'Podana strona nie została znaleziona.',
    INTERNAL_SERVER_ERROR: 'Wewnętrzny błąd serwera.',
    UNAUTHORIZED: 'Nie posiadasz dostępu do tego miejsca.',
    FORBIDDEN: 'Nie posiadasz dostepu do tego miejsca.',
    BAD_REQUEST: 'Nieprawidłowe zapytanie.',
    BAD_GATEWAY: 'Błąd bramy serwera.',
  },
}
