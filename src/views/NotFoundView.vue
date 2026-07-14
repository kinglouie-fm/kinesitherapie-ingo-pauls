<template>
    <section class="not-found-section bg-white">
        <div class="container py-5">
            <div class="not-found-card mx-auto text-center">
                <div class="not-found-code" aria-hidden="true">404</div>
                <h1 class="fw-bold mb-3">{{ t("notFound.title") }}</h1>
                <p class="text-muted mb-4 mx-auto not-found-text">
                    {{ t("notFound.text") }}
                </p>

                <div class="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                    <RouterLink class="btn btn-danger px-4" :to="homeTo">
                        {{ t("notFound.home") }}
                    </RouterLink>
                    <RouterLink class="btn btn-outline-dark px-4" :to="contactTo">
                        {{ t("notFound.contact") }}
                    </RouterLink>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { computed } from "vue";
import { RouterLink } from "vue-router";
import { useHead } from "@vueuse/head";
import { useI18n } from "@/i18n";

const { t, locale } = useI18n();

const homeTo = computed(() => `/${locale.value}/`);
const contactTo = computed(() => ({ path: `/${locale.value}/`, hash: "#kontakt" }));

useHead(() => ({
    title: `${t("notFound.title")} - Kinésithérapie Ingo Pauls`,
    meta: [{ name: "robots", content: "noindex,follow" }],
}));
</script>

<style scoped>
.not-found-section {
    min-height: 100vh;
    display: flex;
    align-items: center;
}

.not-found-card {
    max-width: 640px;
}

.not-found-code {
    color: rgba(227, 27, 35, 0.12);
    font-size: clamp(6rem, 18vw, 11rem);
    font-weight: 800;
    line-height: 0.85;
    margin-bottom: 1rem;
}

.not-found-text {
    max-width: 34rem;
    line-height: 1.7;
}
</style>
