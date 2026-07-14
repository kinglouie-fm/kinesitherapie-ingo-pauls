import {
  BUSINESS,
  DEFAULT_LOCALE,
  LOCALES,
  buildLocalizedPath,
  buildUrl,
} from "./site";

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
