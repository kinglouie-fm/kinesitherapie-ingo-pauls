<template>
  <Navbar />
  <RouterView />
</template>

<script setup>
import { RouterView } from 'vue-router'
import CookieBanner from './components/CookieBanner.vue'
import Navbar from './components/Navbar.vue'
</script>

<style>
</style>
