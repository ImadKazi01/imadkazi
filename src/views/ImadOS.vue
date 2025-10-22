<script setup>
import { ref, computed } from 'vue'
import TopBar from '../components/ImadOS/TopBar.vue'
import Dock from '../components/ImadOS/Dock.vue'
import AppWindow from '../components/ImadOS/AppWindow.vue'
import LoadingScreen from '../components/LoadingScreen.vue'
import AboutWindow from '../components/ImadOS/windows/AboutWindow.vue'
import WorkWindow from '../components/ImadOS/windows/WorkWindow.vue'
import CaseStudyWindow from '../components/ImadOS/windows/CaseStudyWindow.vue'
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
  resizeApp,
  getWindowSize
} from '../utils/windowManager.js'
import caseStudiesData from '../data/case-studies.js'

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

// Computed property to sort apps so active ones render last (higher z-index)
const sortedOpenApps = computed(() => {
  return [...openApps.value].sort((a, b) => {
    // Active apps come last (higher z-index)
    if (a.active && !b.active) return 1
    if (!a.active && b.active) return -1
    return 0
  })
})

// Computed property for minimized case studies to show as desktop icons
const minimizedCaseStudies = computed(() => {
  return openApps.value.filter(app => 
    app.id.startsWith('case-study-') && 
    app.minimized && 
    !app.visible
  ).map(app => {
    // Get the actual case study data to show the real name
    const caseStudyData = caseStudiesData.find(cs => cs.id === app.caseStudyId)
    return {
      ...app,
      title: caseStudyData ? caseStudyData.title : app.title,
      icon: caseStudyData ? caseStudyData.desktopIcon : app.icon
    }
  })
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
function openCaseStudy(caseStudyId) {
  // Create a unique window ID for each case study
  const windowId = `case-study-${caseStudyId}`
  
  // Check if this specific case study window already exists
  const existing = openApps.value.find((a) => a.id === windowId)
  
  if (existing) {
    // If it exists, just restore it
    existing.visible = true
    existing.active = true
    existing.minimized = false
    // Set all other apps as inactive
    openApps.value.forEach((app) => {
      if (app.id !== windowId) app.active = false
    })
    activeApp.value = existing.title
    
    // Force a reactive update to ensure proper z-index
    openApps.value = [...openApps.value]
    
    // Ensure the restored case study window is active
    setTimeout(() => {
      const restoredWindow = openApps.value.find(app => app.id === windowId)
      if (restoredWindow) {
        restoredWindow.active = true
        restoredWindow.visible = true
        // Set all other apps as inactive again
        openApps.value.forEach((app) => {
          if (app.id !== windowId) app.active = false
        })
        openApps.value = [...openApps.value]
      }
    }, 10)
  } else {
    // Create a new case study window for this specific case study
    const caseStudyData = caseStudiesData.find(cs => cs.id === caseStudyId)
    const windowSize = getWindowSize('case-study')
    
    // Mobile-friendly positioning
    let x, y
    if (isMobile.value) {
      x = 0
      y = 0
    } else {
      const centerX = Math.max(0, (window.innerWidth - windowSize.width) / 2)
      const centerY = Math.max(38, (window.innerHeight - windowSize.height) / 2)
      x = centerX
      y = centerY
    }

    const newApp = {
      id: windowId,
      title: caseStudyData ? caseStudyData.title : 'Case Study',
      icon: caseStudyData ? caseStudyData.heroImage : '/favicon-32x32.png',
      width: windowSize.width,
      height: windowSize.height,
      x: x,
      y: y,
      visible: true,
      maximized: isMobile.value,
      minimized: false,
      active: true,
      caseStudyId: caseStudyId
    }
    
    // Set all other apps as inactive
    openApps.value.forEach((app) => {
      app.active = false
    })
    
    openApps.value.push(newApp)
    activeApp.value = newApp.title
    
    // Force a reactive update to ensure proper z-index
    openApps.value = [...openApps.value]
    
    // Ensure the new case study window is active and visible
    setTimeout(() => {
      const newWindow = openApps.value.find(app => app.id === windowId)
      if (newWindow) {
        newWindow.active = true
        newWindow.visible = true
        // Set all other apps as inactive again
        openApps.value.forEach((app) => {
          if (app.id !== windowId) app.active = false
        })
        openApps.value = [...openApps.value]
      }
    }, 10)
  }
}

function handleSetActiveWindow(appId) {
  setActiveWindow(appId, openApps, activeApp)
  
  // Force a reactive update to ensure proper z-index
  openApps.value = [...openApps.value]
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
      <!-- Desktop Icons for Minimized Case Studies -->
      <div class="desktop-icons">
        <div 
          v-for="app in minimizedCaseStudies" 
          :key="`desktop-${app.id}-${app.caseStudyId}`"
          class="desktop-icon"
          @click="handleRestoreApp(app.id)"
          :title="app.title"
        >
          <div class="desktop-icon-image">
            <img :src="app.icon" :alt="app.title" />
          </div>
          <span class="desktop-icon-label">{{ app.title }}</span>
        </div>
      </div>

      <!-- Windows -->
      <div
        v-for="app in sortedOpenApps"
        :key="app.id"
        v-show="app.visible"
        class="window-layer"
              :style="{
                left: isMobile ? '0' : (app.maximized ? '10px' : app.x + 'px'),
                top: isMobile ? '0' : (app.maximized ? '43px' : app.y + 'px'),
                width: app.maximized ? 'calc(100vw - 20px)' : 'auto',
                height: app.maximized ? 'calc(100vh - 51px)' : 'auto',
                position: app.maximized ? 'fixed' : 'absolute',
                zIndex: app.active ? 20 : 1
              }"
              :class="{ 'maximized': app.maximized, 'active': app.active, 'case-study-window': app.id.startsWith('case-study-') }"
              :data-app-id="app.id"
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
          :window-type="app.id === 'work' ? 'finder' : app.id === 'services' ? 'services' : app.id === 'contact' ? 'contact' : app.id === 'resume' ? 'resume' : app.id === 'about' ? 'about' : app.id.startsWith('case-study-') ? 'case-study' : 'default'"
          @close="handleCloseApp(app.id)"
          @minimize="handleMinimizeApp(app.id)"
          @maximize="(isMaximized) => handleMaximizeApp(app.id, isMaximized)"
          @move="handleMoveApp(app.id, $event)"
          @resize="handleResizeApp(app.id, $event)"
        >
          <AboutWindow v-if="app.id === 'about'" @open-app="handleOpenApp" />
          <WorkWindow v-else-if="app.id === 'work'" @openWorkDetail="(work) => openCaseStudy((work.path || '').split('/').pop())" />
          <CaseStudyWindow v-else-if="app.id.startsWith('case-study-')" :case-study-id="app.caseStudyId || ''" @changeCaseStudy="(newId) => app.caseStudyId = newId" />
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

.desktop-icons {
  position: absolute;
  top: 50px;
  left: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  z-index: 1;

  @media (max-width: $tablet) {
    top: 20px;
  }
}

.desktop-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80px;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 8px;
  border-radius: 8px;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
}

.desktop-icon-image {
  width: 64px;
  height: 64px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);

  img {
    width: 48px;
    height: 48px;
    object-fit: contain;
  }
}

.desktop-icon-label {
  font-size: 14px;
  color: #ffffff;
  text-align: center;
  word-break: break-word;
  line-height: 1.2;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
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
  z-index: 20;

  @media (max-width: $tablet) {
    z-index: 50;
  }
}

.window-layer.active {
  z-index: 20;

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


