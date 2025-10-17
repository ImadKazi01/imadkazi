<template>
  <div class="service-card">
    <div class="service-card__header">
      <div class="service-card__icon">
        <component :is="getServiceIcon(service.icon)" class="service-card__icon-svg" />
      </div>
      <div class="service-card__title">
        <h3 class="service-card__name">{{ service.name }}</h3>
        <p class="service-card__desc">{{ service.desc }}</p>
      </div>
    </div>

    <div class="service-card__content">
      <div class="service-card__section">
        <h4 class="service-card__section-title">Technologies & Tools</h4>
        <div class="service-card__keywords">
          <span 
            v-for="keyword in service.keyword.split(', ')" 
            :key="keyword"
            class="service-card__keyword"
          >
            {{ keyword }}
          </span>
        </div>
      </div>

      <div class="service-card__section">
        <h4 class="service-card__section-title">Software & Tools</h4>
        <div class="service-card__software">
          <div 
            v-for="tool in service.software" 
            :key="tool.name"
            class="service-card__software-item"
          >
            <div class="service-card__software-dot"></div>
            <span>{{ tool.name }}</span>
          </div>
        </div>
      </div>

      <div class="service-card__section">
        <h4 class="service-card__section-title">About This Service</h4>
        <p class="service-card__content-text">{{ service.content }}</p>
        <p class="service-card__content-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <p class="service-card__content-text">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
      </div>
    </div>

    <div class="service-card__actions">
      <button class="service-card__btn service-card__btn--primary">
        Get Quote
      </button>
      <button class="service-card__btn service-card__btn--secondary">
        View Portfolio
      </button>
    </div>
  </div>
</template>

<script setup>
import { 
  PaintBrushIcon, 
  CommandLineIcon, 
  CameraIcon 
} from '@heroicons/vue/24/outline'

const props = defineProps({
  service: { type: Object, required: true }
})

function getServiceIcon(iconName) {
  const iconMap = {
    'PaintBrushIcon': PaintBrushIcon,
    'CommandLineIcon': CommandLineIcon,
    'CameraIcon': CameraIcon
  }
  return iconMap[iconName] || PaintBrushIcon
}
</script>

<style scoped lang="scss">
@import '../../../../scss/global.scss';

.service-card {
  background: #2a2a2a;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #404040;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  margin-bottom: 24px;

  &__header {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    margin-bottom: 24px;
    padding-bottom: 20px;
    border-bottom: 1px solid #404040;
  }

  &__icon {
    width: 48px;
    height: 48px;
    background: rgba(74, 158, 255, 0.1);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  &__icon-svg {
    width: 24px;
    height: 24px;
    color: #4a9eff;
  }

  &__title {
    flex: 1;
  }

  &__name {
    font-size: 20px;
    font-weight: 600;
    color: #ffffff;
    margin: 0 0 8px;
  }

  &__desc {
    font-size: 14px;
    color: #999;
    line-height: 1.5;
    margin: 0;
  }

  &__content {
    margin-bottom: 24px;
  }

  &__section {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__section-title {
    font-size: 14px;
    font-weight: 600;
    color: #ffffff;
    margin: 0 0 12px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  &__keywords {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  &__keyword {
    background: rgba(74, 158, 255, 0.1);
    color: #4a9eff;
    padding: 4px 8px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 500;
  }

  &__software {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__software-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    color: #ffffff;
  }

  &__software-dot {
    width: 6px;
    height: 6px;
    background: #4a9eff;
    border-radius: 50%;
    flex-shrink: 0;
  }

  &__content-text {
    font-size: 14px;
    color: #999;
    line-height: 1.6;
    margin: 0;
  }

  &__actions {
    display: flex;
    gap: 12px;
    padding-top: 20px;
    border-top: 1px solid #404040;
  }

  &__btn {
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;

    &--primary {
      background: #4a9eff;
      color: #ffffff;

      &:hover {
        background: #3a8eef;
      }
    }

    &--secondary {
      background: transparent;
      color: #4a9eff;
      border: 1px solid #4a9eff;

      &:hover {
        background: rgba(74, 158, 255, 0.1);
      }
    }
  }
}
</style>
