import { computed, reactive } from "vue";
import de from "@/locales/de.json";
import fr from "@/locales/fr.json";

const messages = { de, fr };

const state = reactive({
  locale: localStorage.getItem("locale") || "de",
});

function setLocale(locale) {
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
  return {
    locale: computed(() => state.locale),
    setLocale,
    t,
  };
}
