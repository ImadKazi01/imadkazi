<template>
  <div class="preview-header">
    <div class="preview-header__left">
      <button class="preview-btn preview-btn--close" @click="$emit('close')">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </button>
      <button class="preview-btn preview-btn--minimize" @click="$emit('minimize')">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M3 6H9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </button>
      <button class="preview-btn preview-btn--maximize" @click="$emit('maximize')">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M3 3H9V9H3V3Z" stroke="currentColor" stroke-width="1.5" fill="none"/>
        </svg>
      </button>
    </div>
    
    <div class="preview-header__center">
      <span class="preview-title">{{ title || 'Case Study' }}</span>
    </div>
    
    <div class="preview-header__right">
      <button class="preview-btn preview-btn--share" @click="$emit('share')">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M8 4L4 8M8 8L4 4M6 1C6.55228 1 7 1.44772 7 2C7 2.55228 6.55228 3 6 3C5.44772 3 5 2.55228 5 2C5 1.44772 5.44772 1 6 1ZM6 9C6.55228 9 7 9.44772 7 10C7 10.5523 6.55228 11 6 11C5.44772 11 5 10.5523 5 10C5 9.44772 5.44772 9 6 9Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </button>
      <button class="preview-btn preview-btn--external" @click="$emit('external')" v-if="hasLink">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M10 2L2 10M2 2H10V10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: { type: String, default: '' },
  hasLink: { type: Boolean, default: false }
})
</script>

<style scoped lang="scss">
@import '../../../../scss/global.scss';

.preview-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 28px;
  background: #2a2a2a;
  border-bottom: 1px solid #404040;
  padding: 0 12px;
  
  &__left {
    display: flex;
    gap: 8px;
  }
  
  &__center {
    flex: 1;
    text-align: center;
  }
  
  &__right {
    display: flex;
    gap: 8px;
  }
}

.preview-btn {
  width: 16px;
  height: 16px;
  border: none;
  border-radius: 50%;
  background: #404040;
  color: #ffffff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
  
  &:hover {
    background: #555;
  }
  
  &--close:hover {
    background: #ff5f57;
  }
  
  &--minimize:hover {
    background: #ffbd2e;
  }
  
  &--maximize:hover {
    background: #28ca42;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.preview-title {
  font-size: 12px;
  color: #ffffff;
  font-weight: 500;
}
</style>

