<template>
    <section class="py-5 bg-white">
        <div class="container py-4" style="max-width: 900px;">
            <div class="mb-3">
                <button class="btn btn-link p-0 text-decoration-none" @click="$router.back()">
                    {{ t("cookies.page.back") }}
                </button>
            </div>
            <h1 class="fw-bold mb-3">{{ t("cookies.page.title") }}</h1>
            <p class="text-muted">{{ t("cookies.page.intro") }}</p>

            <h2 class="fw-bold mt-4 mb-2 h4">{{ t("cookies.page.typesTitle") }}</h2>
            <ul class="text-muted">
                <li><strong>{{ t("cookies.page.necessaryTitle") }}</strong> – {{ t("cookies.page.necessaryText") }}</li>
                <li><strong>{{ t("cookies.page.externalTitle") }}</strong> – {{ t("cookies.page.externalText") }}</li>
                <!-- <li><strong>{{ t("cookies.page.analyticsTitle") }}</strong> – {{ t("cookies.page.analyticsText") }}</li> -->
            </ul>

            <h2 class="fw-bold mt-4 mb-2 h4">{{ t("cookies.page.manageTitle") }}</h2>
            <p class="text-muted mb-3">{{ t("cookies.page.manageText") }}</p>

            <div class="d-flex flex-wrap gap-2">
                <button class="btn btn-outline-secondary btn-sm" @click="resetConsent()">
                    {{ t("cookies.page.reset") }}
                </button>
                <button class="btn btn-danger btn-sm" @click="acceptAll()">
                    {{ t("cookies.page.acceptAll") }}
                </button>
                <button class="btn btn-outline-dark btn-sm" @click="rejectAll()">
                    {{ t("cookies.page.rejectAll") }}
                </button>
            </div>
        </div>
    </section>
</template>

<script setup>
import { useI18n } from "@/i18n";
import { useConsent } from "@/consent";

const { t } = useI18n();

const { acceptAll, rejectAll, resetConsent } = useConsent();
</script>
