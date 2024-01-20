import LatestCarousel from './LatestCarousel.vue'

export default {
  title: 'Blocks/LatestCarousel',
  component: LatestCarousel,
  argTypes: {
    buttonStyle: {
      control: {
        type: 'select'
      },
      options: ['primary', 'secondary']
    },
    title: {
      control: {
        type: 'text'
      }
    },
    copy: {
      control: {
        type: 'text'
      }
    },
    ctaText: {
      control: {
        type: 'text'
      }
    },
    ctaLink: {
      control: {
        type: 'text'
      }
    }
  }
}

export const Default = {
  args: {
    buttonStyle: 'primary',
    title: `Hi, I'm Imad`,
    copy: `I'm a designer and developer based in London, UK. I specialise in creating bespoke websites and applications for businesses of all sizes.`,
    ctaText: 'View my work',
    ctaLink: '/work'
  },
}
