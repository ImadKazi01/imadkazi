<template>
  <div class="services">
    <!-- Desktop Layout -->
    <div class="services__desktop">
      <div class="services__content">
        <!-- Sidebar -->
        <ServicesSidebar
          :services="services"
          :selected-service="selectedService"
          @select-service="selectService"
        />

        <!-- Main Content -->
        <ServicesContent
          :selected-service="selectedService"
          @open-work-detail="openWorkDetail"
        />
      </div>
    </div>

    <!-- Mobile Layout -->
    <div class="services__mobile">
      <!-- Mobile Header -->
      <div class="mobile-header">
        <div class="mobile-header__title">Services</div>
      </div>

      <!-- Mobile Service Tabs -->
      <div class="mobile-services">
        <button 
          v-for="service in services" 
          :key="service.serviceId"
          class="mobile-service"
          :class="{ 'mobile-service--active': selectedService?.serviceId === service.serviceId }"
          @click="selectService(service)"
        >
          <div class="mobile-service__icon">
            <component :is="getServiceIcon(service.icon)" class="w-6 h-6" />
          </div>
          <span class="mobile-service__name">{{ service.name }}</span>
        </button>
      </div>

      <!-- Mobile Content -->
      <div class="mobile-content">
        <ServicesContent
          :selected-service="selectedService"
          @open-work-detail="openWorkDetail"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import serviceData from '../../../data/service.json'
import ServicesSidebar from './components/ServicesSidebar.vue'
import ServicesContent from './components/ServicesContent.vue'
import { 
  PaintBrushIcon, 
  CommandLineIcon, 
  CameraIcon 
} from '@heroicons/vue/24/outline'

const services = ref([])
const selectedService = ref(null)

onMounted(() => {
  services.value = serviceData
  // Select first service by default
  if (services.value.length > 0) {
    selectedService.value = services.value[0]
  }
})

function selectService(service) {
  selectedService.value = service
}

function openWorkDetail(work) {
  // Emit event to parent to open work detail
  console.log('Opening work detail:', work)
  // You can implement navigation or modal opening here
}

// Mobile-specific icon mapping
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
@import '../../../scss/global.scss';

.services {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #1a1a1a;
  color: #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  overflow: hidden;

  &__desktop {
    display: flex;
    flex-direction: column;
    height: 100%;

    @media (max-width: $tablet) {
      display: none;
    }
  }

  &__mobile {
    display: none;
    flex-direction: column;
    height: 100%;

    @media (max-width: $tablet) {
      display: flex;
    }
  }

  &__content {
    display: flex;
    flex: 1;
    overflow: hidden;
    min-height: 0;
    height: 100%;
  }
}

// Mobile-specific styles
.mobile-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  @include mobile-header;

  &__title {
    font-size: 20px;
    font-weight: 600;
    color: #ffffff;
  }
}

.mobile-services {
  display: flex;
  @include mobile-section;
  gap: 12px;
  overflow-x: auto;
  border-bottom: 1px solid $glass-border-light;

  &::-webkit-scrollbar {
    display: none;
  }
}

.mobile-service {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  @include mobile-service-tab;
  font-size: 12px;

  &--active {
    @include active-state;
  }

  &:hover:not(&--active) {
    background: rgba(255, 255, 255, 0.15);
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
  }

  &__name {
    font-size: 12px;
    font-weight: 500;
    text-align: center;
  }
}

.mobile-content {
  flex: 1;
  overflow: auto;
  background: transparent;
  padding-bottom: 60px; // Extra space for dock
}
</style>