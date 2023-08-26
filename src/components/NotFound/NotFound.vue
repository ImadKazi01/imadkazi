<template>
  <div class="not-found">
    <div class="not-found__img">
      <img src="../images/404.png" alt="404" />
    </div>
    <div class="not-found__content">
      <span class="not-found__code">404</span>
      <h1 class="not-found__header">Looks like you're lost</h1>
      <p class="not-found__copy">Sorry, we can't find the page you're looking for. Let's get you back!</p>
      <a href="/" class="btn btn-primary">Back home</a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../../scss/global.scss';

.not-found {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin-top: 1rem;

  @media (min-width: $tablet) {
   margin-top: 3rem;
  }

  &__img {
    margin-bottom: 1rem;
    width: 100%;
    max-width: 300px;

    @media (min-width: $tablet) {
      margin-bottom: 0;
      max-width: 400px;
    }

    img {
      width: 100%;
      height: auto;
      animation: imageAnimate 0.5s ease-in-out;
      background: $white;
      border: solid 0.5rem $orange;
      border-radius: 50%;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  &__code {
    font-size: $h4-font-size;
    color: $white;
  }

  &__header {
    font-size: $h3-font-size;
    color: $white;
    margin-bottom: 1rem;

    @media (min-width: $tablet) {
      font-size: $h2-font-size;
    }
  }
}
</style>
