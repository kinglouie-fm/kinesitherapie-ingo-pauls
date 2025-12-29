<template>
  <header
    class="topbar w-100 z-3"
    :class="{ 'is-scrolled': isScrolled }"
  >
    <div class="container py-3">
      <nav class="navbar navbar-expand-lg navbar-dark p-0">
        <RouterLink class="navbar-brand d-flex align-items-center gap-2" to="/">
          <img
            src="/images/logo.webp"
            alt="Logo"
            width="44"
            height="44"
            class="rounded-circle bg-white p-1 shadow-sm"
          />
        </RouterLink>

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
import { ref, onMounted, onBeforeUnmount } from "vue";
import { RouterLink } from "vue-router";

const isScrolled = ref(false);

function onScroll() {
  isScrolled.value = window.scrollY > 20; // threshold
}

onMounted(() => {
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll);
});
</script>

<style scoped>
/* Always on top and follows the scroll */
.topbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  transition: background-color 200ms ease, box-shadow 200ms ease, backdrop-filter 200ms ease;
  background: transparent;
}

/* After scroll: readable background */
.topbar.is-scrolled {
  background: rgba(17, 24, 39, 0.75); /* dark glass */
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

/* Bootstrap doesn't include text-white-75 by default */
.text-white-75 {
  color: rgba(255, 255, 255, 0.85) !important;
}
.text-white-75:hover {
  color: rgba(255, 255, 255, 1) !important;
}
</style>
