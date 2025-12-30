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
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
import HeroView from "@/views/HeroView.vue";
import TeamView from "@/views/TeamView.vue";
import ServicesView from "@/views/ServicesView.vue";
import ContactView from "@/views/ContactView.vue";
import ReviewsView from "@/views/ReviewsView.vue";
</script>

<style scoped>
</style>
