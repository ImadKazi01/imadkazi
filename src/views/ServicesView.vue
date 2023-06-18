<template>
  <div class="service">
    <h1>{{ pageTitle }}</h1>
    <p>{{ pageLink }}</p>
    <!-- Rest of the component -->
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const pageTitle = computed(() => route.meta.title || 'Default Title')
const pageLink = computed(() => route.meta.link || '/default-link')
</script>

<style lang="scss" scoped>
@import '../scss/global.scss';

.service {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 75vh;
  font-size: 3rem;
  color: $white;
}
/* Styles for the ServiceView component */
</style>
