<!-- src/views/ContactView.vue -->
<template>
  <section class="py-5 bg-white">
    <div class="container py-4">
      <!-- Heading -->
      <div class="text-center mb-5">
        <h2 class="fw-bold mb-2">Kontaktieren Sie uns</h2>
        <p class="text-muted mb-0">Jetzt Termin vereinbaren.</p>
      </div>

      <div class="row align-items-start justify-content-center gy-5">
        <!-- Left: Opening times -->
        <div class="col-12 col-lg-4">
          <div class="d-flex align-items-center gap-2 mb-3">
            <span class="icon-badge" aria-hidden="true">
              <!-- calendar icon -->
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M8 3v3M16 3v3M4 9h16M6 6h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </span>
            <h3 class="h5 fw-bold mb-0">Öffnungszeiten</h3>
          </div>

          <div class="opening-table">
            <div class="opening-row">
              <div class="day">Montag</div>
              <div class="times">
                <div>06.40 – 12.00 Uhr</div>
                <div>13.00 – 19.00 Uhr</div>
              </div>
            </div>

            <div class="opening-row">
              <div class="day">Dienstag</div>
              <div class="times">
                <div>06.40 – 12.00 Uhr</div>
                <div>13.00 – 19.00 Uhr</div>
              </div>
            </div>

            <div class="opening-row">
              <div class="day">Mittwoch</div>
              <div class="times">
                <div>07.30 – 12.00 Uhr</div>
                <div>13.00 – 19.00 Uhr</div>
              </div>
            </div>

            <div class="opening-row">
              <div class="day">Donnerstag</div>
              <div class="times">
                <div>06.40 – 12.00 Uhr</div>
                <div>13.00 – 19.00 Uhr</div>
              </div>
            </div>

            <div class="opening-row">
              <div class="day">Freitag</div>
              <div class="times">
                <div>06.40 – 12.00 Uhr</div>
                <div>13.00 – 19.00 Uhr</div>
              </div>
            </div>

            <div class="opening-row">
              <div class="day">Wochenende</div>
              <div class="times">
                <div>geschlossen</div>
              </div>
            </div>
          </div>

          <a class="btn btn-danger rounded-3 px-4 py-2 mt-4" href="tel:+352262803831">
            Termin buchen <span class="ms-2">→</span>
          </a>
        </div>

        <!-- Middle: Image -->
        <div class="col-12 col-lg-3 d-flex justify-content-center">
          <div class="contact-image shadow-sm">
            <img :src="kontaktImg" class="w-100 h-100 object-fit-cover" alt="Kontakt" />
          </div>
        </div>

        <!-- Right: Contact info -->
        <div class="col-12 col-lg-4">
          <!-- Telefon -->
          <div class="d-flex gap-3 mb-4">
            <span class="icon-badge icon-red" aria-hidden="true">
              <!-- phone icon -->
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M22 16.9v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.18 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.72c.12.86.3 1.7.54 2.5a2 2 0 0 1-.45 2.11L8.1 9.4a16 16 0 0 0 6 6l1.07-1.08a2 2 0 0 1 2.11-.45c.8.24 1.64.42 2.5.54A2 2 0 0 1 22 16.9Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>

            <div>
              <h3 class="h5 fw-bold mb-2">Telefon</h3>
              <a class="contact-link d-inline-block mb-2" href="tel:+352262803831">
                +352 26 80 38 31
              </a>
              <p class="text-muted small mb-0 lh-lg">
                Sollte niemand Ihren Anruf beantworten, hinterlassen Sie bitte Ihren Namen und
                Ihre Telefonnummer auf dem Anrufbeantworter.
              </p>
            </div>
          </div>

          <!-- Hausbesuch -->
          <div class="d-flex gap-3">
            <span class="icon-badge icon-red" aria-hidden="true">
              <!-- pin icon -->
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 22s7-4.5 7-12a7 7 0 1 0-14 0c0 7.5 7 12 7 12Z"
                  stroke="currentColor"
                  stroke-width="2"
                />
                <path
                  d="M12 11.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
                  stroke="currentColor"
                  stroke-width="2"
                />
              </svg>
            </span>

            <div>
              <h3 class="h5 fw-bold mb-2">Hausbesuch</h3>
              <p class="text-muted small mb-0 lh-lg">
                Wenn ein Besuch in der Praxis aus unterschiedlichen Gründen nicht möglich ist,
                besteht die Möglichkeit zum Hausbesuch!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import kontaktImg from "@/assets/images/kontakt.png";
</script>

<style scoped>
/* icon pill */
.icon-badge {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #e31b23; /* red icons like screenshot */
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

/* opening times layout (simple, clean, like screenshot) */
.opening-table {
  margin-top: 6px;
  max-width: 320px;
}
.opening-row {
  display: flex;
  justify-content: space-between;
  gap: 14px;
  padding: 3px 0;
  font-size: 0.9rem;
}
.day {
  color: #111827;
}
.time {
  color: #111827;
  white-space: nowrap;
}

/* center image */
.contact-image {
  width: 250px;
  height: 400px;
  border-radius: 10px;
  overflow: hidden;
  background: #f3f4f6;
}

/* Bootstrap helper if needed */
.object-fit-cover {
  object-fit: cover;
}
</style>
