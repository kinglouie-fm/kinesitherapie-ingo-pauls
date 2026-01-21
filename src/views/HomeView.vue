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

const clinicJsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  "name": "Kinésithérapie Ingo Pauls",
  "url": "https://kine-diekirch.lu/",
  "telephone": "+35226803831",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "19, Rue Pierre Olinger",
    "postalCode": "9264",
    "addressLocality": "Diekirch",
    "addressCountry": "LU"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 49.86331850247848,
    "longitude": 6.162371199360393
  },
  "medicalSpecialty": "https://schema.org/Physiotherapy",
  "openingHoursSpecification": [
    { "@type": "OpeningHoursSpecification", "dayOfWeek": "Monday", "opens": "06:40", "closes": "12:00" },
    { "@type": "OpeningHoursSpecification", "dayOfWeek": "Monday", "opens": "13:00", "closes": "19:00" },

    { "@type": "OpeningHoursSpecification", "dayOfWeek": "Tuesday", "opens": "06:40", "closes": "12:00" },
    { "@type": "OpeningHoursSpecification", "dayOfWeek": "Tuesday", "opens": "13:00", "closes": "19:00" },

    { "@type": "OpeningHoursSpecification", "dayOfWeek": "Wednesday", "opens": "07:30", "closes": "12:00" },
    { "@type": "OpeningHoursSpecification", "dayOfWeek": "Wednesday", "opens": "13:00", "closes": "19:00" },

    { "@type": "OpeningHoursSpecification", "dayOfWeek": "Thursday", "opens": "06:40", "closes": "12:00" },
    { "@type": "OpeningHoursSpecification", "dayOfWeek": "Thursday", "opens": "13:00", "closes": "19:00" },

    { "@type": "OpeningHoursSpecification", "dayOfWeek": "Friday", "opens": "06:40", "closes": "12:00" },
    { "@type": "OpeningHoursSpecification", "dayOfWeek": "Friday", "opens": "13:00", "closes": "19:00" }
  ]
};

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
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify(clinicJsonLd)
    }
  ]
}));

</script>

<style scoped></style>
