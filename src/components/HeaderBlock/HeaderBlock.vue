<script setup>
import { ref } from 'vue'
import data from '@/data/routes'

const showMenu = ref(false)

const toggleMenu = () => {
  showMenu.value = !showMenu.value
}

const props = defineProps({
  backgroundColor: {
    type: Object
  },
  routes: {
    type: Array,
    default: () => data
  }
})
</script>

<template>
  <nav class="navbar">
    <a href="/" class="navbar__logo">
      <span>Imad</span>
      <span>Kazi</span>
    </a>
    <div class="navbar__btn">
      <span @click="toggleMenu">MENU</span>
    </div>
    <div
      class="navbar__menu"
      :style="{ backgroundColor: props.backgroundColor }"
      :class="showMenu ? 'navbar__menu--active' : ''"
    >
      <span @click="toggleMenu" class="navbar__btn navbar__btn-close">CLOSE</span>
      <ul class="navbar__menu-links-container">
        <li class="navbar__menu-title">MENU</li>
        <li v-for="route in routes" :key="route.name">
          <a :href="route.url">{{ route.title }}</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
@import '../../scss/global.scss';

@mixin tr {
  transition: all 0.4s ease-in-out;
  //transition-delay: .2s;
}

@keyframes navAnimate {
  from {
    opacity: 0;
    transform: translateY(calc(-10vh));
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #181818;
  color: $white;
  padding: 1rem 2rem;
  animation: navAnimate 0.5s ease-in-out;
  animation-fill-mode: backwards;
  width: 100%;

  @media (min-width: $tablet) {
    max-width: 1440px;
  }

  &__logo {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: $font-family;
    font-size: 1.6rem;
    font-weight: bold;
    letter-spacing: 1rem;
    text-transform: uppercase;
    line-height: 1;
    text-decoration: none;

    @media (min-width: $tablet) {
      flex-direction: row;
      gap: 1rem;
    }
  }

  &__btn {
    cursor: pointer;
    letter-spacing: 5px;
    font-family: $font-family;
    font-weight: bold;
    font-size: 1.6rem;
    letter-spacing: 0.6rem;

    @media (min-width: $tablet) {
      letter-spacing: 1rem;
    }

    &:hover {
      color: $orange;
    }

    span {
      display: block;
      margin: 5px 0;
      font-family: $font-family;
      @include tr;
    }

    &-close {
      position: fixed;
      top: 2rem;
      right: 1rem;
      font-size: 1.6rem !important;
      letter-spacing: 0.6 rem;

      @media (min-width: $tablet) {
        top: 3.4rem;
        right: 3rem;
        letter-spacing: 1rem;
      }
    }
  }

  &__menu {
    z-index: 1111;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba($color: #151515, $alpha: 0.99);
    width: 100%;
    height: 100vh;
    overflow: hidden;
    display: flex;
    font-family: $font-family;
    flex-direction: column;
    justify-content: center;
    transform: translateX(calc(-100vw));
    @include tr;

    span {
      color: white;
      font-family: $font-family;
      font-size: 48px;
      cursor: pointer;
    }

    &--active {
      transform: translateX(0) !important;
    }

    &-links-container {
      list-style-type: none;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 2rem;
      align-items: flex-start;
      gap: 0.7rem;
      width: 100%;
      height: 100vh;

      @media (min-width: $tablet) {
        padding: 7rem;
      }

      a {
        width: 100%;
        height: 400px;
        font-family: $font-family;
        font-size: 3rem;
        line-height: 1;
        letter-spacing: 1rem;
        text-decoration: none;
        color: whitesmoke;
        text-transform: uppercase;
      
        @include tr;
        position: relative;

        @media (min-width: $tablet) {
          font-size: 4.5rem;
        }

        &:hover {
          color: $orange;
          font-size: 3.2rem;
          margin-left: 10px;

          @media (min-width: $tablet) {
            font-size: 5.5rem;
          }
        }

        &:before {
          color: whitesmoke;
        }
      }
    }

    &-title {
      color: white;
      font-size: 1rem;
      opacity: 0.4;
      letter-spacing: 10px;
    }
  }
}
</style>
