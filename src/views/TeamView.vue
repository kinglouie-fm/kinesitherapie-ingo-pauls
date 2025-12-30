<template>
  <section ref="root" class="py-5 bg-white">
    <div class="container py-4">
      <div class="text-center mb-4 gsap-team-heading">
        <h2 class="fw-bold mb-4">Lerne unser Team kennen</h2>
        <h4 class="text-muted mb-0 team-subtitle mx-auto">
          Unser Ziel ist es, Ihren Gesundheitszustand mit Hilfe eines ganzheitlichen Ansatz
          langfristig zu verbessern.
        </h4>
      </div>

      <div class="row justify-content-center mb-4 gsap-team-hero">
        <div class="col-12 col-lg-10">
          <div class="ratio ratio-21x9 team-hero shadow-sm">
            <img :src="teamImage" class="w-100 h-100 object-fit-cover" alt="Unser Team" />
          </div>
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="col-12 col-lg-10">
          <div class="row g-4" ref="teamWrapperRef">
            <div v-for="(m, idx) in members" :key="idx" class="col-12 col-md-4 gsap-team-card">
              <div class="card border-0 h-100 team-card team-interactive" :class="{ 'is-flipped': flippedIdx === idx }"
                role="button" tabindex="0" @click="toggleFlip(idx)" @keydown.enter.prevent="toggleFlip(idx)"
                @keydown.space.prevent="toggleFlip(idx)">
                <div class="photo-flip">
                  <div class="photo-flip-inner">
                    <div class="photo-face photo-front">
                      <div class="ratio ratio-1x1 member-photo">
                        <img :src="m.image" class="w-100 h-100 object-fit-cover" :alt="m.name" />
                      </div>
                    </div>

                    <div class="photo-face photo-back">
                      <div class="member-photo photo-back-surface">
                        <div class="photo-back-content text-center px-3">
                          <p class="small mb-0 lh-lg">
                            {{ m.about }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="card-body text-center pt-3 pb-4">
                  <div class="fw-bold team-name mb-1">
                    <h3 class="mb-0">{{ m.name }}</h3>
                  </div>
                  <div class="text-muted small">
                    <h5 class="mb-0">{{ m.role }}</h5>
                  </div>
                </div>
              </div>
            </div>
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

import teamImage from "@/assets/images/team.png";
import member1 from "@/assets/images/member.png";
import member2 from "@/assets/images/member.png";
import member3 from "@/assets/images/member.png";

const flippedIdx = ref(null);
const teamWrapperRef = ref(null);
const root = ref(null);
let ctx;

const members = [
  {
    name: "Ingo",
    role: "Geschäftsführer & Physiotherapeut",
    image: member1,
    about: "Gründer der Praxis mit über 20 Jahren Berufserfahrung in Physiotherapie und manueller Therapie. Nach Tätigkeiten in verschiedenen Praxen im In- und Ausland liegt sein Fokus heute auf ganzheitlicher Behandlung, individueller Betreuung und nachhaltigen Therapieerfolgen.",
  },
  {
    name: "Paul",
    role: "Physiotherapeut",
    image: member2,
    about: "Physiotherapeut mit Erfahrung aus mehreren orthopädischen und sporttherapeutischen Praxen. Sein Schwerpunkt liegt auf aktiver Therapie, funktionellem Training und verständlicher Anleitung, damit Patientinnen und Patienten langfristig selbstständig bleiben.",
  },
  {
    name: "Gilles",
    role: "Physiotherapeut",
    image: member3,
    about: "Ausgebildeter Physiotherapeut mit beruflicher Erfahrung in Rehabilitationszentren und ambulanten Praxen. Er arbeitet ruhig und präzise und legt großen Wert auf alltagstaugliche Lösungen sowie eine vertrauensvolle Zusammenarbeit.",
  },
];

function toggleFlip(idx) {
  flippedIdx.value = flippedIdx.value === idx ? null : idx;
}

function handleOutsideClick(event) {
  if (!teamWrapperRef.value) return;

  const clickedInside = teamWrapperRef.value.contains(event.target);
  if (!clickedInside) {
    flippedIdx.value = null;
  }
}

onMounted(async () => {
  document.addEventListener("click", handleOutsideClick, true);
  await nextTick();

  ctx = gsap.context((self) => {
    const q = self.selector;

    // heading block
    revealEach(q, { elements: ".gsap-team-heading", y: 18 });

    // big image
    revealEach(q, { elements: ".gsap-team-hero", y: 18 });

    // each card individually
    revealEach(q, { elements: ".gsap-team-card", y: 16, start: "top 90%" });
  }, root.value);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleOutsideClick, true);
  ctx?.revert()
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

.photo-flip {
  perspective: 1100px;
}

.photo-flip-inner {
  position: relative;
  width: 100%;
  transform-style: preserve-3d;
  transition: transform 420ms ease;
  height: 400px;
}

/* two faces (same square) */
.photo-face {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
}

.photo-flip-inner,
.photo-face {
  height: 100%;
}

.photo-front {
  position: relative;
}

.photo-back {
  transform: rotateY(180deg);
}

.photo-back-surface {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border: 3px solid #e5e7eb;
}

.photo-back-content {
  max-width: 260px;
  text-align: center;
}

.team-interactive.is-flipped .photo-flip-inner {
  transform: rotateY(180deg);
}

@media (hover: hover) and (pointer: fine) {
  .team-interactive:hover .photo-flip-inner {
    transform: rotateY(180deg);
  }
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

  .photo-flip-inner {
    height: 280px;
  }
}
</style>