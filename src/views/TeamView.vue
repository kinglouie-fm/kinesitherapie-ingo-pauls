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
            <img :src="teamImage" class=" team-image w-100 h-100 object-fit-cover" :alt="t('team.imageAlt')" />
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
import { ref, onMounted, onBeforeUnmount, nextTick, computed } from "vue";
import gsap from "gsap";
import { revealEach } from "@/animations/scroll";
import { useI18n } from "@/i18n";

import teamImage from "@/assets/images/team/Team.webp";
import member1 from "@/assets/images/team/Ingo.webp";
import member2 from "@/assets/images/team/Paul.webp";
import member3 from "@/assets/images/team/Gilles.webp";

const { t } = useI18n();

const flippedIdx = ref(null);
const teamWrapperRef = ref(null);
const root = ref(null);
let ctx;

const members = computed(() => [
  {
    image: member1,
    name: t("team.members.ingo.name"),
    role: t("team.members.ingo.role"),
    about: t("team.members.ingo.about")
  },
  {
    image: member2,
    name: t("team.members.paul.name"),
    role: t("team.members.paul.role"),
    about: t("team.members.paul.about")
  },
  {
    image: member3,
    name: t("team.members.gilles.name"),
    role: t("team.members.gilles.role"),
    about: t("team.members.gilles.about")
  }
]);

function toggleFlip(idx) {
  flippedIdx.value = flippedIdx.value === idx ? null : idx;
}

function handleOutsideClick(event) {
  if (!teamWrapperRef.value) return;
  const clickedInside = teamWrapperRef.value.contains(event.target);
  if (!clickedInside) flippedIdx.value = null;
}

onMounted(async () => {
  document.addEventListener("click", handleOutsideClick, true);
  await nextTick();

  ctx = gsap.context((self) => {
    const q = self.selector;
    revealEach(q, { elements: ".gsap-team-heading", y: 18 });
    revealEach(q, { elements: ".gsap-team-hero", y: 18 });
    revealEach(q, { elements: ".gsap-team-card", y: 16, start: "top 90%" });
  }, root.value);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleOutsideClick, true);
  ctx?.revert();
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

.team-image {
  object-fit: cover;
  object-position: center 50%;
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

@media (min-width: 992px) {
  .team-image {
    object-position: center 25%;
  }
}
</style>