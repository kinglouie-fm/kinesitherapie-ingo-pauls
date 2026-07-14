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
assert(indexHtml.includes('name="description"'), "dist/index.html must contain a meta description.");
assert(indexHtml.includes("Kinésithérapie Ingo Pauls"), "dist/index.html must contain the business name.");

const homeLocales = ["de", "fr", "lb", "en"];

for (const locale of homeLocales) {
  const file = join(distDir, locale, "index.html");
  assert(existsSync(file), `${file} is missing.`);

  const html = readFileSync(file, "utf8");
  assert(html.includes(`<html lang="${locale}">`), `${file} must set html lang.`);
  assert(html.includes("<title>"), `${file} is missing title.`);
  assert(html.includes('name="description"'), `${file} must include meta description.`);
  assert(html.includes('name="robots" content="index,follow"'), `${file} must be index,follow.`);
  assert(html.includes('rel="canonical"'), `${file} must include canonical.`);
  assert(html.includes('hreflang="de"'), `${file} must include German alternate.`);
  assert(html.includes('hreflang="fr"'), `${file} must include French alternate.`);
  assert(html.includes('hreflang="lb"'), `${file} must include Luxembourgish alternate.`);
  assert(html.includes('hreflang="en"'), `${file} must include English alternate.`);
  assert(html.includes('hreflang="x-default"'), `${file} must include x-default alternate.`);
  assert(html.includes('property="og:title"'), `${file} must include Open Graph title.`);
  assert(html.includes('name="twitter:card"'), `${file} must include Twitter card.`);
  assert(html.includes('application/ld+json'), `${file} must include JSON-LD.`);
  assert(html.includes("MedicalClinic"), `${file} must include MedicalClinic schema.`);

  const impressum = join(distDir, locale, "impressum", "index.html");
  assert(existsSync(impressum), `${impressum} is missing.`);
  const impressumHtml = readFileSync(impressum, "utf8");
  assert(impressumHtml.includes('name="robots" content="index,follow"'), `${impressum} must be index,follow.`);

  for (const page of ["cookies", "privacy"]) {
    const utilityFile = join(distDir, locale, page, "index.html");
    assert(existsSync(utilityFile), `${utilityFile} is missing.`);
    const utilityHtml = readFileSync(utilityFile, "utf8");
    assert(utilityHtml.includes('name="robots" content="noindex,follow"'), `${utilityFile} must be noindex,follow.`);
  }
}

const sitemap = readFileSync(join(process.cwd(), "public", "sitemap.xml"), "utf8");
assert(sitemap.includes("https://kine-diekirch.lu/de/"), "sitemap must include German home URL.");
assert(sitemap.includes("https://kine-diekirch.lu/en/impressum"), "sitemap must include English impressum URL.");
assert(!sitemap.includes("/cookies</loc>"), "sitemap must not include noindex cookie pages.");
assert(!sitemap.includes("/privacy</loc>"), "sitemap must not include noindex privacy pages.");

const routerSource = readFileSync(join(process.cwd(), "src", "router", "index.js"), "utf8");
assert(
  !routerSource.includes('{ path: "/:pathMatch(.*)*", component: NotFoundView, meta: { locale: "de"'),
  "not found route must not force German locale.",
);

for (const locale of homeLocales) {
  const localeFile = join(process.cwd(), "src", "locales", `${locale}.json`);
  const messages = JSON.parse(readFileSync(localeFile, "utf8"));
  assert(messages.notFound?.title, `${localeFile} must define notFound.title.`);
  assert(messages.notFound?.text, `${localeFile} must define notFound.text.`);
  assert(messages.notFound?.home, `${localeFile} must define notFound.home.`);
  assert(messages.notFound?.contact, `${localeFile} must define notFound.contact.`);
}

console.log("SEO validation passed.");
