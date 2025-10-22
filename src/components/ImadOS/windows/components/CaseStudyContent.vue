<template>
  <div class="preview-content">
    <div class="preview-scroll" ref="scrollContainer">
      <div class="preview-hero" v-if="caseStudy">
        <div class="preview-hero__image">
          <img :src="caseStudy.heroImage" :alt="caseStudy.title" />
        </div>
        <div class="preview-hero__content">
          <h1 class="preview-hero__title">{{ caseStudy.title }}</h1>
          <p class="preview-hero__subtitle">{{ caseStudy.subtitle }}</p>
          <div class="preview-hero__meta">
            <span class="preview-meta-item">{{ caseStudy.year }}</span>
            <span class="preview-meta-item">{{ caseStudy.client }}</span>
            <div class="preview-services">
              <span 
                v-for="service in caseStudy.services" 
                :key="service"
                class="preview-service-tag"
              >
                {{ service }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="preview-section" v-if="caseStudy?.overview">
        <h2 class="preview-section__title">Overview</h2>
        <p class="preview-section__content">{{ caseStudy.overview }}</p>
      </div>

      <div class="preview-section" v-if="caseStudy?.challenge">
        <h2 class="preview-section__title">Challenge</h2>
        <p class="preview-section__content">{{ caseStudy.challenge }}</p>
      </div>

      <div class="preview-section" v-if="caseStudy?.solution">
        <h2 class="preview-section__title">Solution</h2>
        <p class="preview-section__content">{{ caseStudy.solution }}</p>
      </div>

      <div 
        v-for="(section, index) in caseStudy?.sections" 
        :key="index"
        class="preview-section"
      >
        <h2 class="preview-section__title" v-if="section.title">{{ section.title }}</h2>
        
        <p class="preview-section__content" v-if="section.type === 'text'">
          {{ section.content }}
        </p>
        
        <div class="preview-image" v-if="section.type === 'image'">
          <img :src="section.src" :alt="section.alt" />
          <p class="preview-image__caption" v-if="section.caption">{{ section.caption }}</p>
        </div>
        
        <div class="preview-gallery" v-if="section.type === 'gallery'">
          <div 
            v-for="(image, imgIndex) in section.images" 
            :key="imgIndex"
            class="preview-gallery__item"
          >
            <img :src="image.src" :alt="image.alt" />
            <p class="preview-gallery__caption" v-if="image.caption">{{ image.caption }}</p>
          </div>
        </div>
        
        <!-- Color Palette -->
        <div class="preview-color-palette" v-if="section.type === 'color-palette'">
          <ColorPalette 
            :colors="section.colors" 
            :gradients="section.gradients"
          />
        </div>
        
        <!-- Typography Showcase -->
        <div class="preview-typography" v-if="section.type === 'typography'">
          <TypographyShowcase 
            :fonts="section.fonts" 
            :hierarchy="section.hierarchy"
          />
        </div>
      </div>

      <div class="preview-section preview-results" v-if="caseStudy?.results">
        <h2 class="preview-section__title">Results</h2>
        <div class="preview-stats">
          <div class="preview-stat" v-if="caseStudy.results.stat1">
            <div class="preview-stat__value">{{ caseStudy.results.stat1 }}</div>
            <div class="preview-stat__label">{{ caseStudy.results.stat1Label }}</div>
          </div>
          <div class="preview-stat" v-if="caseStudy.results.stat2">
            <div class="preview-stat__value">{{ caseStudy.results.stat2 }}</div>
            <div class="preview-stat__label">{{ caseStudy.results.stat2Label }}</div>
          </div>
          <div class="preview-stat" v-if="caseStudy.results.stat3">
            <div class="preview-stat__value">{{ caseStudy.results.stat3 }}</div>
            <div class="preview-stat__label">{{ caseStudy.results.stat3Label }}</div>
          </div>
        </div>
      </div>

      <div class="preview-section" v-if="caseStudy?.technologies">
        <h2 class="preview-section__title">Technologies</h2>
        <div class="preview-tech">
          <span 
            v-for="tech in caseStudy.technologies" 
            :key="tech"
            class="preview-tech-tag"
          >
            {{ tech }}
          </span>
        </div>
      </div>

      <div class="preview-section preview-testimonial" v-if="caseStudy?.testimonial">
        <blockquote class="preview-testimonial__quote">
          "{{ caseStudy.testimonial.quote }}"
        </blockquote>
        <div class="preview-testimonial__author">
          <strong>{{ caseStudy.testimonial.author }}</strong>
          <span>{{ caseStudy.testimonial.role }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ColorPalette from './ColorPalette.vue'
import TypographyShowcase from './TypographyShowcase.vue'

const props = defineProps({
  caseStudy: { type: Object, default: null }
})

const scrollContainer = ref(null)

</script>

<style scoped lang="scss">
@import '../../../../scss/global.scss';

.preview-content {
  flex: 1;
  background: #1a1a1a;
  padding: 24px;
  box-sizing: border-box;
}

.preview-scroll {
  width: 100%;
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
  text-align: center;
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
  padding: 20px;
  background: linear-gradient(135deg, rgba(251, 146, 60, 0.08) 0%, rgba(12, 66, 64, 0.12) 100%);
  border-radius: 16px;
  border: 1px solid rgba(251, 146, 60, 0.2);
  position: relative;
  overflow: hidden;
  
  &__quote {
    font-size: 22px;
    color: #ffffff;
    line-height: 1.7;
    font-weight: 300;
    position: relative;
    text-align: center;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  }
  
  &__author {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    margin-top: 12px;
    
    strong {
      color: #fb923c;
      font-size: 18px;
      font-weight: 600;
      letter-spacing: 0.5px;
    }
    
    span {
      color: #999;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-weight: 500;
    }
  }
}

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

