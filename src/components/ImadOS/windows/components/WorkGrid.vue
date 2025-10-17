<template>
  <div class="finder__grid">
    <div 
      v-for="work in workItems" 
      :key="work.title"
      class="finder__work-item finder__work-item--grid"
      @dblclick="openWorkDetail(work)"
      @click="selectWork(work)"
      :class="{ 'finder__work-item--selected': selectedWork?.title === work.title }"
    >
      <div class="finder__work-thumbnail">
        <img :src="work.img" :alt="work.title" />
        <div class="finder__work-overlay">
          <EyeIcon class="finder__icon finder__icon--large" />
        </div>
      </div>
      <div class="finder__work-info">
        <h4 class="finder__work-title">{{ work.title }}</h4>
        <p class="finder__work-services">{{ work.services.join(', ') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { EyeIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  workItems: { type: Array, required: true },
  selectedWork: { type: Object, default: null }
})

const emit = defineEmits(['openWorkDetail', 'selectWork'])

function openWorkDetail(work) {
  emit('openWorkDetail', work)
}

function selectWork(work) {
  emit('selectWork', work)
}
</script>

<style scoped lang="scss">
@import '../../../../scss/global.scss';

.finder__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  padding: 16px;
}

.finder__work-item {
  cursor: pointer;
  transition: all 0.2s;

  &--grid {
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    overflow: hidden;
    background: #2a2a2a;
    border: 1px solid #404040;

    &:hover {
      border-color: #4a9eff;
      box-shadow: 0 2px 8px rgba(74, 158, 255, 0.2);
    }

    &--selected {
      border-color: #4a9eff;
      background: rgba(74, 158, 255, 0.1);
    }
  }
}

.finder__work-thumbnail {
  position: relative;
  aspect-ratio: 16/10;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.finder__work-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;
  color: white;

  .finder__work-item--grid:hover & {
    opacity: 1;
  }
}

.finder__work-info {
  padding: 12px;
}

.finder__work-title {
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 4px;
  color: #ffffff;
}

.finder__work-services {
  font-size: 12px;
  color: #999;
  margin: 0;
}

.finder__icon {
  width: 1rem;
  height: 1rem;

  &--large {
    width: 1.5rem;
    height: 1.5rem;
  }
}
</style>
