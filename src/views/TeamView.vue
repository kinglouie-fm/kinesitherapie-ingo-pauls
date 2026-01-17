<template>
  <section ref="root" class="py-5 bg-white">
    <div class="container py-4">
      <div class="text-center mb-4 gsap-team-heading">
        <h2 class="fw-bold mb-4">{{ t("team.title") }}</h2>
        <h4 class="text-muted mb-0 team-subtitle mx-auto">
          {{ t("team.subtitle") }}
        </h4>
      </div>

      <div class="row justify-content-center mb-4 gsap-team-hero">
        <div class="col-12 col-lg-10">
          <div class="ratio ratio-21x9 team-hero shadow-sm">
            <img :src="teamImage" class="team-image w-100 h-100 object-fit-cover" :alt="t('team.imageAlt')" />
          </div>
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="col-12 col-lg-10">
          <div class="row g-4 justify-content-center">
            <div v-for="(m, idx) in members" :key="idx" class="col-12 col-md-4 gsap-team-card">
              <div class="card border-0 h-100 team-card team-interactive shadow-sm" role="button" tabindex="0"
                @click="openMember(m)" @keydown.enter.prevent="openMember(m)" @keydown.space.prevent="openMember(m)">
                <div class="ratio ratio-1x1 member-photo">
                  <img :src="m.image1600" :srcset="`${m.image900} 900w, ${m.image1600} 1600w`"
                    sizes="(max-width: 768px) 280px, 400px" class="w-100 h-100 object-fit-cover" :alt="m.name"
                    loading="lazy" decoding="async" />
                </div>

                <div class="card-body text-center pt-3 pb-4">
                  <div class="fw-bold team-name mb-1">
                    <h3 class="mb-0">{{ m.name }}</h3>
                  </div>

                  <div v-if="m.bullets?.length" class="mt-1">
                    <span class="small text-muted"> {{ t("team.openModal") }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal -->
      <div ref="modalRef" class="modal fade team-modal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down">
          <div class="modal-content team-modal-content">
            <div class="modal-header">
              <div class="me-3">
                <h5 class="modal-title mb-1 fw-bold">
                  {{ activeMember?.name }}
                </h5>
                <div class="text-muted small">
                  {{ activeMember?.role }}
                </div>
              </div>

              <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
            </div>

            <div class="modal-body">
              <p v-if="activeMember?.about" class="text-muted small mb-3 modal-about">
                {{ activeMember.about }}
              </p>

              <ul v-if="activeMember?.bullets?.length" class="team-bullets text-muted small">
                <li v-for="(b, i) in activeMember.bullets" :key="i">
                  {{ b }}
                </li>
              </ul>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" @click="closeModal">
                {{ t("team.closeModal") }}
              </button>
            </div>
          </div>
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
import { Modal } from "bootstrap";

import teamImage from "@/assets/images/team/Team.webp";

import ingo900 from "@/assets/images/team/Ingo.900.webp";
import ingo1600 from "@/assets/images/team/Ingo.1600.webp";

import paul900 from "@/assets/images/team/Paul.900.webp";
import paul1600 from "@/assets/images/team/Paul.1600.webp";

import birgit900 from "@/assets/images/team/Birgit.900.webp";
import birgit1600 from "@/assets/images/team/Birgit.1600.webp";

import gilles900 from "@/assets/images/team/Gilles.900.webp";
import gilles1600 from "@/assets/images/team/Gilles.1600.webp";

const { t } = useI18n();

const root = ref(null);
let ctx;

const modalRef = ref(null);
let bsModal = null;

const activeMember = ref(null);

const members = computed(() => [
  {
    image900: ingo900,
    image1600: ingo1600,
    name: t("team.members.ingo.name"),
    role: t("team.members.ingo.role"),
    about: t("team.members.ingo.about"),
    bullets: t("team.members.ingo.bullets") || []
  },
  {
    image900: paul900,
    image1600: paul1600,
    name: t("team.members.paul.name"),
    role: t("team.members.paul.role"),
    about: t("team.members.paul.about"),
    bullets: t("team.members.paul.bullets") || []
  },
  {
    image900: birgit900,
    image1600: birgit1600,
    name: t("team.members.birgit.name"),
    role: t("team.members.birgit.role"),
    about: t("team.members.birgit.about"),
    bullets: t("team.members.birgit.bullets") || []
  },
  {
    image900: gilles900,
    image1600: gilles1600,
    name: t("team.members.gilles.name"),
    role: t("team.members.gilles.role"),
    about: t("team.members.gilles.about"),
    bullets: t("team.members.gilles.bullets") || []
  }
]);

async function openMember(m) {
  activeMember.value = m;

  await nextTick();
  if (!modalRef.value) return;

  if (!bsModal) {
    bsModal = new Modal(modalRef.value, {
      backdrop: true,
      focus: true,
      keyboard: true
    });

    // Ensure we clear activeMember when the modal is fully hidden (optional but clean)
    modalRef.value.addEventListener("hidden.bs.modal", () => {
      activeMember.value = null;
    });
  }

  bsModal.show();
}

function closeModal() {
  bsModal?.hide();
}

onMounted(async () => {
  await nextTick();

  ctx = gsap.context((self) => {
    const q = self.selector;
    revealEach(q, { elements: ".gsap-team-heading", y: 18 });
    revealEach(q, { elements: ".gsap-team-hero", y: 18 });
    revealEach(q, { elements: ".gsap-team-card", y: 16, start: "top 90%" });
  }, root.value);
});

onBeforeUnmount(() => {
  ctx?.revert();
  bsModal?.dispose();
  bsModal = null;
});
</script>

<style scoped>
.team-subtitle {
  max-width: 700px;
  line-height: 1.5;
}

.team-hero {
  border-radius: 14px;
  overflow: hidden;
  background: #f3f4f6;
  height: 500px;
}

.team-card {
  border-radius: 10px;
  overflow: hidden;
  background: #fff;
}

.member-photo {
  border-radius: 10px;
  overflow: hidden;
  background: #f3f4f6;
  height: 400px;
}

.member-photo img,
.team-image {
  object-position: center 25%;
}

.team-name {
  color: #e31b23;
}

.team-interactive {
  cursor: pointer;
  outline: none;
}

.team-interactive:focus-visible {
  outline: 2px solid rgba(227, 27, 35, 0.45);
  outline-offset: 4px;
  border-radius: 12px;
}

/* Reuse the Services bullets aesthetic */
.service-meta {
  font-size: 12px;
  letter-spacing: 0.2px;
  color: #e31b23;
}

.team-bullets {
  padding-left: 1.1rem;
  line-height: 1.6;
  margin: 0;
}

.team-bullets li::marker {
  color: #e31b23;
}

.modal-about {
  line-height: 1.8;
}

/* Simple centered transition (from middle) */
.team-modal :deep(.modal-dialog) {
  transform: translateY(10px) scale(0.98);
  transition: transform 220ms ease;
}

.team-modal.show :deep(.modal-dialog) {
  transform: translateY(0) scale(1);
}

/* Keep modal clean/simple */
.team-modal-content {
  border-radius: 14px;
  overflow: hidden;
}

@media (max-width: 768px) {
  .team-hero {
    max-width: 90%;
    margin-left: auto;
    margin-right: auto;
    height: 250px;
  }

  .team-card {
    max-width: 280px;
    margin-left: auto;
    margin-right: auto;
  }

  .member-photo {
    height: 280px;
  }

  .team-bullets {
    padding-left: 1rem;
  }
}

@media (min-width: 992px) {
  .team-image {
    object-position: center 25%;
  }
}
</style>