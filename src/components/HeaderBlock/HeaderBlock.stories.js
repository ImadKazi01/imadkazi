import HeaderBlock from './HeaderBlock.vue'

// This default export determines where your story goes in the story list
export default {
  title: 'Blocks/Header',
  component: HeaderBlock,
  argTypes: {
    backgroundColor: {
      control: 'color'
    }
  }
}

export const Default = {
  args: {
    backgroundColor: '#0f172a'
  }
}
