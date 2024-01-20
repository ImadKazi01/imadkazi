<script setup>
import { ref, onMounted } from 'vue'
import data from '../../data/service.json'
import * as HeroIcons from '@heroicons/vue/20/solid'

import 'swiper/css'
import 'swiper/css/pagination'

const props = defineProps({
  services: {
    type: Array,
    default: () => {
      return data
    }
  }
})

const componentRef = ref(null)

const getServiceLink = (services) => {
  return `/services/${encodeURIComponent(services.title)}`
}

const getServiceButtonText = (services) => {
  return `Explore ${services.title}`
}

const getIconComponent = (iconName) => {
  // Return the corresponding icon component or a default one if not found
  return HeroIcons[iconName] || HeroIcons['ArrowRightIcon']
}

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
      }
    })
  }, options)

  observer.observe(componentRef.value)
})
</script>

<template>
  <div class="what-i-do" ref="componentRef">
    <div class="what-i-do__header">
      <div class="what-i-do__header--headings">
        <span class="what-i-do__header--subtitle"> My Services </span>
        <h2 class="what-i-do__header--title">Providing a wide range of digital services</h2>
      </div>
      <p class="what-i-do__header--meta">
        With expertise in photography, design, and development, offering a spectrum of digital
        services that capture the essence of your brand, craft visually stunning designs, and
        develop seamless digital experiences.
      </p>
    </div>
    <div class="what-i-do__grid">
      <div class="what-i-do__item" v-for="service in props.services" :key="service.id">
        <div class="what-i-do__item--heading">
          <component :is="getIconComponent(service.icon)" class="what-i-do__item--icon" />
          <h5 class="what-i-do__item--title">
            {{ service.title }}
          </h5>
        </div>
        <p class="what-i-do__item--text">{{ service.keyword }}</p>
        <ul class="what-i-do__item--list">
          <li v-for="item in service.software" :key="item.id">{{ item.name }}</li>
        </ul>
        <a :href="getServiceLink(service)" class="what-i-do__cta"
          >{{ getServiceButtonText(service) }}
          <component :is="getIconComponent()" class="what-i-do__cta--icon"
        /></a>
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
  max-width: 1440px;
  padding: 1rem 2rem;
  opacity: 0;
  transform: translateY(5rem);
  transition: all 0.5s ease-in-out;

  &__fade-in {
    opacity: 1;
    transform: translateY(0);
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 2rem;

    @media (min-width: $desktopSmall) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  &__header {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 3rem;
    gap: 2rem;

    @media (min-width: $desktopSmall) {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }

    &--headings {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      gap: 1rem;

      @media (min-width: $desktopSmall) {
        width: 40%;
      }
    }

    &--meta {
      font-size: 1.4rem;
      margin-bottom: 0;

      @media (min-width: $desktopSmall) {
        width: 60%;
      }
    }

    &--subtitle {
      font-size: 1rem;
      font-weight: bold;
      text-transform: uppercase;
      color: $orange;
    }

    &--title {
      font-size: $h2-font-size;
      font-weight: bold;
      line-height: 1;
      margin-bottom: 0;
    }
  }

  &__item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    padding: 2rem;
    gap: 1rem;
    border-radius: 1rem;
    border: 2px dashed $teal;
    color: $white;
    height: 100%;
    animation: fade-in 1s ease-in-out;

    @media (min-width: $desktopSmall) {
      height: 100%;
    }

    &--heading {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
    }

    &--text {
      font-size: $paragraph-font-size;
      margin-bottom: 0;
      flex-grow: 1;
    }

    &--title {
      text-transform: uppercase;
      font-weight: bold;
      margin-bottom: 0;
    }

    &--icon {
      width: 2rem;
    }

    &--list {
      list-style: inside;
      padding: 0;
      margin: 0;
      font-weight: bold;
      text-transform: uppercase;
      margin-bottom: 0;
      flex-grow: 1;

      li {
        margin-bottom: 0.5rem;
      }
    }
  }

  &__cta {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    text-transform: capitalize;
    font-size: 1.2rem;
    transition: all 0.5s ease-in-out;

    &--icon {
      width: 1.5rem;
      margin-left: 0.2rem;
      transition: all 0.3s ease-in-out;
      color: $white;
    }

    &:hover {
      color: $teal;

      &:deep(.what-i-do__cta--icon) {
        color: $teal;
        margin-left: 0.5rem;
      }
    }
  }
}
</style>
