import { computed, reactive } from "vue";

const KEY = "cookie_consent_v1";

const state = reactive({
  consent: null, 
});

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    state.consent = raw ? JSON.parse(raw) : null;
  } catch {
    state.consent = null;
  }
}

function save(consent) {
  state.consent = consent;
  localStorage.setItem(KEY, JSON.stringify(consent));
}

export function acceptAll() {
  save({
    necessary: true,
    external: true,   
    analytics: false, 
    updatedAt: new Date().toISOString(),
  });
}

export function rejectAll() {
  save({
    necessary: true,
    external: false,
    analytics: false,
    updatedAt: new Date().toISOString(),
  });
}

export function savePreferences({ external, analytics }) {
  save({
    necessary: true,
    external: !!external,
    analytics: !!analytics,
    updatedAt: new Date().toISOString(),
  });
}

export function resetConsent() {
  localStorage.removeItem(KEY);
  state.consent = null;
}

export function useConsent() {
  if (state.consent === null) load();

  return {
    consent: computed(() => state.consent),
    hasDecision: computed(() => state.consent !== null),
    allowExternal: computed(() => !!state.consent?.external),
    allowAnalytics: computed(() => !!state.consent?.analytics),
    acceptAll,
    rejectAll,
    savePreferences,
    resetConsent,
  };
}
