import { computed, reactive } from "vue";
import de from "@/locales/de.json";
import fr from "@/locales/fr.json";
import lb from "@/locales/lb.json";
import en from "@/locales/en.json";

const messages = { de, fr, lb, en };

const state = reactive({
  locale: "de",
});

function setLocale(locale) {
  state.locale = locale;
  localStorage.setItem("locale", locale);
}

export function setLocaleFromRoute(locale) {
  state.locale = locale;
  localStorage.setItem("locale", locale);
}

function getByPath(obj, path) {
  return path.split(".").reduce((acc, key) => (acc ? acc[key] : undefined), obj);
}

function t(key) {
  const msg = messages[state.locale] || messages.de;
  return getByPath(msg, key) ?? key;
}

export function useI18n() {
  return { locale: computed(() => state.locale), setLocale, t };
}