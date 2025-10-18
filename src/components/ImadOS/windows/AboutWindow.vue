<template>
  <div class="contact-card">
    <!-- Desktop Layout -->
    <div class="contact-card__desktop">
      <div class="profile-section">
        <div class="avatar-container">
          <img src="/images/memoji.png" alt="Imad" class="avatar" />
        </div>
        <div class="profile-info">
          <h1 class="name">Hey there! 👋 I'm Imad</h1>
          <p class="tagline">Creative problem-solver who loves turning ideas into beautiful digital experiences</p>
          <div class="location">
            <span class="location-icon">📍</span>
            <span>Huddersfield, UK 🇬🇧</span>
          </div>
        </div>
      </div>
      
      <div class="personal-details">
        <div class="detail-item">
          <span class="label">✨ What I do</span>
          <p class="value">I'm a designer, developer, and photographer who gets genuinely excited about creating things that people love to use. When I'm not coding or designing, you'll find me with a camera in hand or exploring the latest tech trends.</p>
        </div>
        
        <div class="detail-item">
          <span class="label">🎯 What drives me</span>
          <p class="value">I believe great design isn't just about how things look—it's about solving real problems and making people's lives a little bit better. Every project is a chance to learn something new and push creative boundaries.</p>
        </div>
        
        <div class="detail-item">
          <span class="label">🚀 Currently</span>
          <p class="value">Working on some exciting projects and always looking for the next creative challenge. Love collaborating with passionate people who share my enthusiasm for innovation!</p>
        </div>
      </div>
      
      <div class="contact-actions">
        <button class="contact-btn primary" @click.stop="openContact">Let's chat! 💬</button>
        <button class="contact-btn secondary" @click.stop="openWork">Check out my work ✨</button>
      </div>
    </div>

    <!-- Mobile Layout -->
    <div class="contact-card__mobile">
      <!-- Mobile Header -->
      <div class="mobile-header">
        <div class="mobile-header__title">Hey there! 👋</div>
      </div>

      <!-- Mobile Content (Scrollable) -->
      <div class="mobile-content">
        <!-- Mobile Profile -->
        <div class="mobile-profile">
          <div class="mobile-avatar">
            <img src="/images/memoji.png" alt="Imad" />
          </div>
          <h1 class="mobile-name">I'm Imad! 😊</h1>
          <p class="mobile-tagline">Creative problem-solver who loves turning ideas into beautiful digital experiences</p>
          <div class="mobile-location">
            <span class="location-icon">📍</span>
            <span>Huddersfield, UK 🇬🇧</span>
          </div>
        </div>

        <!-- Mobile Details -->
        <div class="mobile-details">
          <div class="mobile-detail-card">
            <h3 class="mobile-detail-title">✨ What I do</h3>
            <p class="mobile-detail-text">I'm a designer, developer, and photographer who gets genuinely excited about creating things that people love to use. When I'm not coding or designing, you'll find me with a camera in hand or exploring the latest tech trends.</p>
          </div>
          
          <div class="mobile-detail-card">
            <h3 class="mobile-detail-title">🎯 What drives me</h3>
            <p class="mobile-detail-text">I believe great design isn't just about how things look—it's about solving real problems and making people's lives a little bit better. Every project is a chance to learn something new and push creative boundaries.</p>
          </div>
          
          <div class="mobile-detail-card">
            <h3 class="mobile-detail-title">🚀 Currently</h3>
            <p class="mobile-detail-text">Working on some exciting projects and always looking for the next creative challenge. Love collaborating with passionate people who share my enthusiasm for innovation!</p>
          </div>
        </div>

        <!-- Mobile Actions -->
        <div class="mobile-actions">
          <button class="mobile-action-btn primary" @click.stop="openContact">Let's chat! 💬</button>
          <button class="mobile-action-btn secondary" @click.stop="openWork">Check out my work ✨</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['openApp'])

function openContact() {
  emit('openApp', 'contact')
}

function openWork() {
  emit('openApp', 'work')
}
</script>

<style scoped lang="scss">
@import '../../../scss/global.scss';

.contact-card {
  color: $white;
  padding: 24px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  background: #1a1a1a;

  // Mobile-specific styles
  @media (max-width: $tablet) {
    padding: 0;
  }

  &__desktop {
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 24px;

    @media (max-width: $tablet) {
      display: none;
    }
  }

  &__mobile {
    display: none;
    flex-direction: column;
    height: 100%;
    background: #1a1a1a;
    padding: 0;

    @media (max-width: $tablet) {
      display: flex;
    }
  }
}

.profile-section {
  display: flex;
  align-items: center;
  gap: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.avatar-container {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-info {
  flex: 1;
}

.name {
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 8px 0;
  color: $white;
}

.tagline {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
  margin: 0 0 12px 0;
  font-weight: 500;
}

.location {
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 16px;
}

.location-icon {
  font-size: 16px;
}

.personal-details {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.label {
  font-size: 12px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.value {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.5;
  margin: 0;
}

.contact-actions {
  display: flex;
  gap: 12px;
  margin-top: auto;
  padding-top: 20px;
  padding-bottom: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.contact-btn {
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  flex: 1;
}

.contact-btn.primary {
  @include primary-button;
}

.contact-btn.secondary {
  @include secondary-button;
}

// Mobile-specific styles
.mobile-header {
  display: flex;
  align-items: center;
  justify-content: center;
  @include mobile-header;

  &__title {
    font-size: 20px;
    font-weight: 600;
    color: #ffffff;
  }
}

.mobile-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 16px;
  text-align: center;
  background: transparent;
}

.mobile-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.05);
  margin-bottom: 20px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.mobile-name {
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 8px 0;
  color: #ffffff;
}

.mobile-tagline {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
  margin: 0 0 12px 0;
  font-weight: 500;
}

.mobile-location {
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 16px;
}

.mobile-details {
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.mobile-detail-card {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 16px;
}

.mobile-detail-title {
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  margin: 0 0 8px 0;
}

.mobile-detail-text {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.5;
  margin: 0;
}

.mobile-content {
  flex: 1;
  overflow-y: auto;
  height: calc(100vh - 60px);
  padding: 0;
  padding-bottom: 70px; // Extra space for dock and content
}

.mobile-actions {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.mobile-action-btn {
  padding: $mobile-action-padding;
  border-radius: $radius-md;
  border: none;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &.primary {
    @include primary-button;
    padding: 16px 24px;
    font-size: 16px;
    font-weight: 600;
  }

  &.secondary {
    @include secondary-button;
    padding: 16px 24px;
    font-size: 16px;
    font-weight: 600;
  }
}
</style>
