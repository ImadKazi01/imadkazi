<template>
  <div class="resume-content">
    <div class="resume-content__scrollable">
      <!-- Overview Section -->
      <div v-if="activeSection === 'overview'" class="resume-content__section">
        <div class="resume-content__header">
          <h1 class="resume-content__name">{{ resumeData.name }}</h1>
          <h2 class="resume-content__title">{{ resumeData.title }}</h2>
          <div class="resume-content__contact">
            <span class="resume-content__location">{{ resumeData.location }}</span>
            <span class="resume-content__email">{{ resumeData.email }}</span>
            <span class="resume-content__phone">{{ resumeData.phone }}</span>
          </div>
        </div>
        <div class="resume-content__overview">
          <p class="resume-content__text">{{ resumeData.overview }}</p>
        </div>
      </div>

      <!-- Experience Section -->
      <div v-else-if="activeSection === 'experience'" class="resume-content__section">
        <h2 class="resume-content__section-title">Professional Experience</h2>
        <div class="resume-content__experience">
          <div
            v-for="(job, index) in resumeData.experience"
            :key="index"
            class="resume-content__job"
          >
            <div class="resume-content__job-header">
              <h3 class="resume-content__job-title">{{ job.title }}</h3>
              <span class="resume-content__job-company">{{ job.company }}</span>
              <span class="resume-content__job-period">{{ job.period }}</span>
            </div>
            <p class="resume-content__job-description">{{ job.description }}</p>
            <ul class="resume-content__achievements">
              <li
                v-for="(achievement, idx) in job.achievements"
                :key="idx"
                class="resume-content__achievement"
              >
                {{ achievement }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Education Section -->
      <div v-else-if="activeSection === 'education'" class="resume-content__section">
        <h2 class="resume-content__section-title">Education</h2>
        <div class="resume-content__education">
          <div
            v-for="(edu, index) in resumeData.education"
            :key="index"
            class="resume-content__edu-item"
          >
            <h3 class="resume-content__edu-degree">{{ edu.degree }}</h3>
            <span class="resume-content__edu-school">{{ edu.school }}</span>
            <span class="resume-content__edu-year">{{ edu.year }}</span>
            <p class="resume-content__edu-description">{{ edu.description }}</p>
          </div>
        </div>
      </div>

      <!-- Skills Section -->
      <div v-else-if="activeSection === 'skills'" class="resume-content__section">
        <h2 class="resume-content__section-title">Skills & Technologies</h2>
        <div class="resume-content__skills">
          <div class="resume-content__skill-category">
            <h3 class="resume-content__skill-title">Design</h3>
            <div class="resume-content__skill-tags">
              <span
                v-for="skill in resumeData.skills.design"
                :key="skill"
                class="resume-content__skill-tag"
              >
                {{ skill }}
              </span>
            </div>
          </div>
          <div class="resume-content__skill-category">
            <h3 class="resume-content__skill-title">Development</h3>
            <div class="resume-content__skill-tags">
              <span
                v-for="skill in resumeData.skills.development"
                :key="skill"
                class="resume-content__skill-tag"
              >
                {{ skill }}
              </span>
            </div>
          </div>
          <div class="resume-content__skill-category">
            <h3 class="resume-content__skill-title">Tools</h3>
            <div class="resume-content__skill-tags">
              <span
                v-for="skill in resumeData.skills.tools"
                :key="skill"
                class="resume-content__skill-tag"
              >
                {{ skill }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Projects Section -->
      <div v-else-if="activeSection === 'projects'" class="resume-content__section">
        <h2 class="resume-content__section-title">Featured Projects</h2>
        <div class="resume-content__projects">
          <div
            v-for="(project, index) in resumeData.projects"
            :key="index"
            class="resume-content__project"
          >
            <div class="resume-content__project-header">
              <h3 class="resume-content__project-name">{{ project.name }}</h3>
              <span class="resume-content__project-year">{{ project.year }}</span>
            </div>
            <p class="resume-content__project-description">{{ project.description }}</p>
            <div class="resume-content__project-tech">
              <span
                v-for="tech in project.technologies"
                :key="tech"
                class="resume-content__tech-tag"
              >
                {{ tech }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Contact Section -->
      <div v-else-if="activeSection === 'contact'" class="resume-content__section">
        <h2 class="resume-content__section-title">Get In Touch</h2>
        <div class="resume-content__contact-info">
          <div class="resume-content__contact-item">
            <span class="resume-content__contact-label">Email:</span>
            <span class="resume-content__contact-value">{{ resumeData.email }}</span>
          </div>
          <div class="resume-content__contact-item">
            <span class="resume-content__contact-label">Phone:</span>
            <span class="resume-content__contact-value">{{ resumeData.phone }}</span>
          </div>
          <div class="resume-content__contact-item">
            <span class="resume-content__contact-label">Website:</span>
            <span class="resume-content__contact-value">{{ resumeData.website }}</span>
          </div>
          <div class="resume-content__contact-item">
            <span class="resume-content__contact-label">Location:</span>
            <span class="resume-content__contact-value">{{ resumeData.location }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  activeSection: { type: String, required: true },
  resumeData: { type: Object, required: true }
})
</script>

<style scoped lang="scss">
@import '../../../../scss/global.scss';

.resume-content {
  flex: 1;
  background: #1a1a1a;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;

  &__scrollable {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 24px;
    box-sizing: border-box;
  }

  &__section {
    max-width: 800px;
    margin: 0 auto;
  }

  &__header {
    text-align: center;
    margin-bottom: 32px;
    padding-bottom: 24px;
    border-bottom: 1px solid #404040;
  }

  &__name {
    font-size: 32px;
    font-weight: 700;
    margin: 0 0 8px 0;
    color: #ffffff;
  }

  &__title {
    font-size: 20px;
    font-weight: 400;
    margin: 0 0 16px 0;
    color: #fb923c;
  }

  &__contact {
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 16px;
    color: #999;
  }

  &__section-title {
    font-size: 24px;
    font-weight: 600;
    margin: 0 0 24px 0;
    color: #ffffff;
    border-bottom: 2px solid #fb923c;
    padding-bottom: 8px;
  }

  &__text {
    font-size: 16px;
    line-height: 1.6;
    color: #ffffff;
    margin: 0;
  }

  &__job {
    margin-bottom: 32px;
    padding-bottom: 24px;
    border-bottom: 1px solid #404040;

    &:last-child {
      border-bottom: none;
    }
  }

  &__job-header {
    margin-bottom: 12px;
  }

  &__job-title {
    font-size: 18px;
    font-weight: 600;
    margin: 0 0 4px 0;
    color: #ffffff;
  }

  &__job-company {
    font-size: 16px;
    color: #fb923c;
    margin-right: 16px;
  }

  &__job-period {
    font-size: 16px;
    color: #999;
  }

  &__job-description {
    font-size: 16px;
    line-height: 1.5;
    color: #ffffff;
    margin: 0 0 12px 0;
  }

  &__achievements {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  &__achievement {
    font-size: 16px;
    line-height: 1.5;
    color: #ffffff;
    margin-bottom: 6px;
    padding-left: 16px;
    position: relative;

    &::before {
      content: '•';
      color: #fb923c;
      position: absolute;
      left: 0;
    }
  }

  &__edu-item {
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid #404040;

    &:last-child {
      border-bottom: none;
    }
  }

  &__edu-degree {
    font-size: 18px;
    font-weight: 600;
    margin: 0 0 4px 0;
    color: #ffffff;
  }

  &__edu-school {
    font-size: 16px;
    color: #fb923c;
    margin-right: 16px;
  }

  &__edu-year {
    font-size: 16px;
    color: #999;
  }

  &__edu-description {
    font-size: 16px;
    line-height: 1.5;
    color: #ffffff;
    margin: 8px 0 0 0;
  }

  &__skill-category {
    margin-bottom: 24px;
  }

  &__skill-title {
    font-size: 16px;
    font-weight: 600;
    margin: 0 0 12px 0;
    color: #ffffff;
  }

  &__skill-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  &__skill-tag {
    background: #2a2a2a;
    color: #ffffff;
    padding: 6px 12px;
    border-radius: 16px;
    font-size: 14px;
    border: 1px solid #404040;
  }

  &__project {
    margin-bottom: 24px;
    padding: 20px;
    background: #2a2a2a;
    border-radius: 8px;
    border: 1px solid #404040;
  }

  &__project-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }

  &__project-name {
    font-size: 18px;
    font-weight: 600;
    margin: 0;
    color: #ffffff;
  }

  &__project-year {
    font-size: 16px;
    color: #999;
  }

  &__project-description {
    font-size: 16px;
    line-height: 1.5;
    color: #ffffff;
    margin: 0 0 12px 0;
  }

  &__project-tech {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  &__tech-tag {
    background: $orange-dark;
    color: #ffffff;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 11px;
  }

  &__contact-info {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__contact-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  &__contact-label {
    font-size: 12px;
    color: #999;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  &__contact-value {
    font-size: 16px;
    color: #ffffff;
  }
}
</style>
