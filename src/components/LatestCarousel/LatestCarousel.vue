<script setup>
import { ref, onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, FreeMode, Mousewheel } from 'swiper/modules'
import data from '../../data/work.json'

import 'swiper/css'
import 'swiper/css/pagination'

const props = defineProps({
  caseStudies: {
    type: Array,
    default: () => {
      return data
    }
  }
})

const componentRef = ref(null)

const getCaseStudyLink = (caseStudies) => {
  return `/caseStudies/${(encodeURIComponent, caseStudies.title)}`
}

const getCaseStudyButtonText = (caseStudies) => {
  return `Explore ${caseStudies.title}`
}

const swiperConfig = {
  mousewheel: {
    forceToAxis: true,
    releaseOnEdges: true
  },
  freeMode: {
    enabled: true,
    sticky: true
  },
  navigation: {
    prevEl: `.carousel-pager__button--prev`,
    nextEl: `.carousel-pager__button--next`
  },
  slidesPerView: 1.1,
  spaceBetween: 24,
  modules: [Navigation, Mousewheel, FreeMode],
  breakpoints: {
    992: {
      slidesPerView: 2,
      spaceBetween: 22
    },
    760: {
      slidesPerView: 1.5,
      spaceBetween: 22
    }
  }
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
        entry.target.classList.add('case-study__fade-in')
      } else {
        entry.target.classList.remove('case-study__fade-in')
      }
    })
  }, options)

  observer.observe(componentRef.value)
})
</script>

<template>
  <div class="case-study" ref="componentRef">
    <div class="case-study__header">
      <h2 class="case-study__header-title">Latest Work</h2>
    </div>
    <Swiper class="case-study__swiper" v-bind="swiperConfig">
      <SwiperSlide
        class="case-study__swiper-slide"
        v-for="slide in props.caseStudies"
        :key="slide.id"
      >
        <h4 class="case-study__title">{{ slide.title }}</h4>
        <div class="case-study__content">
          <figure class="case-study__image">
            <img :src="slide.img" alt="case study" />
          </figure>
          <div v-if="index === activeIndex" class="case-study__text">
            <span>{{ slide.services.join(' • ') }}</span>
            <p>{{ slide.listing }}</p>
            <a :href="getCaseStudyLink(slide)" class="btn btn-primary">
              {{ getCaseStudyButtonText(slide) }}
            </a>
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

.case-study {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 1440px;
  padding: 1rem 2rem;
  margin: 2rem auto;
  opacity: 0;
  transform: translateY(5rem);
  transition: all 0.5s ease-in-out;

  @media (min-width: $desktopSmall) {
    margin: 5rem 0;
  }

  &__fade-in {
    opacity: 1;
    transform: translateY(0);
  }

  &__header {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 2rem;
    gap: 2rem;

    @media (min-width: $desktopSmall) {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  }

  &__header-title {
    color: $orange;
    font-size: $h2-font-size;
    font-weight: bold;
    line-height: 1;
    margin-bottom: 0;
  }

  &__swiper {
    width: 100%;
    overflow: visible;
  }

  &__swiper-slide {
    display: flex;
    flex-direction: column;
    height: auto;
  }

  &__title {
    font-size: 28px;
    font-weight: 500;
    text-transform: capitalize;
    margin-bottom: 0;
    color: $white;
    animation: fade-in 0.5s ease-in-out;
    animation-fill-mode: backwards;
  }

  &__content {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }

  &__image {
    position: relative;
    width: 100%;
    overflow: hidden;
    border-radius: 0.5rem;
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.5);
    transition: all 0.5s ease-in-out;
    margin: 2rem 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }

  &__text {
    span {
      display: block;
      margin-bottom: 1rem;
    }

    p {
      margin-bottom: 1rem;
    }

    .btn {
      border: none;
      padding: 0;

      &:hover {
        background: transparent;
      }
    }
  }
}
</style>
