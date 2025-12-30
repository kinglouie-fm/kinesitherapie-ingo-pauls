<template>
  <header class="topbar w-100 z-3" :class="{ 'is-scrolled': isScrolled }">
    <div class="container py-3">
      <nav class="navbar navbar-expand-lg navbar-dark p-0">
        <RouterLink class="navbar-brand d-flex align-items-center gap-2" to="/">
          <img src="/images/logo.webp" alt="Logo" class="logo rounded-circle bg-white p-1 shadow-sm" />
        </RouterLink>

        <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav"
          aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div id="mainNav" class="collapse navbar-collapse">
          <ul class="navbar-nav ms-3 gap-lg-4">
            <li class="nav-item">
              <RouterLink class="nav-link text-white" to="/">{{ t("nav.home") }}</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link text-white" to="/#team">{{ t("nav.team") }}</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link text-white" to="/#leistungen">{{ t("nav.services") }}</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link text-white" to="/#kontakt">{{ t("nav.contact") }}</RouterLink>
            </li>
          </ul>

          <div class="ms-auto d-flex align-items-center gap-2">
            <button class="lang-btn" :class="{ active: locale === 'de' }" @click="setLocale('de')">
              DE
            </button>
            <button class="lang-btn" :class="{ active: locale === 'fr' }" @click="setLocale('fr')">
              FR
            </button>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { RouterLink } from "vue-router";
import { useI18n } from "@/i18n";

const { locale, setLocale, t } = useI18n();

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
.topbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  transition: background-color 200ms ease, box-shadow 200ms ease, backdrop-filter 200ms ease;
  background: transparent;
}

.topbar.is-scrolled {
  background: rgba(17, 24, 39, 0.75);
  /* dark glass */
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.logo {
  width: 70px;
  height: 70px;
}

.nav-link {
  font-weight: 500;
}

.nav-link:hover {
  transform: scale(1.05);
  text-decoration: underline;
  transition: transform 150ms ease;
}

.lang-btn {
  border: 1px solid rgba(255, 255, 255, 0.35);
  background: transparent;
  color: #fff;
  padding: 6px 10px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.8rem;
  transition: background 150ms ease, border-color 150ms ease;
}

.lang-btn:hover {
  border-color: rgba(255, 255, 255, 0.7);
}

.lang-btn.active {
  background: rgba(255, 255, 255, 0.18);
  border-color: rgba(255, 255, 255, 0.7);
}
</style>
