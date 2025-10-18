<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Battery100Icon, WifiIcon, MagnifyingGlassIcon, ComputerDesktopIcon, BellSlashIcon, BoltIcon, ChatBubbleLeftIcon, CodeBracketIcon } from '@heroicons/vue/24/solid'

const props = defineProps({
  activeApp: { type: String, default: 'ImadOS' }
})

const emit = defineEmits(['openApp'])

const time = ref('')
function updateTime() {
  time.value = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function handleMenuClick(appId) {
  emit('openApp', appId)
}

onMounted(() => {
  updateTime()
  const id = setInterval(updateTime, 30000)
  onBeforeUnmount(() => clearInterval(id))
})
</script>

<template>
  <header class="menubar" role="menubar">
    <nav class="menu-left" aria-label="App menu">
      <button class="apple" aria-label="Menu">
        <img src="/apple-touch-icon.png" alt="ImadOS" width="18" height="18" />
      </button>
      <button class="item active">{{ activeApp }}</button>
      <button class="item" @click="handleMenuClick('about')">About</button>
      <button class="item" @click="handleMenuClick('work')">Work</button>
      <button class="item" @click="handleMenuClick('services')">Services</button>
      <button class="item" @click="handleMenuClick('contact')">Contact</button>
    </nav>
    <div class="menu-right">
      <a class="menu-link" href="/classic">Classic</a>
      <span class="icon" aria-label="Desktop">
        <ComputerDesktopIcon class="w-5 h-5" />
      </span>
      <span class="icon" aria-label="Notifications">
        <BellSlashIcon class="w-5 h-5" />
      </span>
      <span class="icon" aria-label="Bolt">
        <BoltIcon class="w-5 h-5" />
      </span>
      <span class="icon" aria-label="Chat">
        <ChatBubbleLeftIcon class="w-5 h-5" />
      </span>
      <span class="icon" aria-label="Code">
        <CodeBracketIcon class="w-5 h-5" />
      </span>
      <span class="icon" aria-label="Wi-Fi">
        <WifiIcon class="w-5 h-5" />
      </span>
      <span class="icon" aria-label="Spotlight Search">
        <MagnifyingGlassIcon class="w-5 h-5" />
      </span>
      <span class="battery" aria-label="Battery">
        <Battery100Icon class="w-5 h-5" />
      </span>
      <span class="time" aria-live="polite">{{ time }}</span>
    </div>
  </header>
  
</template>

<style scoped lang="scss">
@import '../../scss/global.scss';

.menubar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 38px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(20, 21, 23, 0.4);
  -webkit-backdrop-filter: saturate(160%) blur(16px);
  backdrop-filter: saturate(160%) blur(16px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  padding: 0 10px;
  z-index: 100;

  // Mobile-specific styles
  @media (max-width: $tablet) {
    display: none;
  }
}

.menu-left { 
  display: flex; 
  align-items: center; 
  gap: 6px; 

  // Hide some menu items on mobile
  @media (max-width: $tablet) {
    gap: 4px;
    
    .item {
      display: none;
      
      &:first-child {
        display: block;
      }
    }
  }
}

.apple { color: $white; font-size: 14px; background: none; border: 0; padding: 2px 6px; cursor: default; }
.item { color: #e2e8f0; background: none; border: 0; padding: 2px 6px; border-radius: 4px; font-weight: 400; cursor: pointer; }
.item.active { color: $white; font-weight: 500; }
.item:hover { background: rgba(255,255,255,0.08); }

.menu-right { 
  display: flex; 
  align-items: center; 
  gap: 15px; 
  color: #cbd5e1; 

  // Simplify menu on mobile
  @media (max-width: $tablet) {
    gap: 8px;
    
    .icon, .battery {
      display: none;
    }
  }
}

.menu-link { color: #cbd5e1; text-decoration: none; }
.menu-link:hover { color: $white; }
.icon { color: #cbd5e1; display: inline-flex; align-items: center; }
.battery { color: #cbd5e1; display: inline-flex; align-items: center; }
.time { color: #e2e8f0; font-variant-numeric: tabular-nums; }
</style>


