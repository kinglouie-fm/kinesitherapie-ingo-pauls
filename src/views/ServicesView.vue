<template>
  <section class="services-section py-5">
    <div class="container py-4">
      <div class="text-center mb-5">
        <h2 class="fw-bold mb-2">Leistungen</h2>
        <p class="text-muted small mb-0 mx-auto services-subtitle">
          Hier finden Sie eine Übersicht zu unserem Angebot an Leistungen. Diese können Sie durch ein
          Rezept vom Arzt wahrnehmen, aber auch als Privatleistung.
        </p>
      </div>

      <div class="row g-4 justify-content-center">
        <div v-for="s in services" :key="s.id" class="col-12 col-md-6 col-lg-3">
          <article class="card border-0 shadow-sm service-card" :class="{ 'is-open': openId === s.id }">
            <div class="ratio ratio-4x3">
              <img :src="serviceImg" class="w-100 h-100 object-fit-cover" :alt="s.title" />
            </div>

            <div class="card-body service-body" role="button" tabindex="0" @click="toggle(s.id)"
              @keydown.enter.prevent="toggle(s.id)" @keydown.space.prevent="toggle(s.id)">
              <div class="service-meta mb-2">Wirkung</div>

              <div class="d-flex align-items-center justify-content-between gap-3">
                <h3 class="h6 fw-bold mb-0 service-title">
                  {{ s.title }}
                </h3>

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
import { ref } from "vue";
import serviceImg from "@/assets/images/service.png";

const openId = ref(null);

const services = [
  {
    id: "omt",
    title: "Manuelle Therapie nach OMT",
    description:
      "Bei der Manuellen Therapie handelt es sich um eine mindestens 2-jährige Fortbildung für Physiotherapeuten. Fortgebildete Manualtherapeuten sind Spezialisten der Gelenkmechanik. Die Grundlage der Manuellen Therapie sind spezielle Handgrifftechniken und Mobilisationstechniken.",
  },
  {
    id: "stosswelle",
    title: "Stoßwellentherapie",
    description:
      "Die Stoßwellentherapie ist eine moderne Behandlungsmethode, die bei Sehnen- und Muskelbeschwerden eingesetzt werden kann. Ziel ist es, Heilungsprozesse anzuregen, Schmerzen zu reduzieren und die Beweglichkeit zu verbessern.",
  },
  {
    id: "dry-needling",
    title: "Dry Needling",
    description:
      "Dry Needling ist eine Technik zur Behandlung myofaszialer Triggerpunkte. Mit feinen Nadeln können Muskelverspannungen gelöst, Schmerzen reduziert und die Funktion der Muskulatur unterstützt werden.",
  },
  {
    id: "faszien",
    title: "Faszientherapie",
    description:
      "Die Faszientherapie richtet sich auf das Bindegewebe (Faszien), um Spannungen zu lösen, die Beweglichkeit zu verbessern und Schmerzen zu reduzieren. Sie kann bei Verklebungen, Dysbalancen und Bewegungseinschränkungen unterstützen.",
  },
  {
    id: "ivrt",
    title: "Schwindeltherapie nach IVRT (vestibuläre Rehabilitationstherapie)",
    description:
      "Die vestibuläre Rehabilitationstherapie (IVRT) ist ein gezieltes Trainingskonzept bei Schwindel und Gleichgewichtsstörungen. Durch spezielle Übungen können Stabilität, Orientierung und Sicherheit im Alltag verbessert werden.",
  },
  {
    id: "cmd",
    title: "CMD (Craniomandibuläre Dysfunktion)",
    description:
      "Bei CMD können Beschwerden im Kiefergelenk, im Gesicht oder im Nacken auftreten. Die Therapie zielt darauf ab, muskuläre Spannungen zu reduzieren, das Kiefergelenk zu entlasten und die Funktion zu verbessern.",
  },
  {
    id: "lymph",
    title: "Lymphdrainage",
    description:
      "Die manuelle Lymphdrainage ist eine sanfte Technik zur Unterstützung des Lymphabflusses. Sie kann bei Schwellungen und Ödemen helfen, das Gewebe entlasten und das Wohlbefinden verbessern.",
  },
  {
    id: "training",
    title: "Trainingstherapie",
    description:
      "Trainingstherapie ist ein individuell abgestimmtes Übungsprogramm zur Verbesserung von Kraft, Ausdauer, Beweglichkeit und Koordination. Sie unterstützt Rehabilitation, Prävention und die langfristige Stabilisierung.",
  },
  {
    id: "fussreflex",
    title: "Fußreflexologie",
    description:
      "Die Fußreflexologie arbeitet mit gezielten Griffen an Reflexzonen am Fuß. Sie kann entspannend wirken, die Körperwahrnehmung fördern und unterstützend bei Stress- und Spannungszuständen eingesetzt werden.",
  },
  {
    id: "physikalisch",
    title: "Physikalische Therapie",
    description:
      "Unter physikalischer Therapie werden Anwendungen wie Wärme, Kälte, Elektrotherapie oder Ultraschall zusammengefasst. Je nach Beschwerdebild können diese Maßnahmen schmerzlindernd wirken und Heilungsprozesse unterstützen.",
  },
];

function toggle(id) {
  openId.value = openId.value === id ? null : id;
}
</script>

<style scoped>
.services-section {
  background: #eef0f3;
}

.services-subtitle {
  max-width: 650px;
  line-height: 1.6;
}

.service-card {
  border-radius: 14px;
  overflow: hidden;
  background: #fff;
}

.service-body {
  cursor: pointer;
  user-select: none;
  padding: 18px 18px 20px;
}

.service-meta {
  font-size: 11px;
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

/* collapse animation */
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

/* optional emphasis on open card */
.service-card.is-open {
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.12) !important;
}
</style>
