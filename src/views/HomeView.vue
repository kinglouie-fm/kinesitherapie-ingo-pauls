<template>
  <Navbar />

  <section id="home">
    <HeroView />
  </section>

  <section id="team">
    <TeamView />
  </section>

  <section id="leistungen">
    <ServicesView />
  </section>

  <section id="kontakt">
    <ContactView />
  </section>

  <section id="rezensionen">
    <ReviewsView />
  </section>

  <FooterView />
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
import HeroView from "@/views/HeroView.vue";
import TeamView from "@/views/TeamView.vue";
import ServicesView from "@/views/ServicesView.vue";
import ContactView from "@/views/ContactView.vue";
import ReviewsView from "@/views/ReviewsView.vue";
import FooterView from "@/views/FooterView.vue";
import { useHead } from "@vueuse/head";
import { useI18n } from "@/i18n";

const { t, locale } = useI18n();
const siteUrl = import.meta.env.VITE_SITE_URL;

useHead(() => ({
  htmlAttrs: { lang: locale.value },
  title: t("seo.home.title"),
  meta: [
    { name: "description", content: t("seo.home.description") },
  ],
  link: [
    { rel: "canonical", href: `${siteUrl}/${locale.value}/` },

    { rel: "alternate", hreflang: "de", href: `${siteUrl}/de/` },
    { rel: "alternate", hreflang: "fr", href: `${siteUrl}/fr/` },
    { rel: "alternate", hreflang: "lb", href: `${siteUrl}/lb/` },
    { rel: "alternate", hreflang: "en", href: `${siteUrl}/en/` },
    { rel: "alternate", hreflang: "x-default", href: `${siteUrl}/de/` },
  ],
}));

</script>

<style scoped></style>
