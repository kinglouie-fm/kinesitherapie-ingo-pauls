<template>
    <section class="py-5 bg-white">
        <div class="container py-4" style="max-width: 900px;">
            <div class="mb-3">
                <button class="btn btn-link p-0 text-decoration-none" @click="$router.back()">
                    {{ t("privacy.back") }}
                </button>
            </div>

            <h1 class="fw-bold mb-3">{{ t("privacy.title") }}</h1>
            <p class="text-muted">{{ t("privacy.intro") }}</p>

            <h2 class="fw-bold mt-4 mb-2 h4">{{ t("privacy.controller.title") }}</h2>
            <p class="text-muted mb-0">
                <strong>{{ t("privacy.controller.nameLabel") }}</strong> {{ t("privacy.controller.name") }}<br />
                <strong>{{ t("privacy.controller.addressLabel") }}</strong> {{ t("privacy.controller.address") }}<br />
                <strong>{{ t("privacy.controller.phoneLabel") }}</strong> <a
                    :href="`tel:${t('privacy.controller.phoneRaw')}`">{{ t("privacy.controller.phone") }}</a>
            </p>

            <h2 class="fw-bold mt-4 mb-2 h4">{{ t("privacy.hosting.title") }}</h2>
            <p class="text-muted mb-2">{{ t("privacy.hosting.text") }}</p>
            <ul class="text-muted">
                <li>{{ t("privacy.hosting.provider") }}</li>
                <li>{{ t("privacy.hosting.purpose") }}</li>
                <li>{{ t("privacy.hosting.legal") }}</li>
            </ul>

            <h2 class="fw-bold mt-4 mb-2 h4">{{ t("privacy.logs.title") }}</h2>
            <p class="text-muted mb-2">{{ t("privacy.logs.text") }}</p>
            <ul class="text-muted">
                <li>{{ t("privacy.logs.items.ip") }}</li>
                <li>{{ t("privacy.logs.items.time") }}</li>
                <li>{{ t("privacy.logs.items.userAgent") }}</li>
                <li>{{ t("privacy.logs.items.referrer") }}</li>
            </ul>

            <h2 class="fw-bold mt-4 mb-2 h4">{{ t("privacy.cookies.title") }}</h2>
            <p class="text-muted mb-2">{{ t("privacy.cookies.text") }}</p>

            <h2 class="fw-bold mt-4 mb-2 h4">{{ t("privacy.external.title") }}</h2>
            <p class="text-muted mb-2">{{ t("privacy.external.text") }}</p>
            <ul class="text-muted">
                <li>{{ t("privacy.external.googleMaps") }}</li>
                <li>{{ t("privacy.external.consent") }}</li>
                <li>{{ t("privacy.external.withdraw") }}</li>
            </ul>

            <h2 class="fw-bold mt-4 mb-2 h4">{{ t("privacy.contact.title") }}</h2>
            <p class="text-muted mb-2">{{ t("privacy.contact.text") }}</p>

            <h2 class="fw-bold mt-4 mb-2 h4">{{ t("privacy.rights.title") }}</h2>
            <p class="text-muted mb-2">{{ t("privacy.rights.text") }}</p>
            <ul class="text-muted">
                <li>{{ t("privacy.rights.items.access") }}</li>
                <li>{{ t("privacy.rights.items.rectification") }}</li>
                <li>{{ t("privacy.rights.items.erasure") }}</li>
                <li>{{ t("privacy.rights.items.restriction") }}</li>
                <li>{{ t("privacy.rights.items.objection") }}</li>
                <li>{{ t("privacy.rights.items.portability") }}</li>
                <li>{{ t("privacy.rights.items.withdraw") }}</li>
            </ul>

            <h2 class="fw-bold mt-4 mb-2 h4">{{ t("privacy.cnpd.title") }}</h2>
            <p class="text-muted mb-0">
                {{ t("privacy.cnpd.text") }}<br />
                <strong>{{ t("privacy.cnpd.name") }}</strong><br />
                {{ t("privacy.cnpd.address") }}<br />
                {{ t("privacy.cnpd.emailLabel") }} <a href="mailto:info@cnpd.lu">info@cnpd.lu</a>
            </p>

            <p class="text-muted mt-4 small mb-0">{{ t("privacy.lastUpdated") }}</p>
        </div>
    </section>
</template>

<script setup>
import { useI18n } from "@/i18n";
import { useHead } from "@vueuse/head";

const { t } = useI18n();

useHead(() => ({
    title: t("privacy.seoTitle"),
    meta: [{ name: "robots", content: "index,follow" }],
}));
</script>