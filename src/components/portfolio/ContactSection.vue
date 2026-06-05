<script setup>
defineProps({
  email: String
})
</script>

<template>
  <section id="contact" class="contact">
    <h2 class="contact__heading">Get in touch</h2>
    <p class="contact__intro">Open to freelance projects, collaborations, and new opportunities.</p>
    <a :href="'mailto:' + email" class="contact__email">{{ email }}</a>
    <div class="contact__links">
      <a href="https://github.com/imadkzi" target="_blank" rel="noopener noreferrer">GitHub</a>
      <a href="https://uk.linkedin.com/in/imad-kazi" target="_blank" rel="noopener noreferrer">
        LinkedIn
      </a>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.contact {
  padding: 4rem 0 5rem;

  &__heading {
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    font-weight: 700;
    letter-spacing: -0.02em;
    color: $text-primary;
    margin: 0 0 0.75rem;
  }

  &__intro {
    font-size: 1.05rem;
    color: $text-secondary;
    margin: 0 0 1.5rem;
    max-width: 28rem;
  }

  &__email {
    display: block;
    font-size: clamp(1.5rem, 4vw, 2.5rem);
    font-weight: 700;
    letter-spacing: -0.02em;
    color: $text-primary;
    text-decoration: none;
    cursor: pointer;
    margin-bottom: 1.5rem;
    transition: color 0.2s ease;

    &:hover {
      color: $orange;
      text-decoration: underline;
    }
  }

  &__links {
    display: flex;
    gap: 1.5rem;

    a {
      font-size: 0.9rem;
      font-weight: 500;
      color: $text-secondary;
      text-decoration: none;
      transition: color 0.2s ease;

      &:hover {
        color: $orange;
      }
    }
  }
}
</style>
