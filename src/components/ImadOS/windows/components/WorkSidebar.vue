<template>
  <div class="finder__sidebar">
    <div class="finder__sidebar-section">
      <h3 class="finder__sidebar-title">Categories</h3>
      <ul class="finder__sidebar-list">
        <li 
          v-for="category in categories" 
          :key="category.id"
          class="finder__sidebar-item"
          :class="{ 'finder__sidebar-item--active': selectedCategory === category.id }"
          @click="selectCategory(category.id)"
        >
          <component :is="category.icon" class="finder__icon" />
          <span>{{ category.name }}</span>
          <span class="finder__sidebar-count">({{ getCategoryCount(category.id) }})</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { 
  FolderIcon,
  PencilIcon,
  CameraIcon,
  CodeBracketIcon
} from '@heroicons/vue/24/outline'

const props = defineProps({
  selectedCategory: { type: String, required: true },
  workData: { type: Array, required: true }
})

const emit = defineEmits(['selectCategory'])

const categories = [
  { id: 'all', name: 'All Work', icon: FolderIcon },
  { id: 'branding', name: 'Branding', icon: PencilIcon },
  { id: 'development', name: 'Development', icon: CodeBracketIcon },
  { id: 'photography', name: 'Photography', icon: CameraIcon }
]

function selectCategory(categoryId) {
  emit('selectCategory', categoryId)
}

function getCategoryCount(categoryId) {
  if (categoryId === 'all') return props.workData.length
  return props.workData.filter(work => work.category === categoryId).length
}
</script>

<style scoped lang="scss">
@import '../../../../scss/global.scss';

.finder__sidebar {
  width: 200px;
  background: #2a2a2a;
  border-right: 1px solid #404040;
  padding: 16px 0;

  &-section {
    margin-bottom: 24px;
  }

  &-title {
    font-size: 12px;
    font-weight: 600;
    color: #999;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin: 0 16px 8px;
  }

  &-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  &-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 16px;
    cursor: pointer;
    transition: background-color 0.2s;
    font-size: 14px;
    color: #ffffff;

    &:hover {
      background: rgba(255, 255, 255, 0.05);
    }

    &--active {
      background: rgba(74, 158, 255, 0.2);
      color: #4a9eff;
    }
  }

  &-count {
    margin-left: auto;
    font-size: 12px;
    color: #999;
  }
}

.finder__icon {
  width: 1rem;
  height: 1rem;
}
</style>
