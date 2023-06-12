<script setup>
import { ref } from 'vue'

const showMenu = ref(false)

const toggleMenu = () => {
  showMenu.value = !showMenu.value
}

const props = defineProps({
  backgroundColor: {
    type: Object,
  },
})
</script>

<template>
  <nav class="navbar">
    <div class="navbar__logo">
      <span>Imad</span>
      <span>Kazi</span>
    </div>
    <div class="navbar__btn">
      <span @click="toggleMenu">MENU</span>
    </div>
    <div class="navbar__menu" :style="{backgroundColor: props.backgroundColor}" :class="showMenu ? 'navbar__menu--active' : ''">
      <span @click="toggleMenu" class="navbar__btn navbar__btn-close">CLOSE</span>
      <ul class="navbar__menu-links-container">
        <li class="navbar__menu-title">MENU</li>
        <li>
          <a href="" class="home">HOME</a>
        </li>
        <li>
          <a href="" class="places">WORK</a>
        </li>
        <li>
          <a href="" class="about">ABOUT</a>
        </li>
        <li>
          <a href="" class="contact">CONTACT</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
@import '../../scss/rescources.scss';

@mixin tr {
  transition: all 0.4s ease-in-out;
  //transition-delay: .2s;
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  &__logo {
    font-family: $font-family;
    font-size: 1.4rem;
    font-weight: bold;
    letter-spacing: 1rem;
    text-transform: uppercase;
  }
  &__btn {
    cursor: pointer;
    letter-spacing: 5px;
    font-family: $font-family;
    font-weight: bold;
    font-size: 1.4rem;
    letter-spacing: 1rem;

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
      top: 3.4rem;
      right: 3rem;
      font-size: 1.4rem !important;
      letter-spacing: 1rem;
    }
  }

  &__menu {
    @include tr;
    z-index: 1111;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba($color: #151515, $alpha: 0.98);
    width: 100%;
    height: 100vh;
    overflow: hidden;
    display: flex;
    font-family: $font-family;
    flex-direction: column;
    justify-content: center;
    transform: translateX(-200rem);
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
      padding: 10rem;
      align-items: flex-start;
      gap: 1.5rem;
      width: 100%;
      height: 100vh;

      a {
        width: 100%;
        height: 400px;
        font-family: $font-family;
        font-size: 4rem;
        letter-spacing: 1rem;
        text-decoration: none;
        color: whitesmoke;
        @include tr;
        position: relative;

        &:hover {
          color: $orange;
          font-size: 4.5rem;
          margin-left: 10px;
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
