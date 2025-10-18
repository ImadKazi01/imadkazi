<template>
  <div class="finder__status">
    <span class="finder__status-text">
      {{ selectedWork ? '1 item selected' : `${itemCount} items` }}
    </span>
    <div class="finder__status-right">
      <span v-if="selectedWork" class="finder__work-details">
        {{ selectedWork.services.length }} services
      </span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  itemCount: { type: Number, required: true },
  selectedWork: { type: Object, default: null }
})
</script>

<style scoped lang="scss">
@import '../../../../scss/global.scss';

.finder__status {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: #2a2a2a;
  border-top: 1px solid #404040;
  font-size: 12px;
  color: #999;
  min-height: 24px;

  &-text {
    word-wrap: break-word;
    word-break: break-word;
    line-height: 1.4;
    flex: 1;
    min-width: 0;
  }

  &-right {
    display: flex;
    gap: 16px;
  }
}

.finder__work-details {
  // Work details styles
}
</style>
