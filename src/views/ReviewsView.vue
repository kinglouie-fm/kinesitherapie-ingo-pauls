<template>
  <section ref="root" class="reviews-section py-5">
    <div class="container py-4">
      <div class="text-center mb-5 gsap-reviews-heading">
        <h2 class="fw-bold mb-2">{{ t("reviews.title") }}</h2>
        <h4 class="text-muted mb-0 mx-auto reviews-subtitle">
          {{ t("reviews.subtitle") }}
        </h4>

        <div class="mt-4 gsap-reviews-btn">
          <Button
            link="https://www.google.com/maps/place/Kin%C3%A9sith%C3%A9rapie+Pauls+Ingo/@49.8631352,6.1597158,17z/data=!4m8!3m7!1s0x47bffd8e54e9b281:0xb84f2b141d0b77fa!8m2!3d49.8631318!4d6.1622961!9m1!1b1!16s%2Fg%2F1tl7mvxx?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D"
            :label="t('reviews.cta')" />
        </div>
      </div>

      <div class="row g-4 justify-content-center">
        <div v-for="r in reviews" :key="r.id" class="col-12 col-md-6 col-lg-4 gsap-review-card">
          <article class="review-card text-center px-4 py-4 h-100">
            <div class="google-word mb-3">Google</div>

            <p class="review-text mb-4">
              {{ r.text }}
            </p>

            <div class="d-flex align-items-center justify-content-center gap-3 mt-auto">
              <div class="text-start">
                <div class="review-name">{{ r.name }}</div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, computed } from "vue";
import gsap from "gsap";
import { revealEach } from "@/animations/scroll";
import Button from "@/components/Button.vue";
import { useI18n } from "@/i18n";

const { t } = useI18n();

const root = ref(null);
let ctx;

const reviews = computed(() => [
  {
    id: 1,
    text: t("reviews.items.1.text"),
    name: t("reviews.items.1.name")
  },
  {
    id: 2,
    text: t("reviews.items.2.text"),
    name: t("reviews.items.2.name")
  },
  {
    id: 3,
    text: t("reviews.items.3.text"),
    name: t("reviews.items.3.name")
  },
]);

onMounted(async () => {
  await nextTick();

  ctx = gsap.context((self) => {
    const q = self.selector;

    revealEach(q, { elements: ".gsap-reviews-heading", y: 18, start: "top 85%" });
    revealEach(q, { elements: ".gsap-reviews-btn", y: 14, start: "top 85%" });
    revealEach(q, { elements: ".gsap-review-card", y: 16, start: "top 90%" });
  }, root.value);
});

onBeforeUnmount(() => ctx?.revert());
</script>

<style scoped>
.reviews-section {
  background: #eef0f3;
}

.review-card {
  border-radius: 16px;
  background: transparent;
  display: flex;
  flex-direction: column;
  min-height: 320px;
}

.google-word {
  font-weight: 700;
  font-size: 1.4rem;
  color: #9aa3ad;
  letter-spacing: 0.2px;
}

.review-text {
  font-weight: 300;
  color: #111827;
  line-height: 1.55;
}

.review-name {
  color: #111827;
}

.reviews-subtitle {
  max-width: 36rem;
  line-height: 1.5;
}
</style>