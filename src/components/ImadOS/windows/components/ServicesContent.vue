<template>
  <div class="services__main">
    <div v-if="selectedService" class="services__scrollable">
      <div class="services__header">
        <div class="services__header-content">
          <div class="services__icon">
            <component :is="getServiceIcon(selectedService.icon)" class="services__icon-svg" />
          </div>
          <div class="services__title-section">
            <h2 class="services__title">{{ selectedService.name }}</h2>
            <p class="services__subtitle">{{ selectedService.desc }}</p>
          </div>
        </div>
      </div>
      
      <div class="services__card-container">
        <ServiceCard :service="selectedService" />
      </div>
      
      <!-- Related Work Items -->
      <div v-if="relatedWork.length > 0" class="services__work-section">
        <h3 class="services__work-title">Related Work</h3>
        <div class="services__work-grid">
          <div 
            v-for="work in relatedWork" 
            :key="work.title"
            class="services__work-item"
            @click="openWorkDetail(work)"
          >
            <div class="services__work-thumbnail">
              <img :src="work.img" :alt="work.title" />
            </div>
            <div class="services__work-info">
              <h4 class="services__work-name">{{ work.title }}</h4>
              <p class="services__work-desc">{{ work.desc }}</p>
            </div>
          </div>
        </div>
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
import { computed } from 'vue'
import { PaintBrushIcon } from '@heroicons/vue/24/outline'
import ServiceCard from './ServiceCard.vue'
import workData from '../../../../data/work.json'

const props = defineProps({
  selectedService: { type: Object, default: null }
})

const emit = defineEmits(['open-work-detail'])

const relatedWork = computed(() => {
  if (!props.selectedService) return []
  
  // Filter work items that match the selected service
  return workData.filter(work => 
    work.services.some(service => 
      service.toLowerCase() === props.selectedService.title.toLowerCase()
    )
  )
})

function getServiceIcon(iconName) {
  return PaintBrushIcon
}

function openWorkDetail(work) {
  emit('open-work-detail', work)
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

.services__header-content {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.services__icon {
  width: 48px;
  height: 48px;
  background: rgba(251, 146, 60, 0.1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.services__icon-svg {
  width: 24px;
  height: 24px;
  color: #fb923c;
}

.services__title-section {
  flex: 1;
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
  background: rgba(251, 146, 60, 0.1);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
}

.services__empty-icon-svg {
  width: 40px;
  height: 40px;
  color: #fb923c;
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

// Related Work Section
.services__work-section {
  margin-top: 40px;
  padding-top: 24px;
  border-top: 1px solid #404040;
}

.services__work-title {
  font-size: 20px;
  font-weight: 600;
  color: #ffffff;
  margin: 0 0 20px 0;
}

.services__work-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.services__work-item {
  background: #2a2a2a;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid #404040;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
    border-color: #fb923c;
  }
}

.services__work-thumbnail {
  width: 100%;
  height: 200px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.2s ease;
  }

  .services__work-item:hover & img {
    transform: scale(1.05);
  }
}

.services__work-info {
  padding: 20px;
}

.services__work-name {
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  margin: 0 0 8px 0;
}

.services__work-desc {
  font-size: 14px;
  color: #999;
  line-height: 1.5;
  margin: 0;
}
</style>
