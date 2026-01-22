<template>
    <footer class="footer py-4">
        <div class="container">
            <div class="row justify-content-center my-4">
                <div class="col-12 col-lg-6">
                    <MapView />
                </div>
            </div>
            <div class="row align-items-center gy-3">
                <div class="col-12 col-lg-4 text-center text-lg-start">
                    <div class="footer-name">{{ t("footer.name") }}</div>
                </div>

                <div class="col-12 col-lg-4 text-center">
                    <address class="footer-address mb-0">
                        {{ t("footer.address.line1") }}<br />
                        {{ t("footer.address.line2") }}<br />
                        {{ t("footer.address.line3") }}
                    </address>
                </div>

                <div class="col-12 col-lg-4 text-center text-lg-end">
                    <div class="footer-copy">
                        © {{ year }} {{ t("footer.name") }}. {{ t("footer.rights") }}
                    </div>

                    <RouterLink class="footer-link" :to="impressumTo">
                        {{ t("footer.impressum") }}
                    </RouterLink>

                    <RouterLink class="footer-link ms-3" :to="cookiesTo">Cookies</RouterLink>
                </div>

            </div>
        </div>
    </footer>
</template>

<script setup>
import { computed } from "vue";
import { useI18n } from "@/i18n";
import MapView from "@/components/MapView.vue";

const { t, locale } = useI18n();
const year = new Date().getFullYear();
const cookiesTo = computed(() => `/${locale.value}/cookies`);
const impressumTo = computed(() => `/${locale.value}/impressum`);
</script>

<style scoped>
.footer {
    background: #111827;
    color: rgba(255, 255, 255, 0.85);
}

.footer-name {
    font-style: normal;
    letter-spacing: 0.2px;
    color: rgba(255, 255, 255, 0.85);
}

.footer-address {
    font-style: normal;
    line-height: 1.5;
    color: rgba(255, 255, 255, 0.85);
}

.footer-copy {
    font-size: 0.95rem;
    color: rgba(255, 255, 255, 0.75);
}

.footer-link {
    color: #ffffff;
    text-decoration: none;
    font-weight: 500;
}

.footer-link:hover {
    text-decoration: underline;
}

@media (max-width: 576px) {
    .footer-copy {
        font-size: 0.9rem;
    }
}
</style>