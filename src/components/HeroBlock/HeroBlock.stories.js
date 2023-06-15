import HeroBlock from './HeroBlock.vue'

export default {
  title: 'Blocks/Hero',
  component: HeroBlock,
  argTypes: {
    buttonStyle: {
      control: {
        type: 'select'
      },
      options: ['primary', 'secondary']
    }
  }
}

export const Default = {}
