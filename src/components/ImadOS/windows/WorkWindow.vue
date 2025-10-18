<template>
  <div class="finder">
    <!-- Desktop Layout -->
    <div class="finder__desktop">
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

    <!-- Mobile Layout -->
    <div class="finder__mobile">
      <!-- Mobile Header -->
      <div class="mobile-header">
        <div class="mobile-header__title">My Work</div>
        <div class="mobile-header__actions">
          <button class="mobile-search-btn" @click="toggleMobileSearch">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Search Bar -->
      <div v-if="showMobileSearch" class="mobile-search">
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Search work..." 
          class="mobile-search__input"
        />
      </div>

      <!-- Mobile Category Tabs -->
      <div class="mobile-categories">
        <button 
          v-for="category in mobileCategories" 
          :key="category.id"
          class="mobile-category"
          :class="{ 'mobile-category--active': selectedCategory === category.id }"
          @click="selectCategory(category.id)"
        >
          {{ category.name }}
          <span class="mobile-category__count">({{ getCategoryCount(category.id) }})</span>
        </button>
      </div>

      <!-- Mobile Content -->
      <div class="mobile-content">
        <WorkGrid
          :work-items="filteredWork"
          :selected-work="selectedWork"
          @open-work-detail="openWorkDetail"
          @select-work="selectWork"
        />
      </div>
    </div>
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

// Mobile-specific state
const showMobileSearch = ref(false)

// Mobile categories (simplified for mobile)
const mobileCategories = [
  { id: 'all', name: 'All' },
  { id: 'branding', name: 'Branding' },
  { id: 'development', name: 'Development' },
  { id: 'photography', name: 'Photography' }
]

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

// Mobile-specific methods
function toggleMobileSearch() {
  showMobileSearch.value = !showMobileSearch.value
}

function getCategoryCount(categoryId) {
  if (categoryId === 'all') return enhancedWorkData.value.length
  return enhancedWorkData.value.filter(work => work.category === categoryId).length
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
  }

  &__main {
    flex: 1;
    overflow: auto;
    background: #1a1a1a;
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

  &__actions {
    display: flex;
    gap: 12px;
  }
}

.mobile-search-btn {
  background: none;
  border: none;
  color: #ffffff;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
}

.mobile-search {
  padding: 16px 20px;
  background: rgba(0, 0, 0, 0.6);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  &__input {
    width: 100%;
    padding: 12px 16px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    color: #ffffff;
    font-size: 16px;

    &::placeholder {
      color: rgba(255, 255, 255, 0.6);
    }

    &:focus {
      outline: none;
      border-color: #fb923c;
      background: rgba(255, 255, 255, 0.15);
    }
  }
}

.mobile-categories {
  display: flex;
  @include mobile-section;
  overflow-x: auto;
  border-bottom: 1px solid $glass-border-light;

  &::-webkit-scrollbar {
    display: none;
  }
}

.mobile-category {
  display: flex;
  align-items: center;
  gap: 4px;
  @include mobile-tab;
  font-size: 16px;

  &--active {
    @include active-state;
  }

  &:hover:not(&--active) {
    background: rgba(255, 255, 255, 0.15);
  }

  &__count {
    font-size: 12px;
    opacity: 0.8;
  }
}

.mobile-content {
  flex: 1;
  overflow: auto;
  padding: 20px;
  background: transparent;
  padding-bottom: 80px; // Extra space for dock
}
</style>