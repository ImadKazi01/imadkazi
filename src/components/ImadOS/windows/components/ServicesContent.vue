<template>
  <div class="services__main">
    <div v-if="selectedService" class="services__scrollable">
      <div class="services__header">
        <h2 class="services__title">{{ selectedService.name }}</h2>
        <p class="services__subtitle">Professional {{ selectedService.name.toLowerCase() }} services</p>
      </div>
      
      <div class="services__card-container">
        <ServiceCard :service="selectedService" />
      </div>
    </div>

    <div v-else class="services__empty">
      <div class="services__empty-icon">
        <component :is="getServiceIcon('PaintBrushIcon')" class="services__empty-icon-svg" />
      </div>
      <h3 class="services__empty-title">Select a Service</h3>
      <p class="services__empty-desc">
        Choose a service from the sidebar to view details, technologies, and pricing information.
      </p>
    </div>
  </div>
</template>

<script setup>
import { PaintBrushIcon } from '@heroicons/vue/24/outline'
import ServiceCard from './ServiceCard.vue'

const props = defineProps({
  selectedService: { type: Object, default: null }
})

function getServiceIcon(iconName) {
  return PaintBrushIcon
}
</script>

<style scoped lang="scss">
@import '../../../../scss/global.scss';

.services__main {
  flex: 1;
  background: #1a1a1a;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 24px;
  box-sizing: border-box;
}

.services__scrollable {
  width: 100%;
}

.services__card-container {
  width: 100%;
}

.services__header {
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 1px solid #404040;
}

.services__title {
  font-size: 28px;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 8px;
}

.services__subtitle {
  font-size: 16px;
  color: #999;
  margin: 0;
}

.services__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 48px;
  text-align: center;
  min-height: 0;
}

.services__empty-icon {
  width: 80px;
  height: 80px;
  background: rgba(74, 158, 255, 0.1);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
}

.services__empty-icon-svg {
  width: 40px;
  height: 40px;
  color: #4a9eff;
}

.services__empty-title {
  font-size: 24px;
  font-weight: 600;
  color: #ffffff;
  margin: 0 0 12px;
}

.services__empty-desc {
  font-size: 16px;
  color: #999;
  line-height: 1.5;
  margin: 0;
  max-width: 400px;
}
</style>
