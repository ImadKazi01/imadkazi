<script setup>
import WorkBentoTile from './WorkBentoTile.vue'

defineProps({
  projects: Array
})
</script>

<template>
  <section id="work" class="work">
    <h2 class="work__heading">Selected work</h2>

    <div class="work__grid">
      <WorkBentoTile
        v-for="project in projects"
        :key="project.title"
        :title="project.title"
        :img="project.img"
        :link="project.link"
        :services="project.services"
        :technologies="project.technologies"
      />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.work {
  padding: 3rem 0 4rem;

  &__heading {
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    font-weight: 700;
    letter-spacing: -0.02em;
    color: $text-primary;
    margin: 0 0 1.5rem;
  }

  &__grid {
    display: grid;
    gap: 0.75rem;
    grid-template-columns: 1fr;

    @media (min-width: $tablet) {
      gap: 1rem;
      grid-template-columns: repeat(2, 1fr);
    }
  }
}
</style>
