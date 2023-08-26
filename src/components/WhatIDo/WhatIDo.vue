<script setup>
import { ref, onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination } from 'swiper/modules'
import data from '../../data/service.json'

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

const swiperConfig = {
  autoplay: {
    delay: 5000,
    disableOnInteraction: false
  },
  pagination: {
    clickable: true
  },
  loop: true,
  modules: [Autoplay, Pagination],
  slidesPerView: 1
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
    <Swiper class="what-i-do__swiper" v-bind="swiperConfig">
      <SwiperSlide class="what-i-do__swiper-slide" v-for="slide in props.services" :key="slide.id">
        <div class="what-i-do__content">
          <div class="what-i-do__content-item-text">
            <h2>{{ slide.title }}</h2>
            <p>{{ slide.desc }}</p>
            <a :href="getServiceLink(slide)" class="btn btn-primary">{{
              getServiceButtonText(slide)
            }}</a>
          </div>
          <div class="what-i-do__content-item-icon">
            <img :src="slide.image" alt="What I Do" />
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
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
  max-width: 100vw;
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

  &__content {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    gap: 2rem;
    width: 100%;
    height: 100%;
    padding: 2rem 0;
    text-align: center;

    @media (min-width: $desktopSmall) {
      flex-direction: row;
      justify-content: center;
      gap: 3rem;
      padding: 4rem 0;
      text-align: start;
    }
  }

  &__content-item {
    display: none;
    animation: fade-in 1s;

    &-icon {
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

    &-text {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      margin-bottom: 2rem;

      @media (min-width: $desktopSmall) {
        align-items: flex-start;
        max-width: 60%;
        gap: 2rem;
        margin: 0;
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
        margin-bottom: 1rem;
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

  &__fade-in {
    animation: fade-in 1s ease-in-out;
  }

  &__swiper {
    width: 100%;
    height: 100%;

    &:deep(.swiper-pagination-bullet) {
      width: 3.4rem;
      height: 0.4rem;
      display: inline-block;
      background: #fff;
      border-radius: 0;
    }

    &:deep(.swiper-pagination-bullet-active) {
      background: $orange;
    }
  }

  &__swiper-slide {
    width: 100%;
    height: 100%;
    padding: 0 2rem;

    @media (min-width: $desktopSmall) {
      padding: 0 11%;
    }
  }
}
</style>
