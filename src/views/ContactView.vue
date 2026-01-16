<template>
  <section ref="root" class="py-5 bg-white">
    <div class="container py-4 text-center text-lg-start">
      <div class="text-center mb-5 gsap-contact-heading">
        <h2 class="fw-bold mb-4">{{ t("contact.title") }}</h2>
        <h4 class="text-muted mb-0 mx-auto contact-subtitle">{{ t("contact.subtitle") }}</h4>
      </div>

      <div class="row align-items-center justify-content-center gy-5">
        <div class="col-12 col-md-6 col-lg-4 gsap-contact-left">
          <div class="d-flex align-items-center gap-2 mb-3 justify-content-center justify-content-lg-start">
            <span class="icon-badge" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M8 3v3M16 3v3M4 9h16M6 6h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" />
              </svg>
            </span>
            <h4 class="fw-bold mb-0">{{ t("contact.openingHours.title") }}</h4>
          </div>

          <div class="opening-table">
            <div class="opening-row gsap-opening-row">
              <div class="day">{{ t("contact.openingHours.days.monday") }}</div>
              <div class="times">
                <div>{{ t("contact.openingHours.times.mon.0") }}</div>
                <div>{{ t("contact.openingHours.times.mon.1") }}</div>
              </div>
            </div>

            <div class="opening-row gsap-opening-row">
              <div class="day">{{ t("contact.openingHours.days.tuesday") }}</div>
              <div class="times">
                <div>{{ t("contact.openingHours.times.tue.0") }}</div>
                <div>{{ t("contact.openingHours.times.tue.1") }}</div>
              </div>
            </div>

            <div class="opening-row gsap-opening-row">
              <div class="day">{{ t("contact.openingHours.days.wednesday") }}</div>
              <div class="times">
                <div>{{ t("contact.openingHours.times.wed.0") }}</div>
                <div>{{ t("contact.openingHours.times.wed.1") }}</div>
              </div>
            </div>

            <div class="opening-row gsap-opening-row">
              <div class="day">{{ t("contact.openingHours.days.thursday") }}</div>
              <div class="times">
                <div>{{ t("contact.openingHours.times.thu.0") }}</div>
                <div>{{ t("contact.openingHours.times.thu.1") }}</div>
              </div>
            </div>

            <div class="opening-row gsap-opening-row">
              <div class="day">{{ t("contact.openingHours.days.friday") }}</div>
              <div class="times">
                <div>{{ t("contact.openingHours.times.fri.0") }}</div>
                <div>{{ t("contact.openingHours.times.fri.1") }}</div>
              </div>
            </div>

            <div class="opening-row gsap-opening-row">
              <div class="day">{{ t("contact.openingHours.days.weekend") }}</div>
              <div class="times">
                <div>{{ t("contact.openingHours.times.weekend.0") }}</div>
              </div>
            </div>
          </div>

          <div class="mt-4 gsap-contact-cta">
            <CallButton phone="+352262803831" :label="t('contact.cta')" />
          </div>
        </div>

        <div class="col-12 col-lg-3 d-flex justify-content-center gsap-contact-image">
          <div class="contact-image shadow-sm">
            <img :src="kontaktImg" class="w-100 h-100 object-fit-cover" :alt="t('contact.imageAlt')" />
          </div>
        </div>

        <div class="col-12 col-md-6 col-lg-4 gsap-contact-right">
          <div class="d-flex align-items-center gap-2 mb-2 justify-content-center justify-content-lg-start">
            <span class="icon-badge icon-red" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M22 16.9v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.18 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.72c.12.86.3 1.7.54 2.5a2 2 0 0 1-.45 2.11L8.1 9.4a16 16 0 0 0 6 6l1.07-1.08a2 2 0 0 1 2.11-.45c.8.24 1.64.42 2.5.54A2 2 0 0 1 22 16.9Z"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </span>
            <h4 class="fw-bold mb-0">{{ t("contact.phone.title") }}</h4>
          </div>

          <div class="info-body px-3 mb-4">
            <a class="contact-link d-inline-block mb-2" href="tel:+352262803831">
              +352 26 80 38 31
            </a>
            <p class="text-muted mb-0 lh-lg">
              {{ t("contact.phone.hint") }}
            </p>
          </div>

          <div class="d-flex align-items-center gap-2 mb-2 justify-content-center justify-content-lg-start">
            <span class="icon-badge icon-red" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 22s7-4.5 7-12a7 7 0 1 0-14 0c0 7.5 7 12 7 12Z" stroke="currentColor" stroke-width="2" />
                <path d="M12 11.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" stroke="currentColor" stroke-width="2" />
              </svg>
            </span>

            <h4 class="fw-bold mb-0">{{ t("contact.houseVisit.title") }}</h4>
          </div>

          <div class="info-body px-3">
            <p class="text-muted mb-0 lh-lg">
              {{ t("contact.houseVisit.text") }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import gsap from "gsap";
import { revealEach } from "@/animations/scroll";
import { useI18n } from "@/i18n";

import kontaktImg from "@/assets/images/other/Kontakt.webp";
import CallButton from "@/components/CallButton.vue";

const { t } = useI18n();

const root = ref(null);
let ctx;

onMounted(async () => {
  await nextTick();

  ctx = gsap.context((self) => {
    const q = self.selector;

    revealEach(q, { elements: ".gsap-contact-heading", y: 18, start: "top 85%" });

    revealEach(q, { elements: ".gsap-contact-left", y: 16, start: "top 90%" });
    revealEach(q, { elements: ".gsap-contact-image", y: 16, start: "top 90%" });
    revealEach(q, { elements: ".gsap-contact-right", y: 16, start: "top 90%" });

    revealEach(q, { elements: ".gsap-opening-row", y: 10, start: "top 92%", stagger: 0.06 });

    revealEach(q, { elements: ".gsap-contact-cta", y: 12, start: "top 92%" });
  }, root.value);
});

onBeforeUnmount(() => ctx?.revert());
</script>

<style scoped>
.icon-badge {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #e31b23;
  background: rgba(227, 27, 35, 0.08);
  flex: 0 0 auto;
}

.contact-link {
  color: #111827;
  text-decoration: none;
  font-weight: 600;
}

.contact-link:hover {
  text-decoration: underline;
}

.opening-table {
  margin-top: 6px;
  width: fit-content;

  display: grid;
  grid-template-columns: max-content 190px;
  column-gap: 24px;
  row-gap: 10px;
  margin-left: 0;
  margin-right: 0;
}

.opening-row {
  display: contents;
}

.day {
  text-align: left;
  color: #111827;
  white-space: nowrap;
}

.times {
  color: #111827;
  line-height: 1.4;
  white-space: nowrap;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
}

.contact-image {
  width: 250px;
  height: 400px;
  border-radius: 10px;
  overflow: hidden;
  background: #f3f4f6;
}

.contact-subtitle {
  max-width: 700px;
  line-height: 1.5;
}

.info-body {
  text-align: center;
}

@media (min-width: 992px) {
  .info-body {
    text-align: left;
    padding-left: 0;
  }
}

@media (max-width: 768px) {
  .opening-table {
    grid-template-columns: max-content 165px;
    column-gap: 16px;

    margin-left: auto;
    margin-right: auto;
  }

  .contact-image {
    margin-left: auto;
    margin-right: auto;
  }
}
</style>