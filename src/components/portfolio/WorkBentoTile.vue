<script setup>
const MAX_TECH = 5

defineProps({
  title: String,
  img: String,
  link: String,
  services: Array,
  technologies: Array
})

const formatTech = (technologies) => {
  if (!technologies?.length) return ''
  if (technologies.length <= MAX_TECH) return technologies.join(' · ')
  return `${technologies.slice(0, MAX_TECH).join(' · ')} · …`
}
</script>

<template>
  <component
    :is="link ? 'a' : 'div'"
    :href="link || undefined"
    :target="link ? '_blank' : undefined"
    :rel="link ? 'noopener noreferrer' : undefined"
    class="tile"
    :class="{ 'tile--static': !link }"
  >
    <div class="tile__image">
      <img :src="img" :alt="title" loading="lazy" />
    </div>
    <div class="tile__overlay">
      <p v-if="services?.length" class="tile__services">{{ services.join(' · ') }}</p>
      <h3>{{ title }}</h3>
      <p v-if="technologies?.length" class="tile__tech">{{ formatTech(technologies) }}</p>
    </div>
  </component>
</template>

<style lang="scss" scoped>
.tile {
  position: relative;
  display: block;
  border-radius: $tile-radius;
  overflow: hidden;
  background: $surface;
  box-shadow: $tile-shadow;
  text-decoration: none;
  color: $surface;
  aspect-ratio: 16 / 9;

  &:not(.tile--static):hover {
    .tile__image img {
      transform: scale(1.04);
    }
  }

  &--static {
    cursor: default;
  }

  &__image {
    position: absolute;
    inset: 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.45s ease;
    }

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.25);
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;

      @media (max-width: ($tablet - 1px)) {
        opacity: 1;
      }
    }

    &::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 42%;
      background: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.85) 0%,
        rgba(0, 0, 0, 0.35) 55%,
        transparent 100%
      );

      @media (max-width: ($tablet - 1px)) {
        height: 62%;
        background: linear-gradient(
          to top,
          rgba(0, 0, 0, 0.95) 0%,
          rgba(0, 0, 0, 0.8) 30%,
          rgba(0, 0, 0, 0.45) 60%,
          transparent 100%
        );
      }
    }
  }

  &__overlay {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 100%;
    min-height: inherit;
    padding: 1.25rem;

    @media (max-width: ($tablet - 1px)) {
      padding: 1rem;
    }

    h3 {
      font-size: clamp(1rem, 2vw, 1.25rem);
      font-weight: 700;
      margin: 0 0 0.35rem;
      color: $surface;
      text-shadow: 0 1px 8px rgba(0, 0, 0, 0.35);

      @media (max-width: ($tablet - 1px)) {
        font-size: 1.05rem;
      }
    }
  }

  &__services {
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.75);
    margin: 0 0 0.35rem;
    line-height: 1.4;

    @media (max-width: ($tablet - 1px)) {
      color: rgba(255, 255, 255, 0.9);
    }
  }

  &__tech {
    font-size: 0.85rem;
    font-weight: 500;
    letter-spacing: 0.02em;
    color: rgba(255, 255, 255, 0.65);
    margin: 0;
    line-height: 1.4;

    @media (max-width: ($tablet - 1px)) {
      font-size: 0.8rem;
      color: rgba(255, 255, 255, 0.85);
    }
  }
}
</style>
