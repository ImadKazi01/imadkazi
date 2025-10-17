<template>
  <div class="loading-screen" v-if="isLoading">
    <div class="loading-content">
      <div class="logo-container">
        <img src="/apple-touch-icon.png" alt="ImadOS" class="logo" />
      </div>
      <div class="loading-bar-container">
        <div class="loading-bar">
          <div class="loading-progress" :style="{ width: progress + '%' }"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  isLoading: { type: Boolean, default: true }
})

const emit = defineEmits(['loadingComplete'])

const progress = ref(0)
let progressInterval = null


onMounted(() => {
  // Simulate loading progress - slower and more realistic
  progressInterval = setInterval(() => {
    if (progress.value < 100) {
      progress.value += Math.random() * 8 + 2 // Slower progress: 2-10% increments
      if (progress.value > 100) progress.value = 100
    } else {
      // Loading complete, emit event
      clearInterval(progressInterval)
      setTimeout(() => {
        emit('loadingComplete')
      }, 800) // Longer delay to show completed loading bar
    }
  }, 150) // Slower update interval
})

onUnmounted(() => {
  if (progressInterval) {
    clearInterval(progressInterval)
  }
})
</script>

<style scoped lang="scss">
@import '../scss/global.scss';

.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
}

.logo-container {
  width: 155px;
  height: 155px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: logoPulse 2s ease-in-out infinite;
}

.logo {
  width: 140px;
  height: 140px;
  border-radius: 50%;
}

.loading-bar-container {
  width: 200px;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  overflow: hidden;
}

.loading-bar {
  width: 100%;
  height: 100%;
  position: relative;
}

.loading-progress {
  height: 100%;
  background: linear-gradient(90deg, #fff, rgba(255, 255, 255, 0.8));
  border-radius: 2px;
  transition: width 0.3s ease;
  position: relative;
}

@keyframes logoPulse {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 30px rgba(255, 255, 255, 0.2);
  }
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
</style>
