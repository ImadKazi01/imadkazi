<script setup>
defineProps({
  groups: Array
})
</script>

<template>
  <section id="skills" class="skills">
    <h2 class="skills__heading">Capabilities</h2>

    <div class="skills__grid">
      <div v-for="group in groups" :key="group.label" class="skills__tile">
        <h3>{{ group.label }}</h3>
        <ul class="skills__pills">
          <li v-for="skill in group.skills" :key="skill">{{ skill }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.skills {
  padding: 4rem 0;

  &__heading {
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    font-weight: 700;
    letter-spacing: -0.02em;
    color: $text-primary;
    margin: 0 0 1.5rem;
  }

  &__grid {
    display: grid;
    gap: 1rem;

    @media (min-width: $tablet) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  &__tile {
    background: $surface;
    border-radius: $tile-radius;
    box-shadow: $tile-shadow;
    padding: 1.5rem;

    h3 {
      font-size: 1.1rem;
      font-weight: 700;
      color: $text-primary;
      margin: 0 0 1rem;
    }
  }

  &__pills {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      font-size: 0.78rem;
      font-weight: 500;
      color: $text-secondary;
      padding: 0.35rem 0.7rem;
      background: $page-bg;
      border-radius: 100px;
      line-height: 1.3;
    }
  }
}
</style>
