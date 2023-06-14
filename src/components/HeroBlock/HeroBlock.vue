<script setup></script>
<template>
  <div class="hero">
    <div class="hero__content">
      <h1>Hi, I'm Imad</h1>
      <p>A designer, developer & photography based in Huddersfield.</p>
    </div>
    <img class='hero__img' src="../../assets/memoji.png" alt="Hero Image" />
  </div>
</template>

<style lang="scss" scoped>
@import '../../scss/global.scss';

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
  padding: 7rem 2rem;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 6rem;
    padding: 13rem 0;
  }

  &__img {
    width: 100%;
    max-width: 250px;
    height: auto;
    background: $orange;
    outline: solid 0.45rem $white;
    border-radius: 50%;
    
    @media (min-width: 768px) {
      max-width: 400px;
      outline: solid 0.6rem $white;
    }
  }

  &__content {
    color: $white;
    font-weight: bold;
    text-align: center;
    @media (min-width: 768px) {
      max-width: 900px;
      text-align: left;
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
