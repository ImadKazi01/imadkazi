<template>
  <div class="services__sidebar">
    <div class="services__sidebar-header">
      <h3 class="services__sidebar-title">Services</h3>
    </div>
    <div class="services__sidebar-list">
      <button 
        v-for="service in services" 
        :key="service.serviceId"
        class="services__sidebar-item"
        :class="{ 'services__sidebar-item--active': selectedService?.serviceId === service.serviceId }"
        @click="selectService(service)"
      >
        <component :is="getServiceIcon(service.icon)" class="services__icon" />
        <div class="services__item-content">
          <span class="services__item-title">{{ service.name }}</span>
          <span class="services__item-desc">{{ service.desc.substring(0, 50) }}...</span>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup>
import { 
  PaintBrushIcon, 
  CommandLineIcon, 
  CameraIcon 
} from '@heroicons/vue/24/outline'

const props = defineProps({
  services: { type: Array, required: true },
  selectedService: { type: Object, default: null }
})

const emit = defineEmits(['selectService'])

function selectService(service) {
  emit('selectService', service)
}

function getServiceIcon(iconName) {
  const iconMap = {
    'PaintBrushIcon': PaintBrushIcon,
    'CommandLineIcon': CommandLineIcon,
    'CameraIcon': CameraIcon
  }
  return iconMap[iconName] || PaintBrushIcon
}
</script>

<style scoped lang="scss">
@import '../../../../scss/global.scss';

.services__sidebar {
  width: 280px;
  min-width: 280px;
  background: #2a2a2a;
  border-right: 1px solid #404040;
  padding: 16px 0;
  overflow: auto;
  flex-shrink: 0;

  &-header {
    padding: 0 16px 16px;
    border-bottom: 1px solid #404040;
    margin-bottom: 16px;
  }

  &-title {
    font-size: 16px;
    font-weight: 600;
    color: #ffffff;
    margin: 0;
  }

  &-list {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 0 8px;
  }

  &-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    border: none;
    border-radius: 8px;
    background: transparent;
    color: #ffffff;
    cursor: pointer;
    transition: all 0.2s;
    text-align: left;
    width: 100%;

    &:hover {
      background: rgba(255, 255, 255, 0.05);
    }

    &--active {
      background: rgba(251, 146, 60, 0.2);
      color: #fb923c;
    }
  }
}

.services__icon {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
}

.services__item-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.services__item-title {
  font-size: 14px;
  font-weight: 600;
  color: inherit;
}

.services__item-desc {
  font-size: 12px;
  color: #999;
  line-height: 1.4;
}
</style>
