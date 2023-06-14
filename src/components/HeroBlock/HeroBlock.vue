<script setup></script>
<template>
  <div class="hero">
    <div class="hero__content">
      <h1>Hi, I'm Imad</h1>
      <p>A designer, developer & photography based in Huddersfield.</p>
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
    transform: translateY(100px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes imageAnimate {
  from {
    opacity: 0;
    transform: translateY(-100px);
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
  gap: 3rem;
  width: 100%;
  font-family: $font-family;
  color: $white;
  background: $black;
  padding: 7rem 2rem 3rem;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 10rem;
    padding: 12rem 0 5rem;
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

    @media (min-width: 768px) {
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
    color: $white;
    font-weight: bold;
    text-align: center;
    animation: contentAnimate 0.5s ease-in-out;
    animation-delay: 1s;
    animation-fill-mode: backwards;

    @media (min-width: 768px) {
      max-width: 900px;
      text-align: left;
      animation-delay: 0.5s;
    }

    h1 {
      font-size: 3.3rem;
      margin-top: -20px;
      @media (min-width: 768px) {
        font-size: 8.5rem;
        max-width: 10em;
        letter-spacing: -0.03em;
        margin: 0;
      }
    }
    p {
      font-size: 1.5rem;
      max-width: 24em;
      line-height: 1.45;
      font-weight: normal;
    }
  }
}
</style>
