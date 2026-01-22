import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import CookiePolicyView from "@/views/CookiePolicyView.vue";
import ImpressumView from "@/views/ImpressumView.vue";
import { setLocaleFromRoute } from "@/i18n";

const routes = [
  { path: "/", redirect: "/de/" },
  { path: "/de/", component: HomeView, meta: { locale: "de" } },
  { path: "/fr/", component: HomeView, meta: { locale: "fr" } },
  { path: "/lb/", component: HomeView, meta: { locale: "lb" } },
  { path: "/en/", component: HomeView, meta: { locale: "en" } },

  { path: "/de/cookies", component: CookiePolicyView, meta: { locale: "de" } },
  { path: "/fr/cookies", component: CookiePolicyView, meta: { locale: "fr" } },
  { path: "/lb/cookies", component: CookiePolicyView, meta: { locale: "lb" } },
  { path: "/en/cookies", component: CookiePolicyView, meta: { locale: "en" } },

  { path: "/de/impressum", component: ImpressumView, meta: { locale: "de" } },
  { path: "/fr/impressum", component: ImpressumView, meta: { locale: "fr" } },
  { path: "/lb/impressum", component: ImpressumView, meta: { locale: "lb" } },
  { path: "/en/impressum", component: ImpressumView, meta: { locale: "en" } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, behavior: "smooth", top: 112 };
    return { top: 0 };
  },
});

router.beforeEach((to) => {
  const locale = to.meta.locale;
  if (locale) setLocaleFromRoute(locale);
});

export default router;