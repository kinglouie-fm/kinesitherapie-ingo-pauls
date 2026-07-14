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
import { buildLocalizedHead } from "@/seo/meta";
import { buildHomeJsonLd } from "@/seo/schema";

const { t, locale } = useI18n();

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
      children: JSON.stringify(buildHomeJsonLd({ locale: locale.value, t }))
    }
  ]
}));

</script>

<style scoped></style>
