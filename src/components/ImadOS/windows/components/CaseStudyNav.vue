<template>
  <div class="preview-nav">
    <div class="preview-nav__left">
      <button 
        class="preview-nav-btn" 
        @click="$emit('previous')"
        :disabled="!hasPrevious"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 12L6 8L10 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <button 
        class="preview-nav-btn" 
        @click="$emit('next')"
        :disabled="!hasNext"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M6 4L10 8L6 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
    
    <div class="preview-nav__center">
      <span class="preview-nav-info">{{ currentIndex + 1 }} of {{ total }}</span>
    </div>
    
    <div class="preview-nav__right">
      <button 
        class="preview-nav-btn preview-nav-btn--link" 
        @click="$emit('openProject')"
        :disabled="!caseStudy?.link"
        :title="caseStudy?.link ? 'Open project in new tab' : 'No project link available'"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 2H14V6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M6 10L14 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M8 2H4C3.44772 2 3 2.44772 3 3V12C3 12.5523 3.44772 13 4 13H13C13.5523 13 14 12.5523 14 12V8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class="preview-nav-btn__text">View</span>
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  currentIndex: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
  hasPrevious: { type: Boolean, default: false },
  hasNext: { type: Boolean, default: false },
  caseStudy: { type: Object, default: null }
})
</script>

<style scoped lang="scss">
@import '../../../../scss/global.scss';

.preview-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 44px;
  background: #2a2a2a;
  border-bottom: 1px solid #404040;
  padding: 0 16px;
  
  &__left, &__right {
    display: flex;
    gap: 8px;
  }
  
  &__center {
    flex: 1;
    text-align: center;
  }
}

.preview-nav-btn {
  border: none;
  border-radius: 6px;
  background: transparent;
  color: #ffffff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
  
  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.1);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  &--link {
    width: auto;
    height: 32px;
    padding: 0 12px;
    gap: 6px;
  }
  
  &__text {
    font-size: 12px;
    font-weight: 500;
  }
}

.preview-nav-info {
  font-size: 12px;
  color: #999;
}
</style>

