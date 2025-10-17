<script setup>
import { ref } from 'vue'
import { 
  UserIcon, 
  BriefcaseIcon, 
  CogIcon, 
  EnvelopeIcon, 
  DocumentTextIcon 
} from '@heroicons/vue/24/solid'

const props = defineProps({
  minimizedApps: { type: Array, default: () => [] },
  activeApps: { type: Array, default: () => [] }
})

const apps = [
  { id: 'about', name: 'About', icon: UserIcon },
  { id: 'work', name: 'Work', icon: BriefcaseIcon },
  { id: 'services', name: 'Services', icon: CogIcon },
  { id: 'contact', name: 'Contact', icon: EnvelopeIcon },
  { id: 'resume', name: 'Resume', icon: DocumentTextIcon }
]

const emit = defineEmits(['open', 'restore'])

function open(appId) {
  emit('open', appId)
}

function restore(appId) {
  emit('restore', appId)
}
</script>

<template>
  <nav class="dock" aria-label="Dock">
    <ul>
      <li v-for="app in apps" :key="app.id">
        <button 
          class="dock-item" 
          :class="{ 
            'minimized': minimizedApps.includes(app.id),
            'active': activeApps.includes(app.id)
          }"
          @click="minimizedApps.includes(app.id) ? restore(app.id) : open(app.id)" 
          :aria-label="minimizedApps.includes(app.id) ? 'Restore ' + app.name : 'Open ' + app.name"
        >
          <component :is="app.icon" class="w-7 h-7" />
          <span class="dock-label">{{ app.name }}</span>
          <div v-if="minimizedApps.includes(app.id)" class="minimized-indicator"></div>
        </button>
      </li>
    </ul>
  </nav>
  
</template>

<style scoped lang="scss">
@import '../../scss/global.scss';

.dock {
  position: fixed;
  left: 50%;
  bottom: 16px;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  padding: 8px 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
  z-index: 90;
}

ul {
  display: flex;
  gap: 8px;
  list-style: none;
}

.dock-item {
  position: relative;
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  background: transparent;
  border: none;
  cursor: pointer;

  img {
    border-radius: 5px;
  }
}

.dock-item:hover {
  background: rgba(255, 255, 255, 0.08);
}

.dock-label {
  position: absolute;
  bottom: 58px;
  background: rgba(0, 0, 0, 0.75);
  color: $white;
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 16px;
  white-space: nowrap;
  opacity: 0;
  transform: translateY(6px);
  transition: all 120ms ease;
  pointer-events: none;
}

.dock-item:hover .dock-label {
  opacity: 1;
  transform: translateY(0);
}

.dock-item.minimized {
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: dockBounce 1s ease-in-out infinite;
}

.dock-item.active {
  background: rgba(255, 189, 46, 0.2);
  border: 1px solid rgba(255, 189, 46, 0.4);
}

.dock-item.active svg {
  color: #ffbd2e;
}

.minimized-indicator {
  position: absolute;
  bottom: 2px;
  left: 50%;
  transform: translateX(-80%);
  width: 5px;
  height: 5px;
  background: #ffbd2e;
  border-radius: 50%;
  box-shadow: 0 0 8px rgba(255, 189, 46, 0.8);
}

@keyframes dockBounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
</style>


