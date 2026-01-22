<template>
    <section class="py-5 bg-white">
        <div class="container py-4" style="max-width: 900px;">
            <div class="mb-3">
                <button class="btn btn-link p-0 text-decoration-none" @click="$router.back()">
                    {{ t("impressum.back") }}
                </button>
            </div>

            <h1 class="fw-bold mb-3">{{ t("impressum.title") }}</h1>

            <h2 class="h4 fw-bold mb-2">{{ t("impressum.operator.title") }}</h2>
            <p class="text-muted mb-2">
                <strong>{{ t("impressum.operator.nameLabel") }}</strong> Kinésithérapie Ingo Pauls<br />
                <strong>{{ t("impressum.operator.addressLabel") }}</strong> 19, Rue Pierre Olinger, L-9264 Diekirch,
                Luxembourg
            </p>

            <h2 class="h4 fw-bold mt-4 mb-2">{{ t("impressum.contact.title") }}</h2>
            <p class="text-muted mb-2">
                <strong>{{ t("impressum.contact.phoneLabel") }}</strong> +352 26 80 38 31<br />
            </p>

            <h2 class="h4 fw-bold mt-4 mb-2">{{ t("impressum.company.title") }}</h2>
            <p class="text-muted mb-2">
                <strong>{{ t("impressum.company.vatLabel") }}</strong> LU...<br />
            </p>
        </div>
    </section>
</template>

<script setup>
import { useI18n } from "@/i18n";
const { t } = useI18n();
</script>