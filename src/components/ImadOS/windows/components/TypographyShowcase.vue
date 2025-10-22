<template>
  <div class="typography-showcase">
    <div class="typography-showcase__grid">
      <div 
        v-for="font in fonts" 
        :key="font.name"
        class="typography-showcase__item"
      >
        <div class="typography-showcase__preview">
          <div 
            class="typography-showcase__sample"
            :style="{
              fontFamily: font.family,
              fontWeight: font.weight,
              fontSize: font.size,
              color: font.color || '#ffffff'
            }"
          >
            {{ font.sample || 'The quick brown fox jumps over the lazy dog' }}
          </div>
          <div class="typography-showcase__details">
            <div class="typography-showcase__name">{{ font.name }}</div>
            <div class="typography-showcase__specs">
              <span class="typography-showcase__family">{{ font.family }}</span>
              <span class="typography-showcase__weight">{{ font.weight }}</span>
              <span class="typography-showcase__size">{{ font.size }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div v-if="hierarchy && hierarchy.length > 0" class="typography-showcase__hierarchy">
      <h4 class="typography-showcase__hierarchy-title">Typography Hierarchy</h4>
      <div class="typography-showcase__hierarchy-grid">
        <div 
          v-for="level in hierarchy" 
          :key="level.name"
          class="typography-showcase__hierarchy-item"
        >
          <div 
            class="typography-showcase__hierarchy-sample"
            :style="{
              fontFamily: level.family,
              fontWeight: level.weight,
              fontSize: level.size,
              color: level.color || '#ffffff'
            }"
          >
            {{ level.sample }}
          </div>
          <div class="typography-showcase__hierarchy-label">{{ level.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  fonts: { 
    type: Array, 
    default: () => [
      { 
        name: 'Headline', 
        family: 'Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', 
        weight: '700', 
        size: '32px',
        sample: 'Dolce Juices',
        color: '#fb923c'
      },
      { 
        name: 'Body', 
        family: 'Open Sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', 
        weight: '400', 
        size: '16px',
        sample: 'Premium juice brand for health-conscious individuals',
        color: '#ffffff'
      }
    ]
  },
  hierarchy: { 
    type: Array, 
    default: () => [
      { 
        name: 'H1 - Main Headline', 
        family: 'Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', 
        weight: '700', 
        size: '48px',
        sample: 'Dolce Juices',
        color: '#ffffff'
      },
      { 
        name: 'H2 - Section Headline', 
        family: 'Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', 
        weight: '600', 
        size: '32px',
        sample: 'Brand Identity',
        color: '#fb923c'
      },
      { 
        name: 'H3 - Subsection', 
        family: 'Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', 
        weight: '600', 
        size: '24px',
        sample: 'Color Palette',
        color: '#ffffff'
      },
      { 
        name: 'Body Text', 
        family: 'Open Sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', 
        weight: '400', 
        size: '16px',
        sample: 'Clean, modern typography that enhances the minimal, premium aesthetic.',
        color: '#cccccc'
      },
      { 
        name: 'Caption', 
        family: 'Open Sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', 
        weight: '400', 
        size: '14px',
        sample: 'Deep Teal (#0c4240) and Warm Apricot (#f7aa54)',
        color: '#999999'
      }
    ]
  }
})
</script>

<style scoped lang="scss">
@import '../../../../scss/global.scss';

.typography-showcase {
  margin: 24px 0;
  
  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 24px;
    margin-bottom: 32px;
  }
  
  &__item {
    background: #2a2a2a;
    border-radius: 12px;
    border: 1px solid #404040;
    overflow: hidden;
    transition: transform 0.2s ease;
    
    &:hover {
      transform: translateY(-2px);
      border-color: #fb923c;
    }
  }
  
  &__preview {
    padding: 24px;
  }
  
  &__sample {
    margin-bottom: 16px;
    line-height: 1.4;
    word-break: break-word;
  }
  
  &__details {
    border-top: 1px solid #404040;
    padding-top: 16px;
  }
  
  &__name {
    font-size: 14px;
    font-weight: 600;
    color: #fb923c;
    margin-bottom: 8px;
  }
  
  &__specs {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }
  
  &__family,
  &__weight,
  &__size {
    font-size: 12px;
    color: #999;
    background: rgba(255, 255, 255, 0.05);
    padding: 4px 8px;
    border-radius: 4px;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  }
  
  &__hierarchy {
    margin-top: 32px;
    padding-top: 24px;
    border-top: 1px solid #404040;
  }
  
  &__hierarchy-title {
    font-size: 18px;
    font-weight: 600;
    color: #ffffff;
    margin: 0 0 20px 0;
  }
  
  &__hierarchy-grid {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  &__hierarchy-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    background: #2a2a2a;
    border-radius: 8px;
    border: 1px solid #404040;
  }
  
  &__hierarchy-sample {
    flex: 1;
    margin-right: 20px;
    line-height: 1.4;
  }
  
  &__hierarchy-label {
    font-size: 12px;
    color: #999;
    background: rgba(251, 146, 60, 0.1);
    color: #fb923c;
    padding: 6px 12px;
    border-radius: 16px;
    font-weight: 500;
    white-space: nowrap;
  }
}

@media (max-width: 768px) {
  .typography-showcase {
    &__grid {
      grid-template-columns: 1fr;
    }
    
    &__hierarchy-item {
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
    }
    
    &__hierarchy-sample {
      margin-right: 0;
    }
  }
}
</style>
