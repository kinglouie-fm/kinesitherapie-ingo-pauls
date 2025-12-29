<template>
  <section class="py-5 bg-white">
    <div class="container py-4">
      <!-- Heading -->
      <div class="text-center mb-4">
        <h2 class="fw-bold mb-2">Lerne unser Team kennen</h2>
        <p class="text-muted small mb-0 team-subtitle mx-auto">
          Unser Ziel ist es, Ihren Gesundheitszustand mit Hilfe eines ganzheitlichen Ansatz
          langfristig zu verbessern.
        </p>
      </div>

      <!-- Big team image -->
      <div class="row justify-content-center mb-4">
        <div class="col-12 col-lg-10">
          <div class="ratio ratio-21x9 team-hero shadow-sm">
            <img
              :src="teamImage"
              class="w-100 h-100 object-fit-cover"
              alt="Unser Team"
            />
          </div>
        </div>
      </div>

        <!-- Cards -->
        <div class="row justify-content-center">
            <div class="col-12 col-lg-10">
                <div class="row g-4">
                    <div
                        v-for="(m, idx) in members"
                        :key="idx"
                        class="col-12 col-md-4"
                    >
                        <div class="card border-0 h-100 team-card">
                            <div class="ratio ratio-1x1 member-photo">
                                <img
                                :src="m.image"
                                class="w-100 h-100 object-fit-cover"
                                :alt="m.name"
                                />
                        </div>

                            <div class="card-body text-center pt-3 pb-4">
                                <div class="fw-bold team-name mb-1">{{ m.name }}</div>
                                <div class="text-muted small">{{ m.role }}</div>
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
  max-width: 520px;
  line-height: 1.6;
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
  font-size: 1.05rem;
}
</style>
