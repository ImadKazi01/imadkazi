<script setup>
defineProps({
  intro: String,
  sections: Array
})
</script>

<template>
  <section id="about" class="about">
    <h2 class="about__heading">About</h2>
    <p class="about__intro">{{ intro }}</p>

    <div class="about__blocks">
      <article v-for="item in sections" :key="item.label" class="about__block">
        <h3 class="about__label">{{ item.label }}</h3>
        <p class="about__text">{{ item.value }}</p>
      </article>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.about {
  padding: 4rem 0;

  &__heading {
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    font-weight: 700;
    letter-spacing: -0.02em;
    color: $text-primary;
    margin: 0 0 1rem;
  }

  &__intro {
    font-size: clamp(1.1rem, 2.5vw, 1.35rem);
    line-height: 1.65;
    color: $text-secondary;
    margin: 0 0 2.5rem;
  }

  &__blocks {
    display: grid;
    gap: 2rem;

    @media (min-width: $tablet) {
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
    }
  }

  &__label {
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: $text-secondary;
    margin: 0 0 0.5rem;
  }

  &__text {
    font-size: 0.95rem;
    line-height: 1.7;
    color: $text-primary;
    margin: 0;
  }
}
</style>
