<script setup>
import { ref, onMounted } from 'vue'
import data from '../../data/work.json'

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
  return `${(encodeURIComponent, caseStudies.path)}`
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
      <h2 class="case-study__header-title">Featured Work</h2>
    </div>
    <div class="case-study__grid">
      <a
        :href="getCaseStudyLink(item)"
        class="case-study__grid-item"
        v-for="(item, index) in props.caseStudies"
        :key="item.id"
        :class="{
          'case-study__grid-item--large':
            index % 7 === 0 || index % 7 === 1 || index % 7 === 5 || index % 7 === 6,
          'case-study__grid-item--small':
            (index % 7 >= 2 && index % 7 <= 4) || (index % 7 >= 8 && index % 7 <= 10)
        }"
      >
        <div class="case-study__image-container">
          <figure class="case-study__image">
            <img :src="item.img" alt="case study" />
            <a :href="getCaseStudyLink(item)" class="case-study__cta">
              <h4 class="case-study__title">{{ item.title }}</h4>
            </a>
            <div class="case-study__overlay">
              <span>{{ item.services.join(' • ') }}</span>
              <p>{{ item.desc }}</p>
            </div>
          </figure>
        </div>
      </a>
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

.case-study {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 1440px;
  padding: 0rem 2rem;
  margin: 1rem auto;
  opacity: 0;
  transform: translateY(5rem);
  transition: all 0.5s ease-in-out;

  @media (min-width: $desktopSmall) {
    padding: 0;
    margin: 3rem 0;
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
    color: $white;
    font-size: $h2-font-size;
    font-weight: bold;
    line-height: 1;
    margin-bottom: 0;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 24px;
    width: 100%;

    @media (max-width: 992px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 760px) {
      grid-template-columns: 1fr;
    }
  }

  &__grid-item {
    display: flex;
    flex-direction: column;
    height: 0;
    padding-top: 100%; /* Make it square */
    position: relative;

    & > .case-study__image-container {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    &--large {
      @media (min-width: 992px) {
        grid-column: span 3; /* Take half the width on desktop */
        padding-top: 60%;
      }
    }

    &--small {
      @media (min-width: 992px) {
        grid-column: span 2; /* Take one-third the width on desktop */
      }
    }
  }

  &__image-container {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
    border-radius: 0.5rem;
  }

  &__image {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 0.5rem;
    transition: all 0.5s ease-in-out;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }

    .case-study__cta {
      position: absolute;
      bottom: 10px;
      left: 10px;
      font-size: 1.2rem;
      font-weight: bold;
      color: $orange;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      z-index: 2;
      text-decoration: none;
      transition: background-color 0.3s ease-in-out;

      &:hover {
        background-color: rgba(0, 0, 0, 0.7);
      }
    }

    .case-study__overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.7);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      opacity: 0;
      transition: opacity 0.3s ease-in-out;
      padding: 1rem;
      color: $white;
      text-align: center;
      z-index: 1;

      span {
        display: block;
        margin-bottom: 1rem;
        font-size: 1.1rem;
      }

      p {
        margin-bottom: 1rem;
        font-size: 1.1em;
      }

      .btn {
        border: none;
        padding: 0;
        font-size: 1.1rem;

        &:hover {
          background: transparent;
        }
      }
    }

    &:hover .case-study__overlay {
      opacity: 1;
    }
  }
}
</style>
