<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import serviceData from '../data/service.json';

const route = useRoute();

const pageTitle = computed(() => (route.meta.title || 'Default Title').toLowerCase());


const filteredService = computed(() => {
  return serviceData.find(service => service.title === pageTitle.value) || {};
});
</script>


<template>
  <div class="service">
    <h1>{{ filteredService.title }}</h1>
    <!-- Rest of the component -->
  </div>
</template>

<style lang="scss" scoped>
@import '../scss/global.scss';

.service {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-transform: capitalize;
  height: 75vh;
  font-size: 2rem;
  color: $white;
}
</style>
