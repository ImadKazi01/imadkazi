<template>
  <div class="contact-card">
    <div class="profile-section">
      <div class="avatar-container">
        <img src="/images/memoji.png" alt="Imad" class="avatar" />
      </div>
      <div class="profile-info">
        <h1 class="name">Imad Kazi</h1>
        <p class="tagline">Designer, Developer & Photographer</p>
        <div class="location">
          <span class="location-icon">📍</span>
          <span>Huddersfield, UK</span>
        </div>
      </div>
    </div>
    
    <div class="personal-details">
      <div class="detail-item">
        <span class="label">About</span>
        <p class="value">Creative professional passionate about design, development, and capturing moments through photography.</p>
      </div>
      
      <div class="detail-item">
        <span class="label">Interests</span>
        <p class="value">UI/UX Design, Frontend Development, Photography, Technology, Innovation</p>
      </div>
      
      <div class="detail-item">
        <span class="label">Currently</span>
        <p class="value">Building amazing digital experiences and exploring new creative possibilities</p>
      </div>
    </div>
    
    <div class="contact-actions">
      <button class="contact-btn primary" @click.stop="openContact">Get in Touch</button>
      <button class="contact-btn secondary" @click.stop="openWork">View Work</button>
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
  font-size: 14px;
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
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.contact-btn {
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  flex: 1;
}

.contact-btn.primary {
  background: #007AFF;
  color: white;
}

.contact-btn.primary:hover {
  background: #0056CC;
  transform: translateY(-1px);
}

.contact-btn.secondary {
  background: rgba(255, 255, 255, 0.1);
  color: $white;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.contact-btn.secondary:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-1px);
}
</style>
