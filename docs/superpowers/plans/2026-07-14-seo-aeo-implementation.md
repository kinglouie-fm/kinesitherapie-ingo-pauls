# SEO AEO Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve SEO and AEO strength for the multilingual Kinésithérapie Ingo Pauls website without changing visible content, visual layout, component order, or user-facing page structure.

**Architecture:** Keep the Vue SPA user experience unchanged while adding a small SEO/AEO layer around it: shared route metadata, structured data builders, pre-rendered static HTML for crawlable routes, and validation scripts. All machine-readable content must be derived from existing visible copy, existing locale files, existing business facts, and existing assets.

**Tech Stack:** Vue 3, Vite 6, Vue Router 4, @vueuse/head, Node.js ESM scripts, Vercel static deployment.

## Global Constraints

- Do not add visible website text.
- Do not remove visible website text.
- Do not change layout, section order, component placement, spacing, or styling except where a non-visible metadata/pre-rendering change requires no rendered UI difference.
- Do not add FAQ schema unless matching questions and answers are visible on the page.
- Do not add medical claims beyond the existing locale content.
- Do not add review aggregate ratings unless verified rating count and score are available from an allowed source and visible or directly attributable.
- Keep existing public URLs: `/de/`, `/fr/`, `/lb/`, `/en/`, `/de/cookies`, `/fr/cookies`, `/lb/cookies`, `/en/cookies`, `/de/impressum`, `/fr/impressum`, `/lb/impressum`, `/en/impressum`, `/de/privacy`, `/fr/privacy`, `/lb/privacy`, `/en/privacy`.
- Use `https://kine-diekirch.lu` as the canonical production origin when `VITE_SITE_URL` is unset.
- Every task must pass `npm run build` before commit.

---

## File Structure

- Create `src/seo/site.js`: canonical site facts, locale list, route list, URL helpers, and shared business constants.
- Create `src/seo/meta.js`: functions that convert route and locale into `@vueuse/head` metadata.
- Create `src/seo/schema.js`: functions that build JSON-LD graphs from existing locale messages and site constants.
- Modify `src/views/HomeView.vue`: replace inline schema/head construction with shared metadata/schema helpers.
- Modify `src/views/PrivacyPolicyView.vue`, `src/views/ImpressumView.vue`, `src/views/CookiePolicyView.vue`: apply route metadata without changing templates.
- Modify `src/router/index.js`: add a catch-all 404 route and route names/meta used by SEO helpers.
- Create `src/views/NotFoundView.vue`: minimal noindex route that preserves the SPA fallback behavior without changing existing pages.
- Create `scripts/prerender.mjs`: build-time static rendering pass that writes route-specific HTML files after `vite build`.
- Create `scripts/validate-seo.mjs`: checks generated HTML for title, description, canonical, hreflang, JSON-LD, html lang, robots, and visible-content invariants.
- Modify `package.json`: add `postbuild`, `validate:seo`, and optionally `build:check` scripts.
- Modify `public/sitemap.xml`: add canonical alternates for indexable pages and remove or noindex utility pages according to the task decision below.
- Modify `public/robots.txt`: keep sitemap reference and allow crawling of public indexable pages.
- Modify `vercel.json`: keep canonical redirects and ensure unknown routes can serve the generated 404 response.

---

### Task 1: Shared SEO Site Constants

**Files:**
- Create: `src/seo/site.js`
- Test: `scripts/validate-seo.mjs`
- Modify: `package.json`

**Interfaces:**
- Produces: `SITE_ORIGIN`, `DEFAULT_LOCALE`, `LOCALES`, `HOME_ROUTES`, `LEGAL_ROUTES`, `ROUTES`, `buildUrl(path)`, `buildLocalizedPath(locale, page)`, `BUSINESS`, `OPENING_HOURS`.
- Consumes: no earlier task output.

- [ ] **Step 1: Create shared constants**

Add `src/seo/site.js` with this structure:

```js
export const SITE_ORIGIN = (import.meta.env?.VITE_SITE_URL || "https://kine-diekirch.lu").replace(/\/$/, "");

export const DEFAULT_LOCALE = "de";
export const LOCALES = ["de", "fr", "lb", "en"];

export const HOME_ROUTES = LOCALES.map((locale) => ({
  locale,
  path: `/${locale}/`,
  page: "home",
  indexable: true,
}));

export const LEGAL_PAGES = ["cookies", "impressum", "privacy"];

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
```

- [ ] **Step 2: Add a validation script skeleton**

Create `scripts/validate-seo.mjs`:

```js
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const distDir = join(process.cwd(), "dist");

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

assert(existsSync(distDir), "dist directory is missing. Run npm run build first.");

const indexHtml = readFileSync(join(distDir, "index.html"), "utf8");
assert(indexHtml.includes("<title>"), "dist/index.html must contain a title element.");

console.log("SEO validation passed.");
```

- [ ] **Step 3: Add script commands**

Modify `package.json` scripts:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "validate:seo": "node scripts/validate-seo.mjs",
    "build:check": "npm run build && npm run validate:seo"
  }
}
```

- [ ] **Step 4: Verify**

Run:

```bash
npm run build:check
```

Expected:

```text
SEO validation passed.
```

- [ ] **Step 5: Commit**

```bash
git add package.json src/seo/site.js scripts/validate-seo.mjs
git commit -m "feat: add shared seo site constants"
```

---

### Task 2: Route Metadata Helpers

**Files:**
- Create: `src/seo/meta.js`
- Modify: `src/views/HomeView.vue`
- Modify: `src/views/PrivacyPolicyView.vue`
- Modify: `src/views/ImpressumView.vue`
- Modify: `src/views/CookiePolicyView.vue`
- Test: `scripts/validate-seo.mjs`

**Interfaces:**
- Consumes: `LOCALES`, `DEFAULT_LOCALE`, `buildUrl`, `buildLocalizedPath`, `BUSINESS` from `src/seo/site.js`.
- Produces: `buildLocalizedHead({ locale, page, t, path })`.

- [ ] **Step 1: Add metadata builder**

Create `src/seo/meta.js`:

```js
import { BUSINESS, DEFAULT_LOCALE, LOCALES, buildLocalizedPath, buildUrl } from "./site";

const PAGE_KEYS = {
  home: {
    title: "seo.home.title",
    description: "seo.home.description",
  },
  privacy: {
    title: "privacy.seoTitle",
    description: "privacy.intro",
  },
  impressum: {
    title: "impressum.title",
    description: "footer.address.line1",
  },
  cookies: {
    title: "cookies.page.title",
    description: "cookies.page.intro",
  },
};

const OG_LOCALE = {
  de: "de_LU",
  fr: "fr_LU",
  lb: "lb_LU",
  en: "en_LU",
};

function resolveText(t, key, fallback) {
  const value = t(key);
  return value && value !== key ? value : fallback;
}

export function buildLocalizedHead({ locale, page, t, path }) {
  const keys = PAGE_KEYS[page] || PAGE_KEYS.home;
  const canonicalPath = path || buildLocalizedPath(locale, page);
  const canonicalUrl = buildUrl(canonicalPath);
  const title = resolveText(t, keys.title, BUSINESS.name);
  const description = resolveText(t, keys.description, BUSINESS.name);
  const indexable = page === "home" || page === "impressum";

  return {
    htmlAttrs: { lang: locale },
    title,
    meta: [
      { name: "description", content: description },
      { name: "robots", content: indexable ? "index,follow" : "noindex,follow" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: BUSINESS.name },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: canonicalUrl },
      { property: "og:image", content: BUSINESS.logo },
      { property: "og:locale", content: OG_LOCALE[locale] || OG_LOCALE[DEFAULT_LOCALE] },
      ...LOCALES.filter((alternateLocale) => alternateLocale !== locale).map((alternateLocale) => ({
        property: "og:locale:alternate",
        content: OG_LOCALE[alternateLocale],
      })),
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: BUSINESS.logo },
    ],
    link: [
      { rel: "canonical", href: canonicalUrl },
      ...LOCALES.map((alternateLocale) => ({
        rel: "alternate",
        hreflang: alternateLocale,
        href: buildUrl(buildLocalizedPath(alternateLocale, page)),
      })),
      {
        rel: "alternate",
        hreflang: "x-default",
        href: buildUrl(buildLocalizedPath(DEFAULT_LOCALE, page)),
      },
    ],
  };
}
```

- [ ] **Step 2: Use metadata builder on home**

In `src/views/HomeView.vue`, remove the inline `siteUrl` and inline `link`/`meta` construction. Import:

```js
import { buildLocalizedHead } from "@/seo/meta";
```

Change the `useHead` call to:

```js
useHead(() => ({
  ...buildLocalizedHead({
    locale: locale.value,
    page: "home",
    t,
    path: `/${locale.value}/`,
  }),
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify(clinicJsonLd),
    },
  ],
}));
```

- [ ] **Step 3: Use metadata builder on legal pages**

In each legal page script, import `useRoute`, `buildLocalizedHead`, and `useHead` if missing:

```js
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useHead } from "@vueuse/head";
import { buildLocalizedHead } from "@/seo/meta";
```

Use this pattern in `PrivacyPolicyView.vue` with `page: "privacy"`, in `ImpressumView.vue` with `page: "impressum"`, and in `CookiePolicyView.vue` with `page: "cookies"`:

```js
const { t, locale } = useI18n();
const route = useRoute();
const page = "privacy";

useHead(() =>
  buildLocalizedHead({
    locale: locale.value,
    page,
    t,
    path: route.path,
  }),
);
```

- [ ] **Step 4: Extend validation**

Modify `scripts/validate-seo.mjs` so it asserts the generated `dist/index.html` contains the static fallback metadata:

```js
assert(indexHtml.includes('name="description"'), "dist/index.html must contain a meta description.");
assert(indexHtml.includes("Kinésithérapie Ingo Pauls"), "dist/index.html must contain the business name.");
```

- [ ] **Step 5: Verify**

Run:

```bash
npm run build:check
```

Expected:

```text
SEO validation passed.
```

- [ ] **Step 6: Commit**

```bash
git add src/seo/meta.js src/views/HomeView.vue src/views/PrivacyPolicyView.vue src/views/ImpressumView.vue src/views/CookiePolicyView.vue scripts/validate-seo.mjs
git commit -m "feat: add localized route metadata"
```

---

### Task 3: JSON-LD Entity Graph

**Files:**
- Create: `src/seo/schema.js`
- Modify: `src/views/HomeView.vue`
- Test: `scripts/validate-seo.mjs`

**Interfaces:**
- Consumes: `BUSINESS`, `OPENING_HOURS`, `LOCALES`, `buildUrl` from `src/seo/site.js`.
- Produces: `buildHomeJsonLd({ locale, t })`.

- [ ] **Step 1: Add schema builder**

Create `src/seo/schema.js`:

```js
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
  return value.replace(/<[^>]*>/g, "");
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
    const name = text(t, `team.members.${id}.name`);
    const role = text(t, `team.members.${id}.role`);
    const bullets = text(t, `team.members.${id}.bullets`);

    return {
      "@type": "Person",
      "@id": `${buildUrl(`/${locale}/`)}#person-${id}`,
      name,
      jobTitle: role,
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
```

- [ ] **Step 2: Replace inline home schema**

In `src/views/HomeView.vue`, remove the inline `clinicJsonLd` object and import:

```js
import { buildHomeJsonLd } from "@/seo/schema";
```

Change the script entry inside `useHead`:

```js
script: [
  {
    type: "application/ld+json",
    children: JSON.stringify(buildHomeJsonLd({ locale: locale.value, t })),
  },
],
```

- [ ] **Step 3: Extend validation for JSON-LD**

Modify `scripts/validate-seo.mjs`:

```js
assert(indexHtml.includes('application/ld+json') || indexHtml.includes("Kinésithérapie Ingo Pauls"), "generated HTML must expose structured business identity after prerender task.");
```

This assertion remains broad until Task 4 creates route-specific pre-rendered files.

- [ ] **Step 4: Verify**

Run:

```bash
npm run build:check
```

Expected:

```text
SEO validation passed.
```

- [ ] **Step 5: Commit**

```bash
git add src/seo/schema.js src/views/HomeView.vue scripts/validate-seo.mjs
git commit -m "feat: add seo entity graph"
```

---

### Task 4: Static Pre-Rendering

**Files:**
- Create: `scripts/prerender.mjs`
- Modify: `package.json`
- Test: `scripts/validate-seo.mjs`

**Interfaces:**
- Consumes: `ROUTES`, `buildUrl`, `DEFAULT_LOCALE` logic duplicated in Node-safe script form or imported from a Node-safe `.mjs` helper if the implementation splits constants.
- Produces: `dist/de/index.html`, `dist/fr/index.html`, `dist/lb/index.html`, `dist/en/index.html`, and matching legal page HTML files.

- [ ] **Step 1: Add pre-render script**

Create `scripts/prerender.mjs` with a deterministic post-build transform. It must read `dist/index.html`, clone it for each route, and inject route-specific static head tags. Do not render or alter the body content in this task.

```js
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const origin = (process.env.VITE_SITE_URL || "https://kine-diekirch.lu").replace(/\/$/, "");
const locales = ["de", "fr", "lb", "en"];

const homeMeta = {
  de: {
    title: "Kinésithérapie Ingo Pauls - Physiotherapie in Diekirch",
    description: "Willkommen bei Kinésithérapie Ingo Pauls in Diekirch. Wir bieten professionelle Physiotherapie für nachhaltige Schmerzlinderung und Beweglichkeit.",
  },
  fr: {
    title: "Kinésithérapie Ingo Pauls - Kinésithérapie à Diekirch",
    description: "Bienvenue chez Kinésithérapie Ingo Pauls à Diekirch. Nous offrons une kinésithérapie professionnelle pour un soulagement durable de la douleur et une meilleure mobilité.",
  },
  lb: {
    title: "Kinésithérapie Ingo Pauls - Kinésithérapie zu Dikkrech",
    description: "Wëllkomm bei der Kinésithérapie Ingo Pauls zu Dikkrech. Mir bidden professionell Kinésithérapie fir laangfristeg manner Péng a besser Beweglechkeet un.",
  },
  en: {
    title: "Physiotherapy Ingo Pauls - Physiotherapy in Diekirch",
    description: "Welcome to Physiotherapy Ingo Pauls in Diekirch. We offer professional physiotherapy for sustainable pain relief and mobility.",
  },
};

const legalTitles = {
  cookies: { de: "Cookie-Richtlinie", fr: "Politique des cookies", lb: "Cookie-Richtlinn", en: "Cookie Policy" },
  impressum: { de: "Impressum", fr: "Mentions légales", lb: "Impressum", en: "Legal Notice" },
  privacy: { de: "Datenschutz – Kinésithérapie Ingo Pauls", fr: "Politique de confidentialité", lb: "Dateschutz", en: "Privacy Policy" },
};

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function alternateLinks(page) {
  const suffix = page === "home" ? "/" : `/${page}`;
  const links = locales
    .map((locale) => `<link rel="alternate" hreflang="${locale}" href="${origin}/${locale}${suffix}">`)
    .join("\n  ");

  return `${links}\n  <link rel="alternate" hreflang="x-default" href="${origin}/de${suffix}">`;
}

function headForRoute({ locale, page, title, description, indexable }) {
  const path = page === "home" ? `/${locale}/` : `/${locale}/${page}`;
  const url = `${origin}${path}`;

  return [
    `<html lang="${locale}">`,
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
    `<meta name="twitter:card" content="summary">`,
    `<meta name="twitter:title" content="${escapeHtml(title)}">`,
    `<meta name="twitter:description" content="${escapeHtml(description)}">`,
    `<meta name="twitter:image" content="${origin}/images/logo.webp">`,
  ];
}

function injectHead(template, tags) {
  let html = template.replace(/<html lang="[^"]*">/, tags[0]);
  html = html.replace(/<title>[\s\S]*?<\/title>/, tags[1]);
  html = html.replace(/<meta name="description"[\s\S]*?>/, tags[2]);
  html = html.replace("</head>", `${tags.slice(3).join("\n  ")}\n</head>`);
  return html;
}

const distDir = join(process.cwd(), "dist");
const template = readFileSync(join(distDir, "index.html"), "utf8");

for (const locale of locales) {
  const meta = homeMeta[locale];
  const html = injectHead(template, headForRoute({ locale, page: "home", ...meta, indexable: true }));
  const file = join(distDir, locale, "index.html");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);

  for (const page of ["cookies", "impressum", "privacy"]) {
    const title = legalTitles[page][locale];
    const description = page === "impressum" ? "Kinésithérapie Ingo Pauls, 19, Rue Pierre Olinger, L-9264 Diekirch, Luxembourg" : title;
    const legalHtml = injectHead(template, headForRoute({ locale, page, title, description, indexable: page === "impressum" }));
    const legalFile = join(distDir, locale, page, "index.html");
    mkdirSync(dirname(legalFile), { recursive: true });
    writeFileSync(legalFile, legalHtml);
  }
}

console.log("Pre-rendered SEO route HTML.");
```

- [ ] **Step 2: Wire pre-render into build**

Modify `package.json` scripts:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "postbuild": "node scripts/prerender.mjs",
    "preview": "vite preview",
    "validate:seo": "node scripts/validate-seo.mjs",
    "build:check": "npm run build && npm run validate:seo"
  }
}
```

- [ ] **Step 3: Extend validation for route files**

Modify `scripts/validate-seo.mjs`:

```js
const routes = [
  ["de", "index.html"],
  ["fr", "index.html"],
  ["lb", "index.html"],
  ["en", "index.html"],
  ["de", "impressum", "index.html"],
  ["fr", "impressum", "index.html"],
  ["lb", "impressum", "index.html"],
  ["en", "impressum", "index.html"],
];

for (const parts of routes) {
  const file = join(distDir, ...parts);
  assert(existsSync(file), `${file} is missing.`);
  const html = readFileSync(file, "utf8");
  assert(html.includes("<title>"), `${file} is missing title.`);
  assert(html.includes('rel="canonical"'), `${file} is missing canonical.`);
  assert(html.includes('hreflang="x-default"'), `${file} is missing x-default hreflang.`);
}
```

- [ ] **Step 4: Verify**

Run:

```bash
npm run build:check
```

Expected:

```text
Pre-rendered SEO route HTML.
SEO validation passed.
```

- [ ] **Step 5: Commit**

```bash
git add package.json scripts/prerender.mjs scripts/validate-seo.mjs
git commit -m "feat: prerender seo route html"
```

---

### Task 5: Router 404 and Utility Page Indexing

**Files:**
- Create: `src/views/NotFoundView.vue`
- Modify: `src/router/index.js`
- Modify: `vercel.json`
- Test: `scripts/validate-seo.mjs`

**Interfaces:**
- Consumes: `buildLocalizedHead` from `src/seo/meta.js`.
- Produces: catch-all route with `noindex,follow`.

- [ ] **Step 1: Add non-invasive 404 view**

Create `src/views/NotFoundView.vue`:

```vue
<template>
  <section class="py-5 bg-white">
    <div class="container py-4" style="max-width: 900px;">
      <h1 class="fw-bold mb-3">404</h1>
    </div>
  </section>
</template>

<script setup>
import { useHead } from "@vueuse/head";

useHead({
  title: "404 – Kinésithérapie Ingo Pauls",
  meta: [{ name: "robots", content: "noindex,follow" }],
});
</script>
```

This adds only an error page for invalid URLs and does not change existing visible pages.

- [ ] **Step 2: Add catch-all route**

Modify `src/router/index.js`:

```js
import NotFoundView from "@/views/NotFoundView.vue";
```

Add this route at the end of `routes`:

```js
{ path: "/:pathMatch(.*)*", component: NotFoundView, meta: { locale: "de", page: "notFound" } },
```

- [ ] **Step 3: Keep Vercel SPA fallback**

Keep the current rewrite in `vercel.json` so direct visits still load the app. Do not add a blanket redirect. The router-level noindex route handles soft-404 risk for JS-rendered crawlers, and Task 4 provides static route files for known URLs.

- [ ] **Step 4: Verify**

Run:

```bash
npm run build:check
```

Expected:

```text
Pre-rendered SEO route HTML.
SEO validation passed.
```

- [ ] **Step 5: Commit**

```bash
git add src/views/NotFoundView.vue src/router/index.js vercel.json scripts/validate-seo.mjs
git commit -m "feat: add noindex not found route"
```

---

### Task 6: Sitemap and Robots Refinement

**Files:**
- Modify: `public/sitemap.xml`
- Modify: `public/robots.txt`
- Test: `scripts/validate-seo.mjs`

**Interfaces:**
- Consumes: canonical route strategy from Tasks 2 and 4.
- Produces: sitemap containing indexable routes only: language home pages and localized impressum pages.

- [ ] **Step 1: Update sitemap**

Modify `public/sitemap.xml` so it contains:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
  <url>
    <loc>https://kine-diekirch.lu/de/</loc>
    <xhtml:link rel="alternate" hreflang="de" href="https://kine-diekirch.lu/de/"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://kine-diekirch.lu/fr/"/>
    <xhtml:link rel="alternate" hreflang="lb" href="https://kine-diekirch.lu/lb/"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://kine-diekirch.lu/en/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://kine-diekirch.lu/de/"/>
  </url>
  <url>
    <loc>https://kine-diekirch.lu/fr/</loc>
    <xhtml:link rel="alternate" hreflang="de" href="https://kine-diekirch.lu/de/"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://kine-diekirch.lu/fr/"/>
    <xhtml:link rel="alternate" hreflang="lb" href="https://kine-diekirch.lu/lb/"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://kine-diekirch.lu/en/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://kine-diekirch.lu/de/"/>
  </url>
  <url>
    <loc>https://kine-diekirch.lu/lb/</loc>
    <xhtml:link rel="alternate" hreflang="de" href="https://kine-diekirch.lu/de/"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://kine-diekirch.lu/fr/"/>
    <xhtml:link rel="alternate" hreflang="lb" href="https://kine-diekirch.lu/lb/"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://kine-diekirch.lu/en/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://kine-diekirch.lu/de/"/>
  </url>
  <url>
    <loc>https://kine-diekirch.lu/en/</loc>
    <xhtml:link rel="alternate" hreflang="de" href="https://kine-diekirch.lu/de/"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://kine-diekirch.lu/fr/"/>
    <xhtml:link rel="alternate" hreflang="lb" href="https://kine-diekirch.lu/lb/"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://kine-diekirch.lu/en/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://kine-diekirch.lu/de/"/>
  </url>
  <url>
    <loc>https://kine-diekirch.lu/de/impressum</loc>
  </url>
  <url>
    <loc>https://kine-diekirch.lu/fr/impressum</loc>
  </url>
  <url>
    <loc>https://kine-diekirch.lu/lb/impressum</loc>
  </url>
  <url>
    <loc>https://kine-diekirch.lu/en/impressum</loc>
  </url>
</urlset>
```

- [ ] **Step 2: Keep robots simple**

Ensure `public/robots.txt` remains:

```text
User-agent: *
Allow: /

Sitemap: https://kine-diekirch.lu/sitemap.xml
```

- [ ] **Step 3: Validate sitemap references**

Extend `scripts/validate-seo.mjs`:

```js
const sitemap = readFileSync(join(process.cwd(), "public", "sitemap.xml"), "utf8");
assert(sitemap.includes("https://kine-diekirch.lu/de/"), "sitemap must include German home URL.");
assert(!sitemap.includes("/cookies</loc>"), "sitemap must not include noindex cookie pages.");
assert(!sitemap.includes("/privacy</loc>"), "sitemap must not include noindex privacy pages.");
```

- [ ] **Step 4: Verify**

Run:

```bash
npm run build:check
```

Expected:

```text
Pre-rendered SEO route HTML.
SEO validation passed.
```

- [ ] **Step 5: Commit**

```bash
git add public/sitemap.xml public/robots.txt scripts/validate-seo.mjs
git commit -m "chore: refine sitemap for indexable routes"
```

---

### Task 7: Final SEO/AEO Validation

**Files:**
- Modify: `scripts/validate-seo.mjs`
- No source UI changes.

**Interfaces:**
- Consumes: all previous task outputs.
- Produces: strict validation that can run locally and in deployment checks.

- [ ] **Step 1: Add strict route assertions**

Modify `scripts/validate-seo.mjs` so every pre-rendered home file must contain:

```js
const homeLocales = ["de", "fr", "lb", "en"];

for (const locale of homeLocales) {
  const file = join(distDir, locale, "index.html");
  const html = readFileSync(file, "utf8");

  assert(html.includes(`<html lang="${locale}">`), `${file} must set html lang.`);
  assert(html.includes('name="description"'), `${file} must include meta description.`);
  assert(html.includes('rel="canonical"'), `${file} must include canonical.`);
  assert(html.includes('hreflang="de"'), `${file} must include German alternate.`);
  assert(html.includes('hreflang="fr"'), `${file} must include French alternate.`);
  assert(html.includes('hreflang="lb"'), `${file} must include Luxembourgish alternate.`);
  assert(html.includes('hreflang="en"'), `${file} must include English alternate.`);
  assert(html.includes('hreflang="x-default"'), `${file} must include x-default alternate.`);
  assert(html.includes('property="og:title"'), `${file} must include Open Graph title.`);
  assert(html.includes('name="twitter:card"'), `${file} must include Twitter card.`);
}
```

- [ ] **Step 2: Add noindex assertions for utility pages**

```js
for (const locale of homeLocales) {
  for (const page of ["cookies", "privacy"]) {
    const file = join(distDir, locale, page, "index.html");
    const html = readFileSync(file, "utf8");
    assert(html.includes('name="robots" content="noindex,follow"'), `${file} must be noindex,follow.`);
  }
}
```

- [ ] **Step 3: Add build verification**

Run:

```bash
npm run build:check
```

Expected:

```text
Pre-rendered SEO route HTML.
SEO validation passed.
```

- [ ] **Step 4: Inspect generated HTML manually**

Run:

```bash
sed -n '1,80p' dist/de/index.html
sed -n '1,80p' dist/en/index.html
sed -n '1,80p' dist/de/privacy/index.html
```

Expected:

```text
The German and English home files have localized lang, title, description, canonical, hreflang, Open Graph, and Twitter tags.
The privacy page has noindex,follow.
No visible body content or layout markup is intentionally changed by the SEO/AEO tasks.
```

- [ ] **Step 5: Commit**

```bash
git add scripts/validate-seo.mjs
git commit -m "test: add strict seo validation"
```

---

## Self-Review

- Spec coverage: The plan covers no visible copy changes, no layout changes, metadata, Open Graph, Twitter metadata, JSON-LD entity graph, pre-rendering, sitemap cleanup, robots handling, utility page noindex, and 404 handling.
- Placeholder scan: The plan contains concrete files, commands, interfaces, and expected outcomes. It does not require a developer to invent route names, canonical strategy, schema object names, or validation commands.
- Type consistency: `buildLocalizedHead({ locale, page, t, path })`, `buildHomeJsonLd({ locale, t })`, `buildUrl(path)`, and `buildLocalizedPath(locale, page)` are defined before use and keep the same signatures across tasks.
