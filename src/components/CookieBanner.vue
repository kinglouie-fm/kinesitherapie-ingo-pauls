<template>
    <div v-if="!hasDecision" class="cookie-banner border-top">
        <div class="container py-3">
            <div class="d-flex flex-column flex-lg-row gap-3 align-items-lg-center justify-content-between">
                <div class="cookie-text">
                    <div class="fw-bold mb-1">{{ t("cookies.banner.title") }}</div>
                    <div class="small">
                        {{ t("cookies.banner.text") }}
                        <RouterLink :to="cookiesPage" class="cookie-link ms-1">
                            {{ t("cookies.banner.learnMore") }}
                        </RouterLink>
                    </div>
                </div>

                <div class="d-flex flex-wrap gap-2 justify-content-lg-end">
                    <button class="btn btn-outline-light btn-sm" @click="open = true">
                        {{ t("cookies.banner.settings") }}
                    </button>

                    <button class="btn btn-outline-light btn-sm" @click="rejectAll()">
                        {{ t("cookies.banner.reject") }}
                    </button>

                    <button class="btn btn-danger btn-sm" @click="acceptAll()">
                        {{ t("cookies.banner.accept") }}
                    </button>
                </div>

            </div>
        </div>

        <!-- Settings modal (Bootstrap-like simple modal) -->
        <div v-if="open" class="cookie-modal-backdrop" @click.self="open = false">
            <div class="cookie-modal">
                <div class="d-flex justify-content-between align-items-start gap-3">
                    <div>
                        <div class="fw-bold">{{ t("cookies.settings.title") }}</div>
                        <div class="small text-muted">{{ t("cookies.settings.subtitle") }}</div>
                    </div>
                    <button class="btn btn-sm btn-outline-secondary" @click="open = false">
                        {{ t("cookies.settings.close") }}
                    </button>
                </div>

                <hr class="my-3" />

                <div class="d-grid gap-3">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <div class="fw-semibold">{{ t("cookies.settings.necessary.title") }}</div>
                            <div class="small text-muted">{{ t("cookies.settings.necessary.text") }}</div>
                        </div>
                        <input type="checkbox" checked disabled />
                    </div>

                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <div class="fw-semibold">{{ t("cookies.settings.external.title") }}</div>
                            <div class="small text-muted">{{ t("cookies.settings.external.text") }}</div>
                        </div>
                        <input type="checkbox" v-model="prefs.external" />
                    </div>

                    <!-- <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <div class="fw-semibold">{{ t("cookies.settings.analytics.title") }}</div>
                            <div class="small text-muted">{{ t("cookies.settings.analytics.text") }}</div>
                        </div>
                        <input type="checkbox" v-model="prefs.analytics" />
                    </div> -->
                </div>

                <div class="d-flex gap-2 justify-content-end mt-4">
                    <button class="btn btn-outline-secondary btn-sm" @click="rejectAll(); open = false">
                        {{ t("cookies.settings.rejectAll") }}
                    </button>

                    <button class="btn btn-danger btn-sm" @click="save(); open = false">
                        {{ t("cookies.settings.save") }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, reactive, ref, watchEffect } from "vue";
import { useI18n } from "@/i18n";
import { useConsent } from "@/consent";

const { t, locale } = useI18n();

const {
    consent,
    hasDecision,
    acceptAll,
    rejectAll,
    savePreferences,
} = useConsent();

const open = ref(false);

const prefs = reactive({
    external: false,
    analytics: false,
});

watchEffect(() => {
    prefs.external = !!consent.value?.external;
    prefs.analytics = !!consent.value?.analytics;
});

function save() {
    savePreferences({ external: prefs.external, analytics: prefs.analytics });
}

const cookiesPage = computed(() => `/${locale.value}/cookies`);
</script>

<style scoped>
.cookie-banner {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(17, 24, 39, 0.98);
    color: rgba(255, 255, 255, 0.9);
    z-index: 9999;
}

.cookie-link {
    color: #fff;
    text-decoration: underline;
}

.cookie-modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.55);
    display: grid;
    place-items: center;
    padding: 16px;
}

.cookie-modal {
    width: 100%;
    max-width: 640px;
    background: #fff;
    color: #111827;
    border-radius: 14px;
    padding: 16px;
}
</style>
