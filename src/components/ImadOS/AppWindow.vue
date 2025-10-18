<script setup>
import { ref } from 'vue'
import { 
  createDragHandlers, 
  createResizeHandlers, 
  createMaximizeHandler, 
  createTrafficLightHandlers
} from '../../utils/windowInteractions.js'

const props = defineProps({
  title: { type: String, required: true },
  icon: { type: String, required: false },
  width: { type: [Number, String], default: 600 },
  height: { type: [Number, String], default: 400 },
  x: { type: Number, default: 100 },
  y: { type: Number, default: 100 },
  maximized: { type: Boolean, default: false },
  windowType: { type: String, default: 'default' }
})

const emit = defineEmits(['close', 'minimize', 'maximize', 'move', 'resize'])

const windowRef = ref(null)
const isDragging = ref(false)
const isResizing = ref(false)
const dragStart = ref({ x: 0, y: 0 })
const resizeStart = ref({ x: 0, y: 0, width: 0, height: 0 })
const isMaximized = ref(false)

// Create handlers using utilities
const { startDrag: handleStartDrag } = createDragHandlers(windowRef, props, isDragging, dragStart, emit)
const { startResize: handleStartResize } = createResizeHandlers(windowRef, props, isResizing, resizeStart, isMaximized, emit)
const { onMaximize } = createMaximizeHandler(isMaximized, windowRef, emit)
const { onClose, onMinimize } = createTrafficLightHandlers(emit)

// Position is handled by parent component
</script>

<template>
  <section
    ref="windowRef"
    class="window"
    role="dialog"
    :aria-label="title"
    :style="{ 
      width: typeof width === 'string' ? width : width + 'px', 
      height: typeof height === 'string' ? height : height + 'px' 
    }"
          :class="{ 'maximized': maximized, 'finder-style': windowType === 'finder', 'services-style': windowType === 'services', 'contact-style': windowType === 'contact', 'resume-style': windowType === 'resume', 'about-style': windowType === 'about' }"
  >
    <header class="titlebar" @mousedown="handleStartDrag">
      <div class="traffic-lights">
        <button class="btn close" aria-label="Close" @click="onClose" />
        <button class="btn minimize" aria-label="Minimize" @click="onMinimize" />
        <button class="btn zoom" aria-label="Maximize" @click="onMaximize" />
      </div>
      <!-- <div class="title">
        <img v-if="icon" :src="icon" alt="" width="16" height="16" />
        <span>{{ title }}</span>
      </div> -->
    </header>
    <div class="content">
      <slot />
    </div>
    <div class="resize-handle" @mousedown="handleStartResize"></div>
  </section>
</template>

<style scoped lang="scss">
@import '../../scss/global.scss';

.window {
  background: rgba(45, 45, 45, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  // Mobile-specific styles
  @media (max-width: $tablet) {
    border: none;
    border-radius: 0;
    box-shadow: none;
  }
}

.window.maximized {
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.window.finder-style .titlebar {

  // Mobile-specific styles
  @media (max-width: $tablet) {
    border-bottom: none;
  }
}

.window.finder-style .content {
  height: calc(100% - 32px);
  padding: 0;
}

.window.services-style .content {
  height: calc(100% - 40px);
  padding: 0;
  overflow: hidden;
}

.window.contact-style .content {
  height: calc(100% - 40px);
  padding: 0;
  overflow: hidden;
}

.window.resume-style .content {
  height: calc(100% - 40px);
  padding: 0;
  overflow: hidden;
}

.window.about-style .content {
  height: calc(100% - 40px);
  padding: 0;
  overflow-y: auto;
}

.window.maximizing {
  animation: maximizeWindow 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes maximizeWindow {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
  100% {
    transform: scale(1);
  }
}

.titlebar {
  display: flex;
  align-items: center;
  gap: 12px;
  height: 40px;
  padding: 0 12px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0));
}

.traffic-lights {
  display: flex;
  align-items: center;
  gap: 8px;
}

.traffic-lights .btn {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0.4rem;
}

.traffic-lights .btn:hover {
  transform: scale(1.1);
  
}

.close { background: #ff5f56; }
.minimize { background: #ffbd2e; }
.zoom { background: #27c93f; }

.resize-handle {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 12px;
  height: 12px;
  cursor: se-resize;
  background: transparent;
}

.resize-handle::after {
  content: '';
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-bottom: 6px solid rgba(255, 255, 255, 0.3);
}

.title {
  display: flex;
  align-items: center;
  gap: 8px;
  color: $white;
  font-weight: 600;
}

.content {
  padding: 16px;
}

// Mobile content scrolling
@media (max-width: $tablet) {
  .window .content {
    height: calc(100vh - 40px);
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    padding-bottom: 60px; // Extra space for dock
  }
}
</style>


