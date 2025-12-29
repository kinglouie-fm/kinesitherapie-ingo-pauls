<template>
  <section class="reviews-section py-5">
    <div class="container py-4">
      <div class="text-center mb-5">
        <h2 class="fw-bold mb-2">Rezensionen</h2>
        <h4 class="text-muted mb-0 mx-auto reviews-subtitle">Hier sehen Sie ein paar unserer Rezensionen von Google.
        </h4>

        <div class="mt-4">
          <a class="btn btn-danger rounded-3 px-4 py-2"
            href="https://www.google.com/maps/place/Kin%C3%A9sith%C3%A9rapie+Pauls+Ingo/@49.8631352,6.1597158,17z/data=!4m8!3m7!1s0x47bffd8e54e9b281:0xb84f2b141d0b77fa!8m2!3d49.8631318!4d6.1622961!9m1!1b1!16s%2Fg%2F1tl7mvxx?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D"
            target="_blank" rel="noopener noreferrer">
            Zu Google Rezensionen <span class="ms-2">→</span>
          </a>
        </div>
      </div>

      <div class="row g-4 justify-content-center">
        <div v-for="r in reviews" :key="r.id" class="col-12 col-md-6 col-lg-4">
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
const reviews = [
  {
    id: 1,
    text:
      "Ich bin seit Jahren hier in Behandlung. Ingo nimmt sich viel Zeit und geht ganzheitlich auf die Patientinnen ein, sehr kompetent, immer freundlich! Vielen Dank! Die Praxis ist sehr zu empfehlen! Solch kompetente und nette Therapeuten und Therapeutinnen sind schwer zu finden.",
    name: "Maria Louise",
  },
  {
    id: 2,
    text:
      "Ich bin seit etlichen Jahren in Behandlung bei dieser überaus kompetenten, freundlichen, immer hilfsbedürftigen und lösungsuchenden Truppe😀 Auch in Bezug auf meinen speziellen gesundheitlichen Fall,wird stets nach effizienten und auf mich zugeschnitte Lösungen und Behandlungsmodelle gesucht. Vielen Dank für eure super Arbeit😀",
    name: "Sabrina Gloden",
  },
  {
    id: 3,
    text:
      "J'y vais depuis 2 semaines et pour longtemps encore pour me remettre. Deux kinés qualifiés avec beaucoup de savoi-faire. Spacieux cadre, pas de cabines mais des chambres d'appartement. Les appareils techniques sont performants et up to date, le maniement efficasse est garantie avec les connaissances des kinés.",
    name: "Marc Wagner",
  },
];
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
