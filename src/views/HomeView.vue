<template>
  <Navbar />
  <HeroView />
  <TeamView />
  <ServicesView />
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
import HeroView from "@/views/HeroView.vue";
import TeamView from "@/views/TeamView.vue";
import ServicesView from "@/views/ServicesView.vue";
</script>

<style scoped>
.hero {
  min-height: 100vh;
  background-image: url("@/assets/images/hero.png");
  background-size: cover;
  background-position: center;
  overflow: hidden;
}

.hero-overlay {
  z-index: 1;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.65) 0%,
    rgba(0, 0, 0, 0.35) 45%,
    rgba(0, 0, 0, 0.12) 70%,
    rgba(0, 0, 0, 0) 100%
  );
}

.hero-title {
  text-shadow: 0 18px 40px rgba(0, 0, 0, 0.35);
}

.hero-subtitle {
  color: rgba(255, 255, 255, 0.78);
  font-size: 0.9rem;
  line-height: 1.6;
  max-width: 28rem;
}

.hero-btn {
  box-shadow: 0 10px 25px rgba(227, 27, 35, 0.25);
}
</style>
