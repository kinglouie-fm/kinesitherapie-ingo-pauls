import { BUSINESS, LOCALES, OPENING_HOURS, buildUrl } from "./site";

const SERVICE_IDS = [
  "omt",
  "stosswelle",
  "dry-needling",
  "faszien",
  "ivrt",
  "cmd",
  "lymph",
  "training",
  "physikalisch",
];

const TEAM_IDS = ["ingo", "paul", "birgit", "gilles"];

function text(t, key) {
  const value = t(key);
  return value === key ? "" : value;
}

function stripHtml(value) {
  return String(value).replace(/<[^>]*>/g, "");
}

function openingHoursSpecification() {
  return OPENING_HOURS.map(([dayOfWeek, opens, closes]) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek,
    opens,
    closes,
  }));
}

function services(t, locale) {
  return SERVICE_IDS.map((id) => {
    const title = text(t, `services.items.${id}.title`);
    const description = text(t, `services.items.${id}.description`);

    return {
      "@type": "Service",
      "@id": `${buildUrl(`/${locale}/`)}#service-${id}`,
      name: title,
      description,
      provider: { "@id": BUSINESS.id },
      areaServed: BUSINESS.areaServed,
      serviceType: title,
    };
  });
}

function teamMembers(t, locale) {
  return TEAM_IDS.map((id) => {
    const bullets = text(t, `team.members.${id}.bullets`);

    return {
      "@type": "Person",
      "@id": `${buildUrl(`/${locale}/`)}#person-${id}`,
      name: text(t, `team.members.${id}.name`),
      jobTitle: text(t, `team.members.${id}.role`),
      worksFor: { "@id": BUSINESS.id },
      knowsAbout: Array.isArray(bullets) ? bullets.map(stripHtml) : [],
    };
  });
}

export function buildHomeJsonLd({ locale, t }) {
  const url = buildUrl(`/${locale}/`);
  const serviceItems = services(t, locale);
  const people = teamMembers(t, locale);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["MedicalClinic", "LocalBusiness"],
        "@id": BUSINESS.id,
        name: BUSINESS.name,
        url: BUSINESS.url,
        telephone: BUSINESS.telephone,
        image: [BUSINESS.logo],
        logo: BUSINESS.logo,
        foundingDate: BUSINESS.foundingDate,
        address: {
          "@type": "PostalAddress",
          ...BUSINESS.address,
        },
        geo: {
          "@type": "GeoCoordinates",
          ...BUSINESS.geo,
        },
        medicalSpecialty: "Physiotherapy",
        openingHoursSpecification: openingHoursSpecification(),
        areaServed: BUSINESS.areaServed,
        availableLanguage: LOCALES,
        sameAs: BUSINESS.sameAs,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: text(t, "services.title"),
          itemListElement: serviceItems.map((service) => ({
            "@type": "Offer",
            itemOffered: { "@id": service["@id"] },
          })),
        },
        employee: people.map((person) => ({ "@id": person["@id"] })),
      },
      {
        "@type": "WebSite",
        "@id": `${BUSINESS.url}#website`,
        name: BUSINESS.name,
        url: BUSINESS.url,
        inLanguage: locale,
        publisher: { "@id": BUSINESS.id },
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: text(t, "seo.home.title"),
        description: text(t, "seo.home.description"),
        inLanguage: locale,
        isPartOf: { "@id": `${BUSINESS.url}#website` },
        about: { "@id": BUSINESS.id },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: text(t, "nav.home"),
            item: url,
          },
        ],
      },
      ...serviceItems,
      ...people,
    ],
  };
}
