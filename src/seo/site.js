const envSiteUrl = import.meta.env?.VITE_SITE_URL || "https://kine-diekirch.lu";

export const SITE_ORIGIN = envSiteUrl.replace(/\/$/, "");
export const DEFAULT_LOCALE = "de";
export const LOCALES = ["de", "fr", "lb", "en"];

export const LEGAL_PAGES = ["cookies", "impressum", "privacy"];

export const HOME_ROUTES = LOCALES.map((locale) => ({
  locale,
  path: `/${locale}/`,
  page: "home",
  indexable: true,
}));

export const LEGAL_ROUTES = LOCALES.flatMap((locale) =>
  LEGAL_PAGES.map((page) => ({
    locale,
    path: `/${locale}/${page}`,
    page,
    indexable: page === "impressum",
  })),
);

export const ROUTES = [...HOME_ROUTES, ...LEGAL_ROUTES];

export const BUSINESS = {
  id: `${SITE_ORIGIN}/#clinic`,
  name: "Kinésithérapie Ingo Pauls",
  url: `${SITE_ORIGIN}/`,
  telephone: "+35226803831",
  displayTelephone: "+352 26 80 38 31",
  logo: `${SITE_ORIGIN}/images/logo.webp`,
  address: {
    streetAddress: "19, Rue Pierre Olinger",
    postalCode: "9264",
    addressLocality: "Diekirch",
    addressCountry: "LU",
  },
  geo: {
    latitude: 49.86331850247848,
    longitude: 6.162371199360393,
  },
  foundingDate: "2005",
  areaServed: ["Diekirch", "Luxembourg"],
  sameAs: [
    "https://www.google.com/maps/place/Kin%C3%A9sith%C3%A9rapie+Pauls+Ingo/@49.8631352,6.1597158,17z/",
  ],
};

export const OPENING_HOURS = [
  ["Monday", "06:40", "12:00"],
  ["Monday", "13:00", "19:00"],
  ["Tuesday", "06:40", "12:00"],
  ["Tuesday", "13:00", "19:00"],
  ["Wednesday", "07:30", "12:00"],
  ["Wednesday", "13:00", "19:00"],
  ["Thursday", "06:40", "12:00"],
  ["Thursday", "13:00", "19:00"],
  ["Friday", "06:40", "12:00"],
  ["Friday", "13:00", "19:00"],
];

export function buildUrl(path = "/") {
  return `${SITE_ORIGIN}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildLocalizedPath(locale, page = "home") {
  if (page === "home") return `/${locale}/`;
  return `/${locale}/${page}`;
}
