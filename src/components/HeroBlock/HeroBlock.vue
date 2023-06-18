<script setup>
import data from '../../data/hero.json'

const props = defineProps({
  buttonStyle: {
    type: String,
    default: 'primary'
  },
  title: {
    type: String,
    default: () => data.title
  },
  copy: {
    type: String,
    default: () => data.copy
  },
  ctaLink: {
    type: String,
    default: () => data.ctaLink
  },
  ctaText: {
    type: String,
    default: () => data.ctaText
  }
})
</script>
<template>
  <div class="hero">
    <div class="hero__content">
      <h1>{{ title }}</h1>
      <p>{{ copy }}</p>
      <a
        :href="ctaLink"
        class="btn"
        :class="{
          'btn-primary': props.buttonStyle === 'primary',
          'btn-secondary': props.buttonStyle === 'secondary',
          '': props.buttonStyle === ''
        }"
        >{{ ctaText }}</a
      >
    </div>
    <div class="hero__img">
      <img src="../../assets/memoji.png" alt="Hero Image" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../../scss/global.scss';

@keyframes contentAnimate {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes imageAnimate {
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero {
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  width: 100%;
  height: 75vh;
  font-family: $font-family;
  color: $white;
  background: $black;

  @media (min-width: $tablet) {
    gap: 3rem;
    height: 85vh;
  }

  @media (min-width: $desktopSmall) {
    flex-direction: row;
    gap: 6rem;
    height: 75vh;
  }

  &__img {
    width: 100%;
    max-width: 250px;
    height: auto;
    background: $orange;
    border: solid 0.45rem $white;
    border-radius: 50%;
    animation: imageAnimate 0.5s ease-in-out;
    animation-delay: 0.5s;
    animation-fill-mode: backwards;

    @media (min-width: $desktopSmall) {
      animation-delay: 1s;
    }

    img {
      width: 100%;
      height: auto;
      border-radius: 50%;
    }

    @media (min-width: 768px) {
      max-width: 400px;
      border: solid 0.6rem $white;
    }
  }

  &__content {
    display: block;
    flex-direction: column;
    color: $white;
    font-weight: bold;
    text-align: center;
    animation: contentAnimate 0.5s ease-in-out;
    animation-delay: 1.5s;
    animation-fill-mode: backwards;
    padding: 1rem;

    @media (min-width: $desktopSmall) {
      text-align: left;
      animation-delay: 0.5s;
    }

    h1 {
      font-size: 3rem;
      line-height: 1;
      margin-bottom: 1rem;

      @media (min-width: $tablet) {
        font-size: 4.5rem;
        margin-bottom: 2rem;
      }

      @media (min-width: $desktopSmall) {
        font-size: 6rem;
        letter-spacing: 0.03rem;
      }
    }

    p {
      font-size: 1.4rem;
      max-width: 24em;
      line-height: 1.2;
      font-weight: normal;
      margin-bottom: 3rem;

      @media (min-width: $tablet) {
        font-size: 1.7rem;
        padding: 0;
        letter-spacing: 0.02rem;
      }

      @media (min-width: $desktopSmall) {
        padding: 0;
        letter-spacing: -0.03rem;
      }
    }
  }
}
</style>
