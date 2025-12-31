<template>
    <footer class="footer py-4">
        <div class="container">
            <div class="row align-items-center gy-3">
                <div class="col-12 col-lg-4 text-center text-lg-start">
                    <div class="footer-name">Kinésithérapie Ingo Pauls</div>
                </div>

                <div class="col-12 col-lg-4 text-center">
                    <address class="footer-address mb-0">
                        19, Rue Pierre Olinger<br />
                        L-9264 Diekirch<br />
                        Luxemburg
                    </address>
                </div>

                <div class="col-12 col-lg-4 text-center text-lg-end">
                    <div class="footer-copy">
                        © {{ year }} Kinésithérapie Ingo Pauls. Alle Rechte vorbehalten.
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup>
const year = new Date().getFullYear();
</script>

<style scoped>
.footer {
    background: #111827;
    /* dark like your navbar */
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

/* Small tweak for mobile readability */
@media (max-width: 576px) {
    .footer-copy {
        font-size: 0.9rem;
    }
}
</style>
