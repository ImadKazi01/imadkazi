<script setup>
import { ref, onMounted } from 'vue'
import data from '../../data/what-i-do.json'

const props = defineProps({
  services: {
    type: Array,
    default: () => data
  }
})

const componentRef = ref(null)
const activeTab = ref(0)

onMounted(() => {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('what-i-do__fade-in')
      } else {
        entry.target.classList.remove('what-i-do__fade-in')
      }
    })
  }, options)

  observer.observe(componentRef.value)
})
</script>

<template>
  <div class="what-i-do" ref="componentRef">
    <div class="what-i-do__buttons">
      <button
        v-for="(tab, index) in props.services"
        :key="index"
        :class="{ active: activeTab === index }"
        @click="activeTab = index"
      >
        {{ tab.title }}
      </button>
    </div>

    <div class="what-i-do__content">
      <div
        v-for="(tab, index) in props.services"
        :key="index"
        :class="{ active: activeTab === index }"
        v-show="activeTab === index"
        class="what-i-do__content-item"
      >
        <div class="what-i-do__content-item-text">
          <h2>{{ tab.title }}</h2>
          <p>{{ tab.content }}</p>
        </div>
        <div class="what-i-do__content-item-icon">
          <img :src="tab.image" alt="What I Do" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../../scss/global.scss';

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(5rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}



.what-i-do {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  background: $black;
  color: $white;
  font-family: $font-family;
  padding: 1rem;
  margin: 2rem 0;
  opacity: 0;
  transform: translateY(5rem);
  transition: all 0.5s ease-in-out;

  &__fade-in {
    opacity: 1;
    transform: translateY(0);
  }

  &__buttons {
    display: flex;
    width: 100%;
    gap: 2rem;
    margin-bottom: 2rem;
    overflow: scroll;

    @media (min-width: $tablet) {
      justify-content: center;
      gap: 3rem;
      margin-bottom: 2rem;
    }

    @media (min-width: $desktopSmall) {
      gap: 4rem;
    }

    /* Hide the scrollbar */
    scrollbar-width: thin;
    scrollbar-color: transparent transparent;

    /* WebKit (Safari/Chrome) */
    &::-webkit-scrollbar {
      width: 0.1px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-color: transparent;
    }
  }

  &__buttons button {
    border: none;
    background-color: transparent;
    padding: 0.2rem;
    cursor: pointer;
    font-size: 1.5rem;
    color: rgba($white, 0.7);
    transition: color 0.3s;

    @media (min-width: $desktopSmall) {
      font-size: 1.7rem;
    }

    &:after {
      content: '';
      display: block;
      width: 0%;
      height: 2px;
      margin-top: 0.5rem;
      background-color: $orange;
      transition: all 0.3s ease-in-out;
    }
  }

  &__buttons button.active {
    color: $orange;

    &:after {
      content: '';
      display: block;
      width: 100%;
      height: 2px;
      background-color: $orange;
    }
  }

  &__content-item {
    display: none;
    animation: fade-in 1s;

    &-icon {
      margin-bottom: 1rem;
      width: 100%;

      @media (min-width: $tablet) {
        margin-bottom: 0;
      }
      img {
        width: 100%;
        height: auto;
        animation: imageAnimate 0.5s ease-in-out;
      }
    }

    &-text {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;

      @media (min-width: $desktopSmall) {
        max-width: 60%;
      }

      h2 {
        font-size: 2rem;
        font-weight: bold;
        letter-spacing: 0.1rem;
        text-transform: uppercase;
        margin: 0;
        letter-spacing: 0.3rem;

        @media (min-width: $tablet) {
          font-size: 3.4rem;
          letter-spacing: 0.7rem;
        }
      }

      p {
        font-size: 1.2rem;
        line-height: 1.5;
        margin: 0;
        width: 100%;

        @media (min-width: $tablet) {
          font-size: 1.6rem;
          line-height: 1.2;
          width: 80%;
        }
      }
    }
  }

  &__content-item.active {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    gap: 1rem;

    @media (min-width: $desktopSmall) {
      flex-direction: row;
      justify-content: center;
      gap: 3rem;
    }
  }
}
</style>
