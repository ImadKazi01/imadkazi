<script setup>
import { ref } from 'vue'
import { ChevronDownIcon } from '@heroicons/vue/24/outline'

defineProps({
  experience: Array,
  education: Array
})

const openJobs = ref(new Set([0]))

const toggleJob = (index) => {
  const next = new Set(openJobs.value)
  if (next.has(index)) {
    next.delete(index)
  } else {
    next.add(index)
  }
  openJobs.value = next
}

const isOpen = (index) => openJobs.value.has(index)
</script>

<template>
  <section id="experience" class="resume">
    <h2 class="resume__heading">Experience</h2>

    <ol class="resume__timeline">
      <li
        v-for="(job, index) in experience"
        :key="`${job.company}-${job.period}`"
        class="resume__entry"
      >
        <span class="resume__marker" aria-hidden="true" />
        <div class="resume__content">
          <button
            type="button"
            class="resume__toggle"
            :aria-expanded="isOpen(index)"
            @click="toggleJob(index)"
          >
            <div class="resume__toggle-main">
              <h3>{{ job.title }}</h3>
              <p class="resume__company">{{ job.company }}</p>
              <div class="resume__meta resume__meta--mobile">
                <time>{{ job.period }}</time>
                <span>{{ job.location }}</span>
              </div>
            </div>
            <ChevronDownIcon class="resume__chevron" :class="{ 'resume__chevron--open': isOpen(index) }" />
          </button>

          <div class="resume__top resume__top--desktop">
            <div>
              <h3>{{ job.title }}</h3>
              <p class="resume__company">{{ job.company }}</p>
            </div>
            <div class="resume__meta">
              <time>{{ job.period }}</time>
              <span>{{ job.location }}</span>
            </div>
          </div>

          <div class="resume__details" :class="{ 'resume__details--open': isOpen(index) }">
            <p class="resume__desc">{{ job.description }}</p>
            <ul v-if="job.achievements?.length" class="resume__achievements">
              <li v-for="item in job.achievements" :key="item">{{ item }}</li>
            </ul>
          </div>
        </div>
      </li>
    </ol>

    <h3 class="resume__subheading">Education</h3>

    <ul class="resume__education">
      <li v-for="item in education" :key="item.degree" class="resume__edu">
        <h3>{{ item.degree }}</h3>
        <p class="resume__edu-school">{{ item.school }} · {{ item.year }}</p>
        <p class="resume__edu-detail">{{ item.description }}</p>
      </li>
    </ul>
  </section>
</template>

<style lang="scss" scoped>
.resume {
  padding: 4rem 0;

  &__heading {
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    font-weight: 700;
    letter-spacing: -0.02em;
    color: $text-primary;
    margin: 0 0 1.5rem;
  }

  &__subheading {
    font-size: 1.15rem;
    font-weight: 700;
    letter-spacing: -0.01em;
    color: $text-primary;
    margin: 3rem 0 1.25rem;
  }

  &__timeline {
    list-style: none;
    margin: 0;
    padding: 0 0 0 1.5rem;
    border-left: 2px solid $border-light;
  }

  &__entry {
    position: relative;
    padding: 0 0 1.25rem 0;
    margin-right: -1.5rem;

    &:last-child {
      padding-bottom: 0;
    }

    @media (min-width: $tablet) {
      padding: 0 0 2rem 1.5rem;
      margin-right: 0;
    }
  }

  &__marker {
    position: absolute;
    left: -1.6rem;
    top: 0.35rem;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: $page-bg;
    border: 2px solid $orange;
    transform: translateX(-50%);
  }

  &__toggle {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0.75rem;
    width: 100%;
    padding: 0;
    margin-bottom: 0;
    background: none;
    border: none;
    cursor: pointer;
    text-align: left;

    @media (min-width: $tablet) {
      display: none;
    }

    h3 {
      font-size: 1.05rem;
      font-weight: 700;
      margin: 0 0 0.15rem;
      color: $text-primary;
    }
  }

  &__toggle-main {
    flex: 1;
    min-width: 0;
  }

  &__chevron {
    width: 1.25rem;
    height: 1.25rem;
    color: $text-secondary;
    flex-shrink: 0;
    margin-top: 0.15rem;
    transition: transform 0.25s ease;

    &--open {
      transform: rotate(180deg);
    }
  }

  &__top--desktop {
    display: none;
    flex-direction: column;
    gap: 0.35rem;
    margin-bottom: 0.6rem;

    @media (min-width: $tablet) {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-start;
      gap: 1.5rem;
    }

    h3 {
      font-size: 1.1rem;
      font-weight: 700;
      margin: 0 0 0.15rem;
      color: $text-primary;
    }
  }

  &__company {
    font-size: 0.95rem;
    color: $text-secondary;
    margin: 0;
  }

  &__meta {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    flex-shrink: 0;

    @media (min-width: $tablet) {
      text-align: right;
    }

    &--mobile {
      margin-top: 0.35rem;
      text-align: left;
    }

    time {
      font-size: 0.85rem;
      font-weight: 600;
      color: $orange;
    }

    span {
      font-size: 0.8rem;
      color: $text-secondary;
    }
  }

  &__details {
    display: none;

    &--open {
      display: block;
      padding-top: 0.75rem;
    }

    @media (min-width: $tablet) {
      display: block;
      padding-top: 0;
    }
  }

  &__desc {
    font-size: 0.95rem;
    line-height: 1.65;
    color: $text-secondary;
    margin: 0 0 0.75rem;
    max-width: 40rem;
  }

  &__achievements {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
    max-width: 40rem;

    li {
      font-size: 0.9rem;
      line-height: 1.55;
      color: $text-secondary;
      padding-left: 1rem;
      position: relative;

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0.55em;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: $orange;
      }
    }
  }

  &__education {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 1.25rem;

    @media (min-width: $tablet) {
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
    }
  }

  &__edu {
    background: $surface;
    border-radius: $tile-radius;
    box-shadow: $tile-shadow;
    padding: 1.25rem;

    h3 {
      font-size: 1rem;
      font-weight: 700;
      margin: 0 0 0.35rem;
      color: $text-primary;
    }
  }

  &__edu-school {
    font-size: 0.85rem;
    color: $text-secondary;
    margin: 0 0 0.35rem;
  }

  &__edu-detail {
    font-size: 0.85rem;
    color: $text-primary;
    margin: 0;
  }
}
</style>
