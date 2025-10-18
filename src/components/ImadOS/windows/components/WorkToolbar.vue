<template>
  <div class="finder__toolbar">
    <div class="finder__toolbar-left">
      <button class="finder__btn" @click="goBack" :disabled="!canGoBack">
        <ChevronLeftIcon class="finder__icon" />
      </button>
      <button class="finder__btn" @click="goForward" :disabled="!canGoForward">
        <ChevronRightIcon class="finder__icon" />
      </button>
      <div class="finder__breadcrumb">
        <span v-for="(crumb, index) in breadcrumbs" :key="index" class="finder__breadcrumb-item">
          <span v-if="index > 0" class="finder__breadcrumb-separator">›</span>
          <button @click="navigateToBreadcrumb(index)" class="finder__breadcrumb-link">{{ crumb }}</button>
        </span>
      </div>
    </div>
    <div class="finder__toolbar-right">
      <div class="finder__search">
        <MagnifyingGlassIcon class="finder__search-icon" />
        <input 
          :value="searchQuery"
          @input="$emit('update:searchQuery', $event.target.value)"
          type="text" 
          placeholder="Search work..." 
          class="finder__search-input"
        />
      </div>
      <div class="finder__view-controls">
        <button 
          class="finder__view-btn" 
          :class="{ 'finder__view-btn--active': viewMode === 'grid' }" 
          @click="setViewMode('grid')"
          title="Grid View"
        >
          <Squares2X2Icon class="finder__icon" />
        </button>
        <button 
          class="finder__view-btn" 
          :class="{ 'finder__view-btn--active': viewMode === 'list' }" 
          @click="setViewMode('list')"
          title="List View"
        >
          <ListBulletIcon class="finder__icon" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { 
  ChevronLeftIcon, 
  ChevronRightIcon, 
  MagnifyingGlassIcon,
  Squares2X2Icon,
  ListBulletIcon
} from '@heroicons/vue/24/outline'

const props = defineProps({
  searchQuery: { type: String, required: true },
  viewMode: { type: String, required: true },
  canGoBack: { type: Boolean, default: false },
  canGoForward: { type: Boolean, default: false },
  breadcrumbs: { type: Array, default: () => ['Work'] }
})

const emit = defineEmits(['update:searchQuery', 'update:viewMode', 'goBack', 'goForward', 'navigateToBreadcrumb'])

function setViewMode(mode) {
  emit('update:viewMode', mode)
}

function goBack() {
  emit('goBack')
}

function goForward() {
  emit('goForward')
}

function navigateToBreadcrumb(index) {
  emit('navigateToBreadcrumb', index)
}
</script>

<style scoped lang="scss">
@import '../../../../scss/global.scss';

.finder__toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  background: #2a2a2a;
  border-bottom: 1px solid #404040;
  min-height: 44px;

  &-left {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &-right {
    display: flex;
    align-items: center;
    gap: 12px;
  }
}

.finder__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 4px;
  background: transparent;
  color: #ffffff;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.1);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
}

.finder__breadcrumb {
  display: flex;
  align-items: center;
  margin-left: 16px;
  font-size: 14px;

  &-item {
    display: flex;
    align-items: center;
  }

  &-separator {
    margin: 0 8px;
    color: #999;
  }

  &-link {
    background: none;
    border: none;
    color: #fb923c;
    cursor: pointer;
    text-decoration: none;
    font-size: 14px;

    &:hover {
      text-decoration: underline;
    }
  }
}

.finder__search {
  position: relative;
  display: flex;
  align-items: center;

  &-icon {
    position: absolute;
    left: 8px;
    color: #999;
    pointer-events: none;
    width: 1rem;
    height: 1rem;
  }

  &-input {
    padding: 6px 8px 6px 32px;
    border: 1px solid #404040;
    border-radius: 6px;
    background: #1a1a1a;
    color: #ffffff;
    font-size: 14px;
    width: 200px;

    &:focus {
      outline: none;
      border-color: #fb923c;
      box-shadow: 0 0 0 2px rgba(251, 146, 60, 0.2);
    }
  }
}

.finder__view-controls {
  display: flex;
  gap: 4px;
}

.finder__view-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 4px;
  background: transparent;
  color: #999;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  &--active {
    @include active-state;
  }
}

.finder__icon {
  width: 1rem;
  height: 1rem;
}
</style>
