<template>
  <section class="py-5 bg-white">
    <div class="container py-4">
      <div class="text-center mb-4">
        <h2 class="fw-bold mb-4">Lerne unser Team kennen</h2>
        <h4 class="text-muted mb-0 team-subtitle mx-auto">
          Unser Ziel ist es, Ihren Gesundheitszustand mit Hilfe eines ganzheitlichen Ansatz
          langfristig zu verbessern.
        </h4>
      </div>

      <div class="row justify-content-center mb-4">
        <div class="col-12 col-lg-10">
          <div class="ratio ratio-21x9 team-hero shadow-sm">
            <img :src="teamImage" class="w-100 h-100 object-fit-cover" alt="Unser Team" />
          </div>
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="col-12 col-lg-10">
          <div class="row g-4">
            <div v-for="(m, idx) in members" :key="idx" class="col-12 col-md-4">
              <div class="card border-0 h-100 team-card">
                <div class="ratio ratio-1x1 member-photo">
                  <img :src="m.image" class="w-100 h-100 object-fit-cover" :alt="m.name" />
                </div>

                <div class="card-body text-center pt-3 pb-4">
                  <div class="fw-bold team-name mb-1">
                    <h3>{{ m.name }}</h3>
                  </div>
                  <div class="text-muted small">
                    <h5>{{ m.role }}</h5>
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
import teamImage from "@/assets/images/team.png";
import member1 from "@/assets/images/member.png";
import member2 from "@/assets/images/member.png";
import member3 from "@/assets/images/member.png";

const members = [
  { name: "Ingo", role: "Geschäftsführer & Physiotherapeut", image: member1 },
  { name: "Paul", role: "Physiotherapeut", image: member2 },
  { name: "Gilles", role: "Physiotherapeut", image: member3 },
];
</script>

<style scoped>
.team-subtitle {
  max-width: 700px;
  line-height: 1.5;
}

/* Big image container */
.team-hero {
  border-radius: 14px;
  overflow: hidden;
  background: #f3f4f6;
  height: 500px;
}

/* Cards */
.team-card {
  border-radius: 10px;
  overflow: hidden;
}

.member-photo {
  border-radius: 10px;
  overflow: hidden;
  background: #f3f4f6;
  height: 400px;
}

/* Name color like screenshot */
.team-name {
  color: #e31b23;
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
}
</style>
