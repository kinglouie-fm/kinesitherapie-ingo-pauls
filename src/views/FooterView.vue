<template>
    <footer class="footer py-4">
        <div class="container">
            <div class="row justify-content-center my-4">
                <div class="col-12 col-lg-6">
                    <div class="ratio ratio-16x9 rounded overflow-hidden shadow-sm">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2571.899536869048!2d6.159721177010478!3d49.86313177148594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bffd8e54e9b281%3A0xb84f2b141d0b77fa!2sKin%C3%A9sith%C3%A9rapie%20Pauls%20Ingo!5e0!3m2!1sen!2slu!4v1768896970411!5m2!1sen!2slu"
                            style="border:0;" allowfullscreen loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade">
                        </iframe>
                    </div>
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
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup>
import { useI18n } from "@/i18n";

const { t } = useI18n();
const year = new Date().getFullYear();
</script>

<style scoped>
.footer {
    background: #111827;
    color: rgba(255, 255, 255, 0.85);
}

.footer-name {
    font-weight: 700;
    letter-spacing: 0.2px;
    color: #fff;
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

@media (max-width: 576px) {
    .footer-copy {
        font-size: 0.9rem;
    }
}
</style>