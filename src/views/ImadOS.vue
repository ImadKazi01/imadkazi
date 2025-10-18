<script setup>
import { ref, computed, onMounted } from 'vue'
import TopBar from '../components/ImadOS/TopBar.vue'
import Dock from '../components/ImadOS/Dock.vue'
import AppWindow from '../components/ImadOS/AppWindow.vue'
import LoadingScreen from '../components/LoadingScreen.vue'
import AboutWindow from '../components/ImadOS/windows/AboutWindow.vue'
import WorkWindow from '../components/ImadOS/windows/WorkWindow.vue'
import ServicesWindow from '../components/ImadOS/windows/ServicesWindow.vue'
import ContactWindow from '../components/ImadOS/windows/ContactWindow.vue'
import ResumeWindow from '../components/ImadOS/windows/ResumeWindow.vue'
import {
  openApp,
  setActiveWindow,
  closeApp,
  minimizeApp,
  restoreApp,
  maximizeApp,
  moveApp,
  resizeApp
} from '../utils/windowManager.js'

// Mobile detection
const isMobile = computed(() => {
  if (typeof window === 'undefined') return false
  return window.innerWidth <= 768
})

const openApps = ref([
  {
    id: 'about',
    title: 'About Me',
    icon: '/favicon-32x32.png',
    x: typeof window !== 'undefined' ? (window.innerWidth <= 768 ? 0 : Math.max(0, (window.innerWidth - 1000) / 2)) : 0,
    y: typeof window !== 'undefined' ? (window.innerWidth <= 768 ? 0 : Math.max(38, (window.innerHeight - 600) / 2)) : 38,
    width: typeof window !== 'undefined' ? (window.innerWidth <= 768 ? '95vw' : 1000) : 1000,
    height: typeof window !== 'undefined' ? (window.innerWidth <= 768 ? '85vh' : 600) : 600,
    visible: true,
    maximized: typeof window !== 'undefined' ? window.innerWidth <= 768 : false,
    minimized: false,
    active: true
  }
])

const minimizedApps = ref([])
const activeApp = ref('ImadOS')
const isLoading = ref(true)
const isDesktopVisible = ref(false)

// Computed property to get active app IDs
const activeApps = computed(() => {
  return openApps.value.filter(app => app.active).map(app => app.id)
})

// Loading screen logic
function handleLoadingComplete() {
  isLoading.value = false
  // Fade in desktop after loading completes
  setTimeout(() => {
    isDesktopVisible.value = true
  }, 100)
}

// Wrapper functions that call the imported utilities
function handleOpenApp(appId) {
  openApp(appId, openApps, activeApp)
}

function handleSetActiveWindow(appId) {
  setActiveWindow(appId, openApps, activeApp)
}

function handleCloseApp(appId) {
  closeApp(appId, openApps, activeApp)
}

function handleMinimizeApp(appId) {
  minimizeApp(appId, openApps, activeApp, minimizedApps)
}

function handleRestoreApp(appId) {
  restoreApp(appId, openApps, activeApp, minimizedApps)
}

function handleMaximizeApp(appId, isMaximized) {
  maximizeApp(appId, isMaximized, openApps)
}

function handleMoveApp(appId, position) {
  moveApp(appId, position, openApps)
}

function handleResizeApp(appId, size) {
  resizeApp(appId, size, openApps)
}
</script>

<template>
  <div class="imados" :class="{ 'show': isDesktopVisible }">
    <LoadingScreen :is-loading="isLoading" @loading-complete="handleLoadingComplete" />
    <TopBar :active-app="activeApp" @open-app="handleOpenApp" :class="{ 'show': isDesktopVisible }" />
    <div class="desktop" role="application" aria-label="ImadOS Desktop" :class="{ 'show': isDesktopVisible }">
            <div
              v-for="app in openApps"
              :key="app.id"
              v-show="app.visible"
              class="window-layer"
              :style="{
                left: isMobile ? '0' : (app.maximized ? '10px' : app.x + 'px'),
                top: isMobile ? '0' : (app.maximized ? '43px' : app.y + 'px'),
                width: app.maximized ? 'calc(100vw - 20px)' : 'auto',
                height: app.maximized ? 'calc(100vh - 51px)' : 'auto',
                position: app.maximized ? 'fixed' : 'absolute',
                zIndex: app.active ? 10 : 1
              }"
              :class="{ 'maximized': app.maximized, 'active': app.active }"
              @click="handleSetActiveWindow(app.id)"
            >
        <AppWindow
          :title="app.title"
          :icon="app.icon"
          :width="app.maximized ? '100%' : app.width"
          :height="app.maximized ? '100%' : app.height"
          :x="app.x"
          :y="app.y"
          :maximized="app.maximized"
          :window-type="app.id === 'work' ? 'finder' : app.id === 'services' ? 'services' : app.id === 'contact' ? 'contact' : app.id === 'resume' ? 'resume' : app.id === 'about' ? 'about' : 'default'"
          @close="handleCloseApp(app.id)"
          @minimize="handleMinimizeApp(app.id)"
          @maximize="(isMaximized) => handleMaximizeApp(app.id, isMaximized)"
          @move="handleMoveApp(app.id, $event)"
          @resize="handleResizeApp(app.id, $event)"
        >
          <AboutWindow v-if="app.id === 'about'" @open-app="handleOpenApp" />
          <WorkWindow v-else-if="app.id === 'work'" />
          <ServicesWindow v-else-if="app.id === 'services'" />
          <ContactWindow v-else-if="app.id === 'contact'" />
          <ResumeWindow v-else-if="app.id === 'resume'" />
        </AppWindow>
      </div>
    </div>
    <Dock :minimized-apps="minimizedApps" :active-apps="activeApps" @open="handleOpenApp" @restore="handleRestoreApp" :class="{ 'show': isDesktopVisible }" />
  </div>
  
</template>

<style scoped lang="scss">
@import '../scss/global.scss';

.imados {
  position: relative;
  min-height: 100vh;
}

.imados::before {
  content: '';
  position: fixed;
  inset: 0;
  background: url('/images/wallpaper.jpg') center center / cover no-repeat fixed;
  z-index: 0;
}

.imados::after {
  content: '';
  position: fixed;
  inset: 0;
  background: radial-gradient(1200px 800px at 70% 0%, rgba(255, 153, 0, 0.10), transparent 65%),
    radial-gradient(1200px 800px at 20% 100%, rgba(0, 153, 255, 0.10), transparent 65%),
    linear-gradient(180deg, rgba(0,0,0,0.2), rgba(0,0,0,0.35));
  z-index: 0;
}

.desktop {
  position: relative;
  width: 100%;
  height: 100vh;
  padding-top: 38px; /* account for macOS-style menu bar */
  z-index: 1;

  // Mobile-specific styles
  @media (max-width: $tablet) {
    padding-top: 0; /* no top bar on mobile */
  }
}

.window-layer {
  position: absolute;

  // Mobile-specific styles
  @media (max-width: $tablet) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100vw !important;
    height: 100vh !important;
    z-index: 50;
    margin: 0;
    padding: 0;
    transform: translateX(0);
  }
}

.window-layer.maximized {
  z-index: 10;

  @media (max-width: $tablet) {
    z-index: 50;
  }
}

.window-layer.active {
  z-index: 10;

  @media (max-width: $tablet) {
    z-index: 50;
  }
}

.window-layer:not(.active) {
  opacity: 0.8;
  transition: opacity 0.2s ease;

  @media (max-width: $tablet) {
    opacity: 1; // Always visible on mobile
  }
}

.window-layer.active {
  opacity: 1;
  transition: opacity 0.2s ease;
}


/* Override global app container styles for ImadOS */
.imados {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  max-width: none;
  margin: 0;
  padding: 0;
  align-items: stretch;
  justify-content: stretch;
}

/* Fade transition for desktop elements */
.imados::before, .imados::after {
  opacity: 0;
  transition: opacity 0.1s ease-in-out;
}

:deep(.menubar), .desktop, :deep(.dock) {
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  transition-delay: 0.1s;
}

.imados.show::before, .imados.show::after {
  opacity: 1;
}

:deep(.menubar).show, .desktop.show, :deep(.dock).show {
  opacity: 1;
}

/* Hide the existing header for ImadOS route via global header component scope */
:deep(header) {
  display: none;
}
</style>


