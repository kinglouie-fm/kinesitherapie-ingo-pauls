<template>
  <header class="topbar w-100 z-3" :class="{
    'is-scrolled': isScrolled,
    'is-hidden': isNavbarHidden
  }">
    <div class="container py-3">
      <nav ref="navRef" class="navbar navbar-expand-lg navbar-dark p-0">
        <RouterLink class="navbar-brand d-flex align-items-center gap-2 ms-3 ms-lg-0" :to="homeTo">
          <img src="/images/logo.webp" alt="Logo" class="logo rounded-circle bg-white p-1 shadow-sm" />
        </RouterLink>

        <button ref="togglerRef" class="navbar-toggler border-0" type="button" data-bs-toggle="collapse"
          data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div id="mainNav" ref="collapseRef" class="collapse navbar-collapse align-items-lg-center">
          <ul class="navbar-nav ms-5 gap-lg-4 text-end align-items-lg-center">
            <li class="nav-item">
              <RouterLink class="nav-link text-white" :to="homeTo" @click="closeMenu">
                {{ t("nav.home") }}
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link text-white" :to="hashTo('#team')" @click="closeMenu">
                {{ t("nav.team") }}
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link text-white" :to="hashTo('#leistungen')" @click="closeMenu">
                {{ t("nav.services") }}
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link text-white" :to="hashTo('#kontakt')" @click="closeMenu">
                {{ t("nav.contact") }}
              </RouterLink>
            </li>
          </ul>

          <div class="ms-auto d-flex justify-content-end align-items-center gap-2 mt-3 mt-lg-0">
            <button class="lang-btn" :class="{ active: locale === 'lb' }" @click="setLocaleAndClose('lb')">LU</button>
            <button class="lang-btn" :class="{ active: locale === 'de' }" @click="setLocaleAndClose('de')">DE</button>
            <button class="lang-btn" :class="{ active: locale === 'fr' }" @click="setLocaleAndClose('fr')">FR</button>
            <button class="lang-btn" :class="{ active: locale === 'en' }" @click="setLocaleAndClose('en')">EN</button>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { computed, ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import { RouterLink, useRouter, useRoute } from "vue-router";
import { useI18n } from "@/i18n";
import { Collapse } from "bootstrap";

const router = useRouter();
const route = useRoute();

const { locale, setLocale, t } = useI18n();

const homeTo = computed(() => `/${locale.value}/`);
const hashTo = (hash) => ({ path: `/${locale.value}/`, hash });

const isScrolled = ref(false);
const isNavbarHidden = ref(false);

const togglerRef = ref(null);
const collapseRef = ref(null);

let bsCollapse = null;
let lastScrollY = 0;

function isDesktop() {
  return window.matchMedia("(min-width: 992px)").matches;
}

function onScroll() {
  const currentY = window.scrollY;

  isScrolled.value = currentY > 20;

  if (!isDesktop()) {
    isNavbarHidden.value = false;
    lastScrollY = currentY;
    return;
  }

  const scrollingDown = currentY > lastScrollY;
  const scrollingUp = currentY < lastScrollY;

  if (scrollingDown && currentY > 120) {
    isNavbarHidden.value = true;
  }

  if (scrollingUp) {
    isNavbarHidden.value = false;
  }

  lastScrollY = currentY;
}

function isMobile() {
  return !window.matchMedia("(min-width: 992px)").matches;
}

function closeMenu() {
  if (!isMobile()) return;
  bsCollapse?.hide();
}

function onDocumentClick(e) {
  if (!isMobile()) return;
  if (!collapseRef.value || !togglerRef.value) return;

  const isOpen = collapseRef.value.classList.contains("show");
  if (!isOpen) return;

  const target = e.target;

  if (togglerRef.value.contains(target)) return;
  if (collapseRef.value.contains(target)) return;

  closeMenu();
}

async function setLocaleAndClose(l) {
  setLocale(l);
  await router.push({ path: `/${l}/`, hash: route.hash });
  await nextTick();
  closeMenu();
}

onMounted(async () => {
  lastScrollY = window.scrollY;
  onScroll();

  window.addEventListener("scroll", onScroll, { passive: true });

  await nextTick();

  if (collapseRef.value) {
    bsCollapse = Collapse.getOrCreateInstance(collapseRef.value, { toggle: false });
  }

  document.addEventListener("click", onDocumentClick, true);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll);
  document.removeEventListener("click", onDocumentClick, true);

  bsCollapse?.dispose();
  bsCollapse = null;
});
</script>

<style scoped>
.topbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  transition:
    background-color 200ms ease,
    box-shadow 200ms ease,
    backdrop-filter 200ms ease,
    transform 250ms ease,
    opacity 250ms ease;
  background: transparent;
}

.topbar.is-scrolled {
  background: rgba(17, 24, 39, 0.75);
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

/* Logo */
.logo {
  width: 65px;
  height: 65px;
}

.navbar-toggler-icon {
  --bs-navbar-toggler-icon-bg: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(255,255,255,1)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}

.nav-link {
  font-weight: 500;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 18px;
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
  border-color: rgba(186, 136, 136, 0.7);
}

.nav-link {
  position: relative;
  color: white;
  text-decoration: none;
}

@media (max-width: 992px) {

  .topbar:has(#mainNav.collapsing),
  .topbar:has(#mainNav.show) {
    background: rgba(17, 24, 39, 0.75);
    backdrop-filter: blur(10px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  }

  .nav-link {
    font-size: 16px;
  }
}

@media (min-width: 992px) {
  .topbar.is-hidden {
    transform: translateY(-100%);
    opacity: 0;
    pointer-events: none;
  }

  .navbar-collapse {
    align-items: center;
  }

  .navbar-nav {
    align-items: center;
  }

  .navbar-brand {
    padding-top: 0;
    padding-bottom: 0;
  }

  .nav-link {
    display: flex;
    align-items: center;
    padding-bottom: 10px;
  }

  .nav-link::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 0;
    height: 2px;
    background-color: white;
    transition: width 0.3s ease;
  }

  .nav-link:hover::after {
    width: 100%;
  }
}
</style>