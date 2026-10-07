<template>
  <Analytics />
  <RouterView />
  <CookieBanner />
</template>

<script setup>
import { RouterView } from 'vue-router'
import CookieBanner from "@/components/CookieBanner.vue";
import { Analytics } from "@vercel/analytics/vue"
</script>

<style></style>
