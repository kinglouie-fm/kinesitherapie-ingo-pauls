<template>
    <div class="ratio ratio-16x9 rounded overflow-hidden shadow-sm">
        <!-- Placeholder until consent -->
        <div v-if="!allowExternal"
            class="map-placeholder d-flex flex-column justify-content-center align-items-center text-center p-3">
            <div class="fw-bold mb-2">{{ t("cookies.map.title") }}</div>
            <div class="small text-muted mb-3" style="max-width: 520px;">
                {{ t("cookies.map.text") }}
            </div>

            <div class="d-flex flex-wrap gap-2 justify-content-center">
                <button class="btn btn-danger btn-sm" @click="enableMaps()">
                    {{ t("cookies.map.cta") }}
                </button>
                <button class="btn btn-outline-secondary btn-sm" @click="rejectAll()">
                    {{ t("cookies.map.reject") }}
                </button>
            </div>
        </div>

        <!-- Real map only after consent -->
        <iframe v-else :src="src" class="w-100 h-100 border-0" style="border:0;" allowfullscreen loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
</template>

<script setup>
import { useI18n } from "@/i18n";
import { useConsent } from "@/consent";

const { t } = useI18n();
const { consent, allowExternal, savePreferences, rejectAll } = useConsent();

function enableMaps() {
    // Keep current choice for analytics, only enable external content (maps)
    savePreferences({
        external: true,
        analytics: !!consent.value?.analytics,
    });
}

const src =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2571.899536869048!2d6.159721177010478!3d49.86313177148594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bffd8e54e9b281%3A0xb84f2b141d0b77fa!2sKin%C3%A9sith%C3%A9rapie%20Pauls%20Ingo!5e0!3m2!1sen!2slu!4v1768896970411!5m2!1sen!2slu";
</script>

<style scoped>
.map-placeholder {
    width: 100%;
    height: 100%;
    background: #f3f4f6;
}
</style>
