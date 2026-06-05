<script setup>
import { MapPinIcon, BriefcaseIcon } from '@heroicons/vue/24/outline'

defineProps({
  location: String,
  copy: String,
  background: String,
  ctaText: String,
  ctaSecondaryText: String
})
</script>

<template>
  <section class="hero">
    <div class="hero__intro">
      <h1 class="hero__name">Imad Kazi</h1>
      <p class="hero__role">Designer, developer &amp; photographer</p>
      <div class="hero__meta">
        <p>Based in {{ location }}</p>
        <p>Currently {{ background }}</p>
      </div>
      <p class="hero__copy">{{ copy }}</p>
      <div class="hero__ctas">
        <a href="#work" class="hero__cta hero__cta--secondary">{{ ctaSecondaryText }}</a>
        <a href="#contact" class="hero__cta">{{ ctaText }}</a>
      </div>
    </div>

    <div class="hero__bento">
      <div class="hero__tile hero__tile--portrait">
        <div class="hero__portrait-wrap">
          <img src="/images/memoji.png" alt="Imad Kazi" />
        </div>
      </div>
      <div class="hero__tile hero__tile--location">
        <MapPinIcon class="hero__tile-icon" aria-hidden="true" />
        <div class="hero__tile-content">
          <span class="hero__tile-label">Based in</span>
          <span class="hero__tile-value">{{ location }}</span>
        </div>
      </div>
      <div class="hero__tile hero__tile--role">
        <BriefcaseIcon class="hero__tile-icon" aria-hidden="true" />
        <div class="hero__tile-content">
          <span class="hero__tile-label">Currently</span>
          <span class="hero__tile-value">{{ background }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.hero {
  padding: 7rem 0 3rem;
  display: grid;
  gap: 2.5rem;

  @media (min-width: $tablet) {
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: end;
    padding: 8rem 0 4rem;
  }

  &__name {
    font-size: clamp(2.5rem, 7vw, 4rem);
    font-weight: 700;
    letter-spacing: -0.03em;
    line-height: 1.05;
    margin: 0 0 0.5rem;
    color: $text-primary;
  }

  &__role {
    font-size: 1.1rem;
    color: $text-secondary;
    margin: 0 0 1rem;
  }

  &__meta {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    margin-bottom: 1.5rem;

    @media (min-width: $tablet) {
      display: none;
    }

    p {
      font-size: 0.9rem;
      color: $text-secondary;
      margin: 0;
    }
  }

  &__copy {
    font-size: clamp(1.05rem, 2vw, 1.2rem);
    line-height: 1.6;
    color: $text-secondary;
    margin: 0 0 2rem;
    max-width: 28rem;
  }

  &__ctas {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  &__cta {
    display: inline-block;
    font-size: 0.95rem;
    font-weight: 600;
    color: $surface;
    background: $text-primary;
    text-decoration: none;
    padding: 0.8rem 1.75rem;
    border-radius: 980px;
    transition: background 0.2s ease, transform 0.2s ease, color 0.2s ease;

    &:hover {
      background: $orange;
      transform: scale(1.02);
    }

    &--secondary {
      color: $text-primary;
      background: transparent;
      box-shadow: inset 0 0 0 1.5px $border-light;

      &:hover {
        color: $surface;
        background: $text-primary;
        box-shadow: none;
      }
    }
  }

  &__bento {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 0.75rem;
    align-items: stretch;

    @media (min-width: $tablet) {
      gap: 1rem;
      min-height: 18rem;
    }
  }

  &__tile {
    background: $surface;
    border-radius: $tile-radius;
    box-shadow: $tile-shadow;
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    min-height: 7rem;

    &--portrait {
      grid-row: span 2;
      padding: 0;
      overflow: hidden;
      min-height: 13rem;

      @media (min-width: $tablet) {
        min-height: 18rem;
      }
    }

    &--location,
    &--role {
      justify-content: space-between;
      gap: 1rem;
    }

    &--location {
      grid-column: 2;
    }

    &--role {
      grid-column: 2;
    }
  }

  &__portrait-wrap {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding: 1rem 0.5rem 0;

    img {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: contain;
      object-position: bottom center;
    }
  }

  &__tile-icon {
    width: 2rem;
    height: 2rem;
    color: $orange;
    flex-shrink: 0;
  }

  &__tile-content {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }

  &__tile-label {
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: $text-secondary;
  }

  &__tile-value {
    font-size: 1.05rem;
    font-weight: 600;
    color: $text-primary;
    line-height: 1.35;
  }
}
</style>
