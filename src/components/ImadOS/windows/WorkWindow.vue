<template>
  <div class="finder">
    <!-- Toolbar -->
    <WorkToolbar
      v-model:search-query="searchQuery"
      v-model:view-mode="viewMode"
      :can-go-back="canGoBack"
      :can-go-forward="canGoForward"
      :breadcrumbs="breadcrumbs"
      @go-back="goBack"
      @go-forward="goForward"
      @navigate-to-breadcrumb="navigateToBreadcrumb"
    />

    <!-- Main Content -->
    <div class="finder__content">
      <!-- Sidebar -->
      <WorkSidebar
        :selected-category="selectedCategory"
        :work-data="enhancedWorkData"
        @select-category="selectCategory"
      />

      <!-- Main Area -->
      <div class="finder__main">
        <!-- Grid View -->
        <WorkGrid
          v-if="viewMode === 'grid'"
          :work-items="filteredWork"
          :selected-work="selectedWork"
          @open-work-detail="openWorkDetail"
          @select-work="selectWork"
        />

        <!-- List View -->
        <WorkList
          v-else
          :work-items="filteredWork"
          :selected-work="selectedWork"
          @open-work-detail="openWorkDetail"
          @select-work="selectWork"
        />
      </div>
    </div>

    <!-- Status Bar -->
    <WorkStatusBar
      :item-count="filteredWork.length"
      :selected-work="selectedWork"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import workData from '../../../data/work.json'
import WorkToolbar from './components/WorkToolbar.vue'
import WorkSidebar from './components/WorkSidebar.vue'
import WorkGrid from './components/WorkGrid.vue'
import WorkList from './components/WorkList.vue'
import WorkStatusBar from './components/WorkStatusBar.vue'

const emit = defineEmits(['openWorkDetail'])

// State
const searchQuery = ref('')
const viewMode = ref('grid')
const selectedCategory = ref('all')
const selectedWork = ref(null)
const canGoBack = ref(false)
const canGoForward = ref(false)
const breadcrumbs = ref(['Work'])

// Enhanced work data with additional properties for Finder display
const enhancedWorkData = ref(workData.map((work, index) => ({
  ...work,
  category: getCategoryFromServices(work.services),
  date: getDateFromIndex(index),
  size: getSizeFromServices(work.services)
})))

// Helper functions to enhance the data
function getCategoryFromServices(services) {
  if (services.includes('Photography')) return 'photography'
  if (services.includes('Web Development')) return 'development'
  return 'branding'
}

function getDateFromIndex(index) {
  const dates = ['2024-01-15', '2024-02-20', '2024-03-10', '2024-04-05']
  return dates[index] || '2024-01-01'
}

function getSizeFromServices(services) {
  if (services.length >= 3) return 'Large'
  if (services.length === 2) return 'Medium'
  return 'Small'
}

// Categories are now handled in WorkSidebar component

// Computed
const filteredWork = computed(() => {
  let filtered = enhancedWorkData.value

  // Filter by category
  if (selectedCategory.value !== 'all') {
    filtered = filtered.filter(work => work.category === selectedCategory.value)
  }

  // Filter by search
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(work => 
      work.title.toLowerCase().includes(query) ||
      work.desc.toLowerCase().includes(query) ||
      work.services.some(service => service.toLowerCase().includes(query))
    )
  }

  return filtered
})

// Methods
function selectCategory(categoryId) {
  selectedCategory.value = categoryId
  selectedWork.value = null
}

function selectWork(work) {
  selectedWork.value = work
}

function setViewMode(mode) {
  viewMode.value = mode
}

function openWorkDetail(work) {
  emit('openWorkDetail', work)
}

function goBack() {
  // Implement back navigation
  console.log('Go back')
}

function goForward() {
  // Implement forward navigation
  console.log('Go forward')
}

function navigateToBreadcrumb(index) {
  // Implement breadcrumb navigation
  console.log('Navigate to breadcrumb:', index)
}
</script>

<style scoped lang="scss">
@import '../../../scss/global.scss';

.finder {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #1a1a1a;
  color: #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  border-radius: 0;
  box-shadow: none;
  border: none;

  &__content {
    display: flex;
    flex: 1;
    overflow: hidden;
  }

  &__main {
    flex: 1;
    overflow: auto;
    background: #1a1a1a;
  }
}
</style>