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
    configure: 'Skonfiguruj',
    addToCart: 'Dodaj do koszyka',
    lease: 'Zapytaj o leasing',
  },

  cart: {
    title: 'Koszyk',
    empty: 'Twój koszyk jest pusty',
    added: 'Produkt został dodany do koszyka.',
    quantity: 'Ilość:',
    remove: 'Usuń produkt z koszyka',
  },

  custom: {
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
    needInvoice: 'Kupuję jako firma, potrzebuję fakturę VAT',
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

  shippingTime: {
    from: 'od',
    in: 'w',
    workDays: 'dni roboczych',
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
    CLIENT_CAPTCHA_FAILED: 'Weryfikacja reCAPTCHA nie powiodła się.',

    ORDER_WITH_THIS_NUMBER_DOESNT_EXIST: 'Zamówienie o tym numerze nie istnieje',
    CLIENT_GENERATE_PAYMENT_URL: 'Błąd podczas generowania linku do płatności.',

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
    VALIDATION_SHIPPING_PLACE: 'Podane miejsce dostawy jest nieprawidłowe.',
    VALIDATION_FULL_NAME: 'Należy podać poprawne imię jak i nazwisko.',
    VALIDATION_STREET_NUMBER: 'Adres musi zawierać nazwę ulicy oraz numer domu.',
    VALIDATION_PRODUCT_SCHEMA_OPTION:
      'Wybrana konfiguracja produktów jest nieprawidłowa. Usuń produkty z koszyka i dodaj je ponownie.',
    VALIDATION_EMAIL_TAKEN: 'Podany adres e-mail jest już zajęty.',

    UNPROCESSABLE_ENTITY: 'Błąd walidacji.',

    SERVER_CAPTCHA_ERROR: 'Błąd serwera reCAPTCHA.',
    NOT_FOUND: 'Podana strona nie została znaleziona.',
    INTERNAL_SERVER_ERROR: 'Wewnętrzny błąd serwera.',
    UNAUTHORIZED: 'Nie posiadasz dostępu do tego miejsca.',
    FORBIDDEN: 'Nie posiadasz dostepu do tego miejsca.',
    BAD_REQUEST: 'Nieprawidłowe zapytanie.',
    BAD_GATEWAY: 'Błąd bramy serwera.',

    checkout: {
      email: 'Podaj poprawny adres e-mail.',
      consent: 'Zaakceptuj wszystkie wymagane zgody.',
      shippingMethod: 'Wybierz metodę dostawy.',
      paymentMethod: 'Wybierz metodę płatności.',
      shippingAddress: 'Podaj poprawny adres dostawy.',
      shippingPlace: 'Podaj poprawne miejsce dostawy.',
      billingAddress: 'Podaj poprawny adres do rachunku.',
      billingAddressVat: 'Uzupełnij NIP jeśli chcesz fakturę VAT.',
      validationError: 'Popraw błędne dane w formularzu.',
    },
  },

  countries: {
    AD: 'Andorra',
    AE: 'Zjednoczone Emiraty Arabskie',
    AF: 'Afganistan',
    AG: 'Antigua and Barbuda',
    AI: 'Anguilla',
    AL: 'Albania',
    AM: 'Armenia',
    AO: 'Angola',
    AQ: 'Antarktyka',
    AR: 'Argentina',
    AS: 'Amerykańska Samoa',
    AT: 'Austria',
    AU: 'Australia',
    AW: 'Aruba',
    AX: 'Wyspy Åland',
    AZ: 'Azerbejdżan',
    BA: 'Bośnia i Hercegowina',
    BB: 'Barbados',
    BD: 'Bangladesz',
    BE: 'Belgia',
    BF: 'Burkina Faso',
    BG: 'Bułgaria',
    BH: 'Bahrajn',
    BI: 'Burundi',
    BJ: 'Benin',
    BL: 'Saint-Barthélemy',
    BM: 'Bermudy',
    BN: 'Brunei Darussalam',
    BO: 'Boliwia',
    BQ: 'Bonaire, Sint Eustatius i Saba',
    BR: 'Brazylia',
    BS: 'Bahamy',
    BT: 'Bhutan',
    BV: 'Wyspa Bouveta',
    BW: 'Botswana',
    BY: 'Białoruś',
    BZ: 'Belize',
    CA: 'Kanada',
    CC: 'Wyspy Kokosowe',
    CD: 'Demokratyczna Republika Konga',
    CF: 'Republika Środkowoafrykańska',
    CG: 'Kongo',
    CH: 'Szwajcaria',
    CI: 'Wybrzeże Kości Słoniowej',
    CK: 'Wyspy Cooka',
    CL: 'Chile',
    CM: 'Kamerun',
    CN: 'Chiny',
    CO: 'Kolumbia',
    CR: 'Kostaryka',
    CU: 'Kuba',
    CV: 'Republika Zielonego Przylądka',
    CW: 'Curaçao',
    CX: 'Wyspa Bożego Narodzenia',
    CY: 'Cypr',
    CZ: 'Czechy',
    DE: 'Niemcy',
    DJ: 'Dżibuti',
    DK: 'Dania',
    DM: 'Dominika',
    DO: 'Republika Dominikańska',
    DZ: 'Algieria',
    EC: 'Ekwador',
    EE: 'Estonia',
    EG: 'Egipt',
    EH: 'Sahara Zachodnia',
    ER: 'Erytrea',
    ES: 'Hiszpania',
    ET: 'Etiopia',
    FI: 'Finlandia',
    FJ: 'Fidżi',
    FK: 'Falklandy (Malwiny)',
    FM: 'Mikronezja',
    FO: 'Wyspy Owcze',
    FR: 'Francja',
    GA: 'Gabon',
    GB: 'Wielka Brytania',
    GD: 'Grenada',
    GE: 'Gruzja',
    GF: 'Gujana Francuska',
    GG: 'Guernsey',
    GH: 'Ghana',
    GI: 'Gibraltar',
    GL: 'Grenlandia',
    GM: 'Gambia',
    GN: 'Gwinea',
    GP: 'Gwadelupa',
    GQ: 'Gwinea Równikowa',
    GR: 'Grecja',
    GS: 'Georgia Południowa i Sandwich Południowy',
    GT: 'Gwatemala',
    GU: 'Guam',
    GW: 'Gwinea Bissau',
    GY: 'Gujana',
    HK: 'Hongkong',
    HM: 'Wyspy Heard i McDonalda',
    HN: 'Honduras',
    HR: 'Chorwacja',
    HT: 'Haiti',
    HU: 'Węgry',
    ID: 'Indonezja',
    IE: 'Irlandia',
    IL: 'Izrael',
    IM: 'Wyspa Man',
    IN: 'Indie',
    IO: 'Brytyjskie Terytorium Oceanu Indyjskiego',
    IQ: 'Irak',
    IR: 'Iran',
    IS: 'Islandia',
    IT: 'Włochy',
    JE: 'Jersey',
    JM: 'Jamajka',
    JO: 'Jordania',
    JP: 'Japonia',
    KE: 'Kenia',
    KG: 'Kirgistan',
    KH: 'Kambodża',
    KI: 'Kiribati',
    KM: 'Komory',
    KN: 'Saint Kitts i Nevis',
    KP: 'Korea Północna',
    KR: 'Korea Południowa',
    KW: 'Kuwejt',
    KY: 'Kajmany',
    KZ: 'Kazachstan',
    LA: 'Laos',
    LB: 'Liban',
    LC: 'Saint Lucia',
    LI: 'Liechtenstein',
    LK: 'Sri Lanka',
    LR: 'Liberia',
    LS: 'Lesotho',
    LT: 'Litwa',
    LU: 'Luksemburg',
    LV: 'Łotwa',
    LY: 'Libia',
    MA: 'Maroko',
    MC: 'Monako',
    MD: 'Mołdawia',
    ME: 'Czarnogóra',
    MF: 'Saint-Martin',
    MG: 'Madagaskar',
    MH: 'Wyspy Marshalla',
    MK: 'Macedonia Północna',
    ML: 'Mali',
    MM: 'Mjanma (Birma)',
    MN: 'Mongolia',
    MO: 'Makau',
    MP: 'Mariany Północne',
    MQ: 'Martynika',
    MR: 'Mauretania',
    MS: 'Montserrat',
    MT: 'Malta',
    MU: 'Mauritius',
    MV: 'Malediwy',
    MW: 'Malawi',
    MX: 'Meksyk',
    MY: 'Malezja',
    MZ: 'Mozambik',
    NA: 'Namibia',
    NC: 'Nowa Kaledonia',
    NE: 'Niger',
    NF: 'Norfolk',
    NG: 'Nigeria',
    NI: 'Nikaragua',
    NL: 'Holandia',
    NO: 'Norwegia',
    NP: 'Nepal',
    NR: 'Nauru',
    NU: 'Niue',
    NZ: 'Nowa Zelandia',
    OM: 'Oman',
    PA: 'Panama',
    PE: 'Peru',
    PF: 'Polinezja Francuska',
    PG: 'Papua-Nowa Gwinea',
    PH: 'Filipiny',
    PK: 'Pakistan',
    PL: 'Polska',
    PM: 'Saint-Pierre i Miquelon',
    PN: 'Pitcairn',
    PR: 'Portoryko',
    PS: 'Terytoria Palestyńskie',
    PT: 'Portugalia',
    PW: 'Palau',
    PY: 'Paragwaj',
    QA: 'Katar',
    RE: 'Reunion',
    RO: 'Rumunia',
    RS: 'Serbia',
    RU: 'Rosja',
    RW: 'Rwanda',
    SA: 'Arabia Saudyjska',
    SB: 'Wyspy Salomona',
    SC: 'Seszele',
    SD: 'Sudan',
    SE: 'Szwecja',
    SG: 'Singapur',
    SH: 'Święta Helena',
    SI: 'Słowenia',
    SJ: 'Svalbard i Jan Mayen',
    SK: 'Słowacja',
    SL: 'Sierra Leone',
    SM: 'San Marino',
    SN: 'Senegal',
    SO: 'Somalia',
    SR: 'Surinam',
    SS: 'Sudan Południowy',
    ST: 'Wyspy Świętego Tomasza i Książęca',
    SV: 'Salwador',
    SX: 'Sint Maarten',
    SY: 'Syria',
    SZ: 'Eswatini',
    TC: 'Turks i Caicos',
    TD: 'Czad',
    TF: 'Francuskie Terytoria Południowe i Antarktyczne',
    TG: 'Togo',
    TH: 'Tajlandia',
    TJ: 'Tadżykistan',
    TK: 'Tokelau',
    TL: 'Timor Wschodni',
    TM: 'Turkmenistan',
    TN: 'Tunezja',
    TO: 'Tonga',
    TR: 'Turcja',
    TT: 'Trynidad i Tobago',
    TV: 'Tuvalu',
    TW: 'Tajwan',
    TZ: 'Tanzania',
    UA: 'Ukraina',
    UG: 'Uganda',
    UM: 'Dalekie Wyspy Mniejsze Stanów Zjednoczonych',
    US: 'Stany Zjednoczone',
    UY: 'Urugwaj',
    UZ: 'Uzbekistan',
    VA: 'Watykan',
    VC: 'Saint Vincent i Grenadyny',
    VE: 'Wenezuela',
    VG: 'Brytyjskie Wyspy Dziewicze',
    VI: 'Wyspy Dziewicze Stanów Zjednoczonych',
    VN: 'Wietnam',
    VU: 'Vanuatu',
    WF: 'Wallis i Futuna',
    WS: 'Samoa',
    YE: 'Jemen',
    YT: 'Majotta',
    ZA: 'Republika Południowej Afryki',
    ZM: 'Zambia',
    ZW: 'Zimbabwe',
  },
}
