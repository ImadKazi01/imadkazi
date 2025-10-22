<template>
  <div class="color-palette">
    <div class="color-palette__grid">
      <div 
        v-for="color in colors" 
        :key="color.name"
        class="color-palette__item"
      >
        <div 
          class="color-palette__swatch" 
          :style="{ backgroundColor: color.hex }"
        ></div>
        <div class="color-palette__info">
          <div class="color-palette__name">{{ color.name }}</div>
          <div class="color-palette__hex">{{ color.hex }}</div>
        </div>
      </div>
    </div>
    
    <div v-if="gradients && gradients.length > 0" class="color-palette__gradients">
      <h4 class="color-palette__gradient-title">Gradient Applications</h4>
      <div class="color-palette__gradient-grid">
        <div 
          v-for="gradient in gradients" 
          :key="gradient.name"
          class="color-palette__gradient-item"
        >
          <div 
            class="color-palette__gradient-swatch" 
            :style="{ background: gradient.value }"
          ></div>
          <div class="color-palette__gradient-name">{{ gradient.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  colors: { 
    type: Array, 
    default: () => [
      { name: 'Deep Teal', hex: '#0c4240' },
      { name: 'Warm Apricot', hex: '#f7aa54' }
    ]
  },
  gradients: { 
    type: Array, 
    default: () => [
      { name: 'Teal to Apricot', value: 'linear-gradient(135deg, #0c4240 0%, #f7aa54 100%)' },
      { name: 'Apricot to Teal', value: 'linear-gradient(135deg, #f7aa54 0%, #0c4240 100%)' }
    ]
  }
})
</script>

<style scoped lang="scss">
@import '../../../../scss/global.scss';

.color-palette {
  margin: 24px 0;
  
  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-bottom: 32px;
  }
  
  &__item {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px;
    background: #2a2a2a;
    border-radius: 12px;
    border: 1px solid #404040;
    transition: transform 0.2s ease;
    
    &:hover {
      transform: translateY(-2px);
      border-color: #fb923c;
    }
  }
  
  &__swatch {
    width: 60px;
    height: 60px;
    border-radius: 8px;
    border: 2px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    flex-shrink: 0;
  }
  
  &__info {
    flex: 1;
  }
  
  &__name {
    font-size: 16px;
    font-weight: 600;
    color: #ffffff;
    margin-bottom: 4px;
  }
  
  &__hex {
    font-size: 14px;
    color: #999;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    background: rgba(255, 255, 255, 0.05);
    padding: 4px 8px;
    border-radius: 4px;
    display: inline-block;
  }
  
  &__gradients {
    margin-top: 32px;
    padding-top: 24px;
    border-top: 1px solid #404040;
  }
  
  &__gradient-title {
    font-size: 18px;
    font-weight: 600;
    color: #ffffff;
    margin: 0 0 16px 0;
  }
  
  &__gradient-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 16px;
  }
  
  &__gradient-item {
    text-align: center;
  }
  
  &__gradient-swatch {
    width: 100%;
    height: 80px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    margin-bottom: 8px;
  }
  
  &__gradient-name {
    font-size: 12px;
    color: #999;
    font-weight: 500;
  }
}

@media (max-width: 768px) {
  .color-palette {
    &__grid {
      grid-template-columns: 1fr;
    }
    
    &__gradient-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}
</style>
