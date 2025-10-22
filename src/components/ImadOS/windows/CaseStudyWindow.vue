<template>
  <div class="preview-window">
    <CaseStudyNav 
      :current-index="currentIndex"
      :total="totalCaseStudies"
      :has-previous="hasPrevious"
      :has-next="hasNext"
      :case-study="caseStudy"
      @previous="previousCaseStudy"
      @next="nextCaseStudy"
      @openProject="openProject"
    />

    <!-- Content Area -->
    <CaseStudyContent 
      :case-study="caseStudy"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import CaseStudyNav from './components/CaseStudyNav.vue'
import CaseStudyContent from './components/CaseStudyContent.vue'
import caseStudiesData from '../../../data/case-studies.js'

const props = defineProps({
  caseStudyId: { type: String, required: true }
})

const emit = defineEmits(['close', 'minimize', 'maximize', 'changeCaseStudy'])

// State
const currentIndex = ref(0)

// Computed
const caseStudy = computed(() => {
  return caseStudiesData.find(cs => cs.id === props.caseStudyId)
})

const totalCaseStudies = computed(() => caseStudiesData.length)

const hasPrevious = computed(() => currentIndex.value > 0)
const hasNext = computed(() => currentIndex.value < totalCaseStudies.value - 1)

// Methods
function closeWindow() {
  emit('close')
}

function previousCaseStudy() {
  if (hasPrevious.value) {
    currentIndex.value--
    const prevCaseStudy = caseStudiesData[currentIndex.value]
    emit('changeCaseStudy', prevCaseStudy.id)
  }
}

function nextCaseStudy() {
  if (hasNext.value) {
    currentIndex.value++
    const nextCaseStudy = caseStudiesData[currentIndex.value]
    emit('changeCaseStudy', nextCaseStudy.id)
  }
}

function openProject() {
  if (caseStudy.value?.link) {
    window.open(caseStudy.value.link, '_blank', 'noopener,noreferrer')
  }
}


// Keyboard navigation
function handleKeydown(event) {
  switch (event.key) {
    case 'Escape':
      closeWindow()
      break
    case 'ArrowLeft':
      if (hasPrevious.value) previousCaseStudy()
      break
    case 'ArrowRight':
      if (hasNext.value) nextCaseStudy()
      break
  }
}

// Lifecycle
onMounted(() => {
  // Set initial index
  currentIndex.value = caseStudiesData.findIndex(cs => cs.id === props.caseStudyId)
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped lang="scss">
@import '../../../scss/global.scss';

.preview-window {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #1a1a1a;
  color: #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

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
  width: 32px;
  height: 32px;
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
}

.preview-nav-info {
  font-size: 12px;
  color: #999;
}

.preview-content {
  flex: 1;
}

.preview-scroll {
  height: 100%;
  overflow-y: auto;
  padding: 24px;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #2a2a2a;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #555;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #777;
  }
}



.preview-hero {
  margin-bottom: 48px;
  
  &__image {
    width: 100%;
    height: 400px;
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 24px;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  
  &__title {
    font-size: 48px;
    font-weight: 700;
    margin-bottom: 8px;
    color: #ffffff;
  }
  
  &__subtitle {
    font-size: 20px;
    color: #fb923c;
    margin-bottom: 16px;
  }
  
  &__meta {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    align-items: center;
  }
}

.preview-meta-item {
  font-size: 14px;
  color: #999;
}

.preview-services {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.preview-service-tag {
  background: rgba(251, 146, 60, 0.2);
  color: #fb923c;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
}

.preview-section {
  margin-bottom: 48px;
  
  &__title {
    font-size: 32px;
    font-weight: 600;
    margin-bottom: 16px;
    color: #ffffff;
  }
  
  &__content {
    font-size: 18px;
    line-height: 1.6;
    color: #cccccc;
    margin-bottom: 24px;
  }
}

.preview-image {
  margin: 24px 0;
  
  img {
    width: 100%;
    border-radius: 8px;
  }
  
  &__caption {
    font-size: 14px;
    color: #999;
    text-align: center;
    margin-top: 8px;
    font-style: italic;
  }
}

.preview-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin: 24px 0;
  
  &__item {
    img {
      width: 100%;
      border-radius: 8px;
    }
  }
  
  &__caption {
    font-size: 14px;
    color: #999;
    text-align: center;
    margin-top: 8px;
    font-style: italic;
  }
}

.preview-results {
  background: rgba(251, 146, 60, 0.1);
  padding: 32px;
  border-radius: 12px;
  border: 1px solid rgba(251, 146, 60, 0.2);
}

.preview-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 32px;
  margin-top: 24px;
}

.preview-stat {
  text-align: center;
  
  &__value {
    font-size: 48px;
    font-weight: 700;
    color: #fb923c;
    margin-bottom: 8px;
  }
  
  &__label {
    font-size: 14px;
    color: #999;
  }
}

.preview-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.preview-tech-tag {
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
}

.preview-testimonial {
  background: rgba(255, 255, 255, 0.05);
  padding: 32px;
  border-radius: 12px;
  border-left: 4px solid #fb923c;
  
  &__quote {
    font-size: 20px;
    font-style: italic;
    color: #ffffff;
    margin-bottom: 16px;
    line-height: 1.5;
  }
  
  &__author {
    display: flex;
    flex-direction: column;
    gap: 4px;
    
    strong {
      color: #fb923c;
      font-size: 16px;
    }
    
    span {
      color: #999;
      font-size: 14px;
    }
  }
}

// Responsive
@media (max-width: 768px) {  
  .preview-hero {
    &__title {
      font-size: 32px;
    }
    
    &__subtitle {
      font-size: 16px;
    }
  }
  
  .preview-section {
    &__title {
      font-size: 24px;
    }
    
    &__content {
      font-size: 16px;
    }
  }
  
  .preview-gallery {
    grid-template-columns: 1fr;
  }
  
  .preview-stats {
    grid-template-columns: 1fr;
  }
}
</style>
