import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const origin = (process.env.VITE_SITE_URL || "https://kine-diekirch.lu").replace(/\/$/, "");
const locales = ["de", "fr", "lb", "en"];

const homeMeta = {
  de: {
    title: "Kinésithérapie Ingo Pauls - Physiotherapie in Diekirch",
    description:
      "Willkommen bei Kinésithérapie Ingo Pauls in Diekirch. Wir bieten professionelle Physiotherapie für nachhaltige Schmerzlinderung und Beweglichkeit.",
  },
  fr: {
    title: "Kinésithérapie Ingo Pauls - Kinésithérapie à Diekirch",
    description:
      "Bienvenue chez Kinésithérapie Ingo Pauls à Diekirch. Nous offrons une kinésithérapie professionnelle pour un soulagement durable de la douleur et une meilleure mobilité.",
  },
  lb: {
    title: "Kinésithérapie Ingo Pauls - Kinésithérapie zu Dikkrech",
    description:
      "Wëllkomm bei der Kinésithérapie Ingo Pauls zu Dikkrech. Mir bidden professionell Kinésithérapie fir laangfristeg manner Péng a besser Beweglechkeet un.",
  },
  en: {
    title: "Physiotherapy Ingo Pauls - Physiotherapy in Diekirch",
    description:
      "Welcome to Physiotherapy Ingo Pauls in Diekirch. We offer professional physiotherapy for sustainable pain relief and mobility.",
  },
};

const legalTitles = {
  cookies: {
    de: "Cookie-Richtlinie",
    fr: "Politique des cookies",
    lb: "Cookie-Richtlinn",
    en: "Cookie Policy",
  },
  impressum: {
    de: "Impressum",
    fr: "Mentions légales",
    lb: "Impressum",
    en: "Legal Notice",
  },
  privacy: {
    de: "Datenschutz – Kinésithérapie Ingo Pauls",
    fr: "Politique de confidentialité",
    lb: "Dateschutz",
    en: "Privacy Policy",
  },
};

const localeLabels = {
  de: "de_LU",
  fr: "fr_LU",
  lb: "lb_LU",
  en: "en_LU",
};

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeJson(value) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

function alternateLinks(page) {
  const suffix = page === "home" ? "/" : `/${page}`;
  const links = locales
    .map((locale) => `<link rel="alternate" hreflang="${locale}" href="${origin}/${locale}${suffix}">`)
    .join("\n  ");

  return `${links}\n  <link rel="alternate" hreflang="x-default" href="${origin}/de${suffix}">`;
}

function buildJsonLd({ locale, title, description }) {
  const url = `${origin}/${locale}/`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["MedicalClinic", "LocalBusiness"],
        "@id": `${origin}/#clinic`,
        name: "Kinésithérapie Ingo Pauls",
        url: `${origin}/`,
        telephone: "+35226803831",
        image: [`${origin}/images/logo.webp`],
        logo: `${origin}/images/logo.webp`,
        foundingDate: "2005",
        address: {
          "@type": "PostalAddress",
          streetAddress: "19, Rue Pierre Olinger",
          postalCode: "9264",
          addressLocality: "Diekirch",
          addressCountry: "LU",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 49.86331850247848,
          longitude: 6.162371199360393,
        },
        medicalSpecialty: "Physiotherapy",
        areaServed: ["Diekirch", "Luxembourg"],
        availableLanguage: locales,
        openingHoursSpecification: [
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
        ].map(([dayOfWeek, opens, closes]) => ({
          "@type": "OpeningHoursSpecification",
          dayOfWeek,
          opens,
          closes,
        })),
        sameAs: [
          "https://www.google.com/maps/place/Kin%C3%A9sith%C3%A9rapie+Pauls+Ingo/@49.8631352,6.1597158,17z/",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${origin}/#website`,
        name: "Kinésithérapie Ingo Pauls",
        url: `${origin}/`,
        inLanguage: locale,
        publisher: { "@id": `${origin}/#clinic` },
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: title,
        description,
        inLanguage: locale,
        isPartOf: { "@id": `${origin}/#website` },
        about: { "@id": `${origin}/#clinic` },
      },
    ],
  };
}

function headForRoute({ locale, page, title, description, indexable }) {
  const path = page === "home" ? `/${locale}/` : `/${locale}/${page}`;
  const url = `${origin}${path}`;
  const tags = [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}">`,
    `<meta name="robots" content="${indexable ? "index,follow" : "noindex,follow"}">`,
    `<link rel="canonical" href="${url}">`,
    alternateLinks(page),
    `<meta property="og:type" content="website">`,
    `<meta property="og:site_name" content="Kinésithérapie Ingo Pauls">`,
    `<meta property="og:title" content="${escapeHtml(title)}">`,
    `<meta property="og:description" content="${escapeHtml(description)}">`,
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:image" content="${origin}/images/logo.webp">`,
    `<meta property="og:locale" content="${localeLabels[locale]}">`,
    ...locales
      .filter((alternateLocale) => alternateLocale !== locale)
      .map((alternateLocale) => `<meta property="og:locale:alternate" content="${localeLabels[alternateLocale]}">`),
    `<meta name="twitter:card" content="summary">`,
    `<meta name="twitter:title" content="${escapeHtml(title)}">`,
    `<meta name="twitter:description" content="${escapeHtml(description)}">`,
    `<meta name="twitter:image" content="${origin}/images/logo.webp">`,
  ];

  if (page === "home") {
    tags.push(`<script type="application/ld+json">${escapeJson(buildJsonLd({ locale, title, description }))}</script>`);
  }

  return tags;
}

function injectHead(template, locale, tags) {
  let html = template.replace(/<html lang="[^"]*">/, `<html lang="${locale}">`);
  html = html.replace(/<title>[\s\S]*?<\/title>/, "");
  html = html.replace(/<meta name="description"[\s\S]*?>/, "");
  html = html.replace("</head>", `  ${tags.join("\n  ")}\n</head>`);
  return html;
}

function writeRoute({ locale, page, title, description, indexable }) {
  const html = injectHead(template, locale, headForRoute({ locale, page, title, description, indexable }));
  const file = page === "home"
    ? join(distDir, locale, "index.html")
    : join(distDir, locale, page, "index.html");

  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
}

const distDir = join(process.cwd(), "dist");
const template = readFileSync(join(distDir, "index.html"), "utf8");

for (const locale of locales) {
  writeRoute({
    locale,
    page: "home",
    ...homeMeta[locale],
    indexable: true,
  });

  for (const page of ["cookies", "impressum", "privacy"]) {
    writeRoute({
      locale,
      page,
      title: legalTitles[page][locale],
      description:
        page === "impressum"
          ? "Kinésithérapie Ingo Pauls, 19, Rue Pierre Olinger, L-9264 Diekirch, Luxembourg"
          : legalTitles[page][locale],
      indexable: page === "impressum",
    });
  }
}

console.log("Pre-rendered SEO route HTML.");
