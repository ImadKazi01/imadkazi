<script setup>
import SiteNav from '@/components/portfolio/SiteNav.vue'
import SiteFooter from '@/components/portfolio/SiteFooter.vue'
import HeroSection from '@/components/portfolio/HeroSection.vue'
import WorkSection from '@/components/portfolio/WorkSection.vue'
import AboutSection from '@/components/portfolio/AboutSection.vue'
import SkillsSection from '@/components/portfolio/SkillsSection.vue'
import ResumeSection from '@/components/portfolio/ResumeSection.vue'
import ContactSection from '@/components/portfolio/ContactSection.vue'
import hero from '@/data/hero.json'
import workProjects from '@/data/workProjects.js'
import resume from '@/data/resume.json'
import portfolio from '@/data/portfolio.json'

const skillGroups = [
  { label: 'Development', skills: resume.skills.development },
  { label: 'Design', skills: resume.skills.design },
  { label: 'Tools', skills: resume.skills.tools }
]

const aboutSections = [
  hero.about.whatIDo,
  hero.about.whatDrivesMe,
  hero.about.currently
]
</script>

<template>
  <div class="portfolio">
    <SiteNav :email="portfolio.email" />

    <main class="portfolio__main">
      <HeroSection
        :location="hero.location"
        :copy="hero.copy"
        :background="portfolio.background"
        :cta-text="hero.ctaText"
        :cta-secondary-text="hero.ctaSecondaryText"
      />
      <WorkSection :projects="workProjects" />
      <AboutSection :intro="portfolio.about" :sections="aboutSections" />
      <SkillsSection :groups="skillGroups" />
      <ResumeSection :experience="resume.experience" :education="resume.education" />
      <ContactSection :email="portfolio.email" />
    </main>

    <SiteFooter :email="portfolio.email" />
  </div>
</template>

<style lang="scss" scoped>
.portfolio {
  min-height: 100vh;
  background: $page-bg;
  color: $text-primary;

  &__main {
    width: 100%;
    max-width: $container-max;
    margin: 0 auto;
    padding: 0 1.5rem;

    @media (min-width: $tablet) {
      padding: 0 2rem;
    }
  }
}
</style>
