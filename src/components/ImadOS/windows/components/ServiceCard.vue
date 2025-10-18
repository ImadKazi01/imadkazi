<template>
  <div class="service-card">
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
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;

  &__section {
    margin-bottom: 20px;
  }

  &__section-title {
    font-size: 16px;
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
    background: rgba(217, 119, 6, 0.1);
    color: #fb923c;
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
    font-size: 16px;
    color: #ffffff;
  }

  &__software-dot {
    width: 6px;
    height: 6px;
    background: #fb923c;
    border-radius: 50%;
    flex-shrink: 0;
  }

  &__content-text {
    font-size: 16px;
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
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;

    &--primary {
      @include primary-button;
    }

    &--secondary {
      background: transparent;
      color: #fb923c;
      border: 1px solid #fb923c;

      &:hover {
        background: rgba(251, 146, 60, 0.1);
      }
    }
  }
}
</style>
