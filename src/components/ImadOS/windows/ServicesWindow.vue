<template>
  <div class="services">
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
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import serviceData from '../../../data/service.json'
import ServicesSidebar from './components/ServicesSidebar.vue'
import ServicesContent from './components/ServicesContent.vue'

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

  &__content {
    display: flex;
    flex: 1;
    overflow: hidden;
    min-height: 0;
    height: 100%;
  }
}
</style>