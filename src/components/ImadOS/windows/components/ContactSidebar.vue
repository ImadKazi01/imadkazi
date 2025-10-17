<template>
  <div class="contact-sidebar">
    <div class="contact-sidebar__info">
      <h3 class="contact-sidebar__title">Contact Information</h3>
      <div class="contact-sidebar__item">
        <span class="contact-sidebar__label">Email:</span>
        <span class="contact-sidebar__value">hello@imadkazi.com</span>
      </div>
    </div>

    <div class="contact-sidebar__social">
      <h4 class="contact-sidebar__social-title">Follow Me</h4>
      <div class="contact-sidebar__social-links">
        <a href="#" class="contact-sidebar__social-link">LinkedIn</a>
        <a href="#" class="contact-sidebar__social-link">Twitter</a>
        <a href="#" class="contact-sidebar__social-link">Instagram</a>
        <a href="#" class="contact-sidebar__social-link">Dribbble</a>
      </div>
    </div>

    <div class="contact-sidebar__response">
      <h4 class="contact-sidebar__response-title">Response Time</h4>
      <p class="contact-sidebar__response-text">
        I typically respond within 24 hours during business days.
      </p>
    </div>
  </div>
</template>

<script setup>
// No props needed for this component
</script>

<style scoped lang="scss">
@import '../../../../scss/global.scss';

.contact-sidebar {
  width: 280px;
  min-width: 280px;
  background: #2a2a2a;
  border-left: 1px solid #404040;
  padding: 24px;
  overflow-y: auto;
  flex-shrink: 0;

  &__info {
    margin-bottom: 32px;
  }

  &__title {
    font-size: 16px;
    font-weight: 600;
    margin: 0 0 20px 0;
    color: #ffffff;
  }

  &__item {
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;
  }

  &__label {
    font-size: 12px;
    font-weight: 500;
    color: #999;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 4px;
  }

  &__value {
    font-size: 14px;
    color: #ffffff;
  }

  &__social {
    margin-bottom: 32px;

    &-title {
      font-size: 14px;
      font-weight: 600;
      margin: 0 0 16px 0;
      color: #ffffff;
    }

    &-links {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    &-link {
      font-size: 14px;
      color: #007aff;
      text-decoration: none;
      padding: 8px 0;
      transition: color 0.2s ease;

      &:hover {
        color: #0056b3;
        text-decoration: underline;
      }
    }
  }

  &__response {
    &-title {
      font-size: 14px;
      font-weight: 600;
      margin: 0 0 12px 0;
      color: #ffffff;
    }

    &-text {
      font-size: 13px;
      color: #999;
      line-height: 1.5;
      margin: 0;
    }
  }
}
</style>
