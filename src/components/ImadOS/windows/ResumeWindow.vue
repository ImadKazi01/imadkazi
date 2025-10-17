<template>
  <div class="resume">
    <div class="resume__content">
      <ResumeSidebar
        :sections="sections"
        :active-section="activeSection"
        @select-section="selectSection"
      />

      <ResumeContent
        :active-section="activeSection"
        :resume-data="resumeData"
      />
    </div>

    <ResumeHeader
      :resume-data="resumeData"
      @download="downloadResume"
      @print="printResume"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ResumeSidebar from './components/ResumeSidebar.vue'
import ResumeContent from './components/ResumeContent.vue'
import ResumeHeader from './components/ResumeHeader.vue'

const activeSection = ref('overview')

const sections = ref([
  { id: 'overview', name: 'Overview', icon: 'UserIcon' },
  { id: 'experience', name: 'Experience', icon: 'BriefcaseIcon' },
  { id: 'education', name: 'Education', icon: 'AcademicCapIcon' },
  { id: 'skills', name: 'Skills', icon: 'CogIcon' },
  { id: 'projects', name: 'Projects', icon: 'CodeBracketIcon' },
  { id: 'contact', name: 'Contact', icon: 'EnvelopeIcon' }
])

const resumeData = ref({
  name: 'Imad Kazi',
  title: 'Creative Designer & Developer',
  location: 'London, UK',
  email: 'hello@imadkazi.com',
  phone: '+44 123 456 7890',
  website: 'imadkazi.com',
  overview: 'Creative designer and developer with 5+ years of experience in branding, web design, and development. Passionate about creating beautiful, functional digital experiences.',
  experience: [
    {
      title: 'Freelance Designer & Developer',
      company: 'Self-Employed',
      period: '2019 - Present',
      description: 'Providing full-service design and development solutions for small to medium businesses.',
      achievements: [
        'Delivered 50+ successful projects',
        'Increased client revenue by 40% on average',
        'Maintained 100% client satisfaction rate'
      ]
    },
    {
      title: 'Junior Web Developer',
      company: 'Digital Agency',
      period: '2018 - 2019',
      description: 'Developed responsive websites and web applications using modern technologies.',
      achievements: [
        'Built 20+ responsive websites',
        'Improved site performance by 60%',
        'Collaborated with design team on 15+ projects'
      ]
    }
  ],
  education: [
    {
      degree: 'Bachelor of Arts in Graphic Design',
      school: 'University of Arts London',
      year: '2014 - 2018',
      description: 'Specialized in digital design, branding, and user experience.'
    }
  ],
  skills: {
    design: ['Adobe Creative Suite', 'Figma', 'Sketch', 'Principle'],
    development: ['HTML/CSS', 'JavaScript', 'Vue.js', 'React', 'Node.js'],
    tools: ['Git', 'Webpack', 'Vite', 'Docker', 'AWS']
  },
  projects: [
    {
      name: 'E-commerce Platform',
      description: 'Full-stack e-commerce solution with custom CMS',
      technologies: ['Vue.js', 'Node.js', 'MongoDB', 'Stripe'],
      year: '2023'
    },
    {
      name: 'Brand Identity System',
      description: 'Complete brand identity for tech startup',
      technologies: ['Adobe Illustrator', 'Figma', 'After Effects'],
      year: '2023'
    }
  ]
})

function selectSection(sectionId) {
  activeSection.value = sectionId
}

function downloadResume() {
  console.log('Downloading resume...')
  // Handle resume download
}

function printResume() {
  console.log('Printing resume...')
  // Handle resume printing
}
</script>

<style scoped lang="scss">
@import '../../../scss/global.scss';

.resume {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #1a1a1a;
  color: #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  overflow: hidden;

  &__content {
    display: flex;
    flex: 1;
    overflow: hidden;
    min-height: 0;
  }
}
</style>