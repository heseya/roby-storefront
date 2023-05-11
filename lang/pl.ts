export default {
  breadcrumbs: {
    home: 'Strona główna',
    account: 'Moje konto',
    blog: 'Blog',
  },

  common: {
    yes: 'Tak',
    no: 'Nie',
  },

  seo: {
    loading: 'Wczytywanie...',
  },

  wishlist: {
    added: 'Produkt został dodany do listy życzeń.',
    removed: 'Produkt został usunięty z listy życzeń.',
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
