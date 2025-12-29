<template>
  <section class="hero d-flex align-items-center position-relative">

    <div class="hero-overlay position-absolute top-0 start-0 w-100 h-100"></div>

    <div class="container position-relative z-2">
      <div class="row">
        <div class="col-12 col-md-7 col-lg-6 pt-5 pt-lg-0">
          <div class="pt-5">
            <h1 class="text-white fw-bold lh-1 mb-4 hero-title">
              Kinesitherapie<br />
              Ingo Pauls
            </h1>

            <h4 class="mb-4 hero-subtitle">
              Wir beraten Sie individuell bei Ihren Gesundheitsfragen und begleiten Sie
              persönlich mit unserer langjähriger Fachkompetenz.
            </h4>

            <a href="#" class="btn btn-danger px-4 py-2 rounded-3 hero-btn">
              Termin buchen <span class="ms-2">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.hero {
  min-height: 100vh;
  background-image: url("@/assets/images/hero.png");
  background-size: cover;
  background-position: center;
  overflow: hidden;
}

.hero-overlay {
  z-index: 1;
  background: linear-gradient(90deg,
      rgba(0, 0, 0, 0.65) 0%,
      rgba(0, 0, 0, 0.35) 45%,
      rgba(0, 0, 0, 0.12) 70%,
      rgba(0, 0, 0, 0) 100%);
}

.hero-title {
  text-shadow: 0 18px 40px rgba(0, 0, 0, 0.35);
}

.hero-subtitle {
  color: rgba(255, 255, 255, 0.78);
  line-height: 1.6;
  max-width: 35rem;
}

.hero-btn {
  font-size: 18px;
  box-shadow: 0 10px 25px rgba(227, 27, 35, 0.25);
}
</style>
