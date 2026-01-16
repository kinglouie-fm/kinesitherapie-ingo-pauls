<template>
  <section ref="root" class="services-section py-5">
    <div class="container py-4">
      <div class="text-center mb-5 gsap-services-heading">
        <h2 class="fw-bold mb-4">{{ t("services.title") }}</h2>
        <h4 class="text-muted mb-0 mx-auto services-subtitle">
          {{ t("services.subtitle") }}
        </h4>
      </div>

      <div class="row g-4 justify-content-center">
        <div v-for="s in services" :key="s.id" class="col-12 col-md-6 col-lg-4 col-xl-3 gsap-services-card">
          <article class="card border-0 shadow-sm service-card" :class="{ 'is-open': openId === s.id }">
            <div class="ratio ratio-4x3">
              <img :src="s.img" class="w-100 h-100 object-fit-cover" :alt="s.title" loading="lazy" />
            </div>

            <div class="card-body service-body" role="button" tabindex="0" @click="toggle(s.id)"
              @keydown.enter.prevent="toggle(s.id)" @keydown.space.prevent="toggle(s.id)">
              <div class="service-meta mb-2">{{ t("services.meta") }}</div>

              <div class="d-flex align-items-center justify-content-between gap-3">
                <h5 class="fw-bold mb-0 service-title">
                  {{ s.title }}
                </h5>

                <span class="chev" :class="{ 'chev-open': openId === s.id }" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M8 10l4 4 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                      stroke-linejoin="round" />
                  </svg>
                </span>
              </div>

              <div class="collapse-wrap" :class="{ open: openId === s.id }">
                <p class="mt-3 mb-0 text-muted small lh-lg">
                  {{ s.description }}
                </p>
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
import { useI18n } from "@/i18n";
import CMDImg from "@/assets/images/services/CMD.webp";
import DryNeedlingImg from "@/assets/images/services/Dryneedling.webp";
import FaszienImg from "@/assets/images/services/Faszientherapie.webp";
import LymphImg from "@/assets/images/services/Lymphdrainage.webp";
import ManuelleTherapieImg from "@/assets/images/services/Manuelle_Therapie.webp";
import IVRTImg from "@/assets/images/services/Schwindeltherapie.webp";
import StosswelleImg from "@/assets/images/services/Stosswellentherapie.webp";
import TrainingImg from "@/assets/images/services/Trainingstherapie.webp";
import UltraschallImg from "@/assets/images/services/Ultraschall-Physikalische_Therapie.webp";

const { t } = useI18n();

const openId = ref(null);
const root = ref(null);
let ctx;

const services = computed(() => [
  {
    id: "omt",
    img: ManuelleTherapieImg,
    title: t("services.items.omt.title"),
    description: t("services.items.omt.description")
  },
  {
    id: "stosswelle",
    img: StosswelleImg,
    title: t("services.items.stosswelle.title"),
    description: t("services.items.stosswelle.description")
  },
  {
    id: "dry-needling",
    img: DryNeedlingImg,
    title: t("services.items.dry-needling.title"),
    description: t("services.items.dry-needling.description")
  },
  {
    id: "faszien",
    img: FaszienImg,
    title: t("services.items.faszien.title"),
    description: t("services.items.faszien.description")
  },
  {
    id: "ivrt",
    img: IVRTImg,
    title: t("services.items.ivrt.title"),
    description: t("services.items.ivrt.description")
  },
  {
    id: "cmd",
    img: CMDImg,
    title: t("services.items.cmd.title"),
    description: t("services.items.cmd.description")
  },
  {
    id: "lymph",
    img: LymphImg,
    title: t("services.items.lymph.title"),
    description: t("services.items.lymph.description")
  },
  {
    id: "training",
    img: TrainingImg,
    title: t("services.items.training.title"),
    description: t("services.items.training.description")
  },
  {
    id: "physikalisch",
    img: UltraschallImg,
    title: t("services.items.physikalisch.title"),
    description: t("services.items.physikalisch.description")
  }
]);

function toggle(id) {
  openId.value = openId.value === id ? null : id;
}

onMounted(async () => {
  await nextTick();

  ctx = gsap.context((self) => {
    const q = self.selector;
    revealEach(q, { elements: ".gsap-services-heading", y: 18, start: "top 85%" });
    revealEach(q, { elements: ".gsap-services-card", y: 16, start: "top 90%" });
  }, root.value);
});

onBeforeUnmount(() => ctx?.revert());
</script>

<style scoped>
.services-section {
  background: #eef0f3;
}

.services-subtitle {
  max-width: 700px;
  line-height: 1.5;
}

.service-card {
  border-radius: 14px;
  overflow: hidden;
  background: #fff;
  max-width: 320px;
  margin-left: auto;
  margin-right: auto;
}

.service-body {
  cursor: pointer;
  user-select: none;
  padding: 18px 18px 20px;
}

.service-meta {
  font-size: 12px;
  letter-spacing: 0.2px;
  color: #e31b23;
}

.service-title {
  color: #111827;
}

.chev {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #111827;
  transition: transform 180ms ease;
}

.chev-open {
  transform: rotate(180deg);
}

.collapse-wrap {
  overflow: hidden;
  max-height: 0;
  opacity: 0;
  transition: max-height 220ms ease, opacity 220ms ease;
}

.collapse-wrap.open {
  max-height: 260px;
  opacity: 1;
}

.service-card.is-open {
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.12) !important;
}
</style>