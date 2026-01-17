import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import { setLocaleFromRoute } from "@/i18n";

const routes = [
  { path: "/", redirect: "/de/" },
  { path: "/de/", component: HomeView, meta: { locale: "de" } },
  { path: "/fr/", component: HomeView, meta: { locale: "fr" } },
  { path: "/lb/", component: HomeView, meta: { locale: "lb" } },
  { path: "/en/", component: HomeView, meta: { locale: "en" } },
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