<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'

defineProps({
  email: String
})

const links = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Capabilities', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' }
]

const menuOpen = ref(false)
const scrolled = ref(false)

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const closeMenu = () => {
  menuOpen.value = false
}

const onScroll = () => {
  scrolled.value = window.scrollY > 12
}

watch(menuOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  document.body.style.overflow = ''
})
</script>

<template>
  <header class="nav" :class="{ 'nav--scrolled': scrolled, 'nav--open': menuOpen }">
    <div class="nav__bar">
      <a href="#" class="nav__logo" @click="closeMenu">Imad Kazi</a>

      <button
        class="nav__toggle"
        :aria-expanded="menuOpen"
        :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
        @click="toggleMenu"
      >
        <span :class="{ open: menuOpen }" />
        <span :class="{ open: menuOpen }" />
      </button>

      <nav class="nav__links nav__links--desktop">
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          class="nav__link"
        >
          {{ link.label }}
        </a>
        <a :href="'mailto:' + email" class="nav__email">{{ email }}</a>
      </nav>
    </div>

    <Transition name="nav-menu">
      <div v-if="menuOpen" class="nav__mobile">
        <nav class="nav__mobile-links">
          <a
            v-for="link in links"
            :key="link.href"
            :href="link.href"
            class="nav__mobile-link"
            @click="closeMenu"
          >
            {{ link.label }}
          </a>
          <a :href="'mailto:' + email" class="nav__mobile-email" @click="closeMenu">
            {{ email }}
          </a>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<style lang="scss" scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 200;
  transition: background 0.3s ease, border-color 0.3s ease;

  &--scrolled,
  &--open {
    .nav__bar {
      background: rgba($page-bg, 0.92);
      backdrop-filter: saturate(180%) blur(20px);
      border-bottom: 1px solid $border-light;
    }
  }

  &__bar {
    width: 100%;
    max-width: $container-max;
    margin: 0 auto;
    padding: 1rem 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    z-index: 202;

    @media (min-width: $tablet) {
      padding: 1rem 2rem;
    }
  }

  &__logo {
    font-size: 0.95rem;
    font-weight: 700;
    color: $text-primary;
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: $orange;
    }
  }

  &__toggle {
    display: flex;
    flex-direction: column;
    gap: 6px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    position: relative;
    z-index: 203;

    @media (min-width: $tablet) {
      display: none;
    }

    span {
      display: block;
      width: 20px;
      height: 1.5px;
      background: $text-primary;
      transition: transform 0.3s ease;

      &:first-child.open {
        transform: translateY(3.75px) rotate(45deg);
      }

      &:last-child.open {
        transform: translateY(-3.75px) rotate(-45deg);
      }
    }
  }

  &__links--desktop {
    display: none;
    align-items: center;
    gap: 2rem;

    @media (min-width: $tablet) {
      display: flex;
    }
  }

  &__link {
    font-size: 0.9rem;
    font-weight: 500;
    color: $text-secondary;
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: $text-primary;
    }
  }

  &__email {
    font-size: 0.85rem;
    font-weight: 500;
    color: $orange;
    text-decoration: none;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.75;
    }
  }

  &__mobile {
    position: fixed;
    inset: 0;
    z-index: 201;
    background: $page-bg;
    padding: 5.5rem 2rem 2rem;
    overflow-y: auto;
  }

  &__mobile-links {
    display: flex;
    flex-direction: column;
    gap: 1.75rem;
  }

  &__mobile-link {
    font-size: 1.75rem;
    font-weight: 600;
    color: $text-primary;
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: $orange;
    }
  }

  &__mobile-email {
    font-size: 1.1rem;
    font-weight: 500;
    color: $orange;
    text-decoration: none;
    margin-top: 0.5rem;
  }
}

.nav-menu-enter-active,
.nav-menu-leave-active {
  transition: opacity 0.25s ease;
}

.nav-menu-enter-from,
.nav-menu-leave-to {
  opacity: 0;
}
</style>
