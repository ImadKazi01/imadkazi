<script setup>
defineProps({
  email: String
})

const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="footer__inner">
      <p class="footer__copy">&copy; {{ year }} Imad Kazi</p>
      <p class="footer__tagline">Designer · Developer · Photographer</p>
      <a :href="'mailto:' + email" class="footer__email">{{ email }}</a>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  border-top: 1px solid $border-light;
  padding: 2rem 1.5rem 2.5rem;

  @media (min-width: $tablet) {
    padding: 2rem 2rem 2.5rem;
  }

  &__inner {
    width: 100%;
    max-width: $container-max;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;

    @media (min-width: $tablet) {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
    }
  }

  &__copy {
    font-size: 0.8rem;
    color: $text-secondary;
    margin: 0;
  }

  &__tagline {
    font-size: 0.8rem;
    color: $text-secondary;
    margin: 0;

    @media (min-width: $tablet) {
      flex: 1;
      text-align: center;
    }
  }

  &__email {
    font-size: 0.8rem;
    color: $text-secondary;
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: $orange;
    }
  }
}
</style>
