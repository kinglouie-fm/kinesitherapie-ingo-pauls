<template>
  <header class="position-absolute top-0 start-0 w-100 z-3">
    <div class="container py-3">
      <nav class="navbar navbar-expand-lg navbar-dark bg-transparent p-0">
        <a class="navbar-brand d-flex align-items-center gap-2" href="#">
          <img
            src="/images/logo.webp"
            alt="Logo"
            width="44"
            height="44"
            class="rounded-circle bg-white p-1 shadow-sm"
          />
        </a>

        <button
          class="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div id="mainNav" class="collapse navbar-collapse">
          <ul class="navbar-nav ms-3 gap-lg-3">
            <li class="nav-item">
              <RouterLink class="nav-link text-white-75" to="/">Startseite</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link text-white-75" to="/team">Unser Team</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link text-white-75" to="/leistungen">Leistungen</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link text-white-75" to="/kontakt">Kontakt</RouterLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { RouterLink, useRouter } from 'vue-router'
</script>

<style scoped>
/* Bootstrap doesn't include text-white-75 by default */
.text-white-75 {
  color: rgba(255, 255, 255, 0.85) !important;
}
.text-white-75:hover {
  color: rgba(255, 255, 255, 1) !important;
}
</style>
