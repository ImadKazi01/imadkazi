<template>
  <div class="finder__list">
    <div class="finder__list-header">
      <div class="finder__list-column finder__list-column--name">Name</div>
      <div class="finder__list-column finder__list-column--services">Services</div>
      <div class="finder__list-column finder__list-column--date">Date</div>
      <div class="finder__list-column finder__list-column--size">Size</div>
    </div>
    <div 
      v-for="work in workItems" 
      :key="work.title"
      class="finder__work-item finder__work-item--list"
      @click="openWorkDetail(work)"
    >
      <div class="finder__list-cell finder__list-cell--name">
        <img :src="work.img" :alt="work.title" class="finder__list-thumbnail" />
        <span>{{ work.title }}</span>
      </div>
      <div class="finder__list-cell finder__list-cell--services">{{ work.services.join(', ') }}</div>
      <div class="finder__list-cell finder__list-cell--date">{{ formatDate(work.date) }}</div>
      <div class="finder__list-cell finder__list-cell--size">{{ work.size || 'Medium' }}</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  workItems: { type: Array, required: true }
})

const emit = defineEmits(['openWorkDetail'])

function openWorkDetail(work) {
  emit('openWorkDetail', work)
}

function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  })
}
</script>

<style scoped lang="scss">
@import '../../../../scss/global.scss';

.finder__list {
  display: flex;
  flex-direction: column;

  &-header {
    display: grid;
    grid-template-columns: 1fr 300px 200px 80px;
    gap: 16px;
    padding: 8px 16px;
    background: #2a2a2a;
    border-bottom: 1px solid #404040;
    font-size: 12px;
    font-weight: 600;
    color: #999;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  &-column {
    &--name { grid-column: 1; }
    &--services { grid-column: 2; }
    &--date { grid-column: 3; }
    &--size { grid-column: 4; }
  }

  &-cell {
    display: flex;
    align-items: center;
    font-size: 14px;

    &--name {
      gap: 12px;
    }
  }

  &-thumbnail {
    width: 32px;
    height: 32px;
    border-radius: 4px;
    object-fit: cover;
  }
}

.finder__work-item {
  cursor: pointer;
  transition: all 0.2s;

  &--list {
    display: grid;
    grid-template-columns: 1fr 300px 200px 80px;
    gap: 16px;
    padding: 8px 16px;
    border-bottom: 1px solid #2a2a2a;
    color: #ffffff;

    &:hover {
      background: #2a2a2a;
    }

    &--selected {
      background: rgba(217, 119, 6, 0.1);
    }
  }
}
</style>
