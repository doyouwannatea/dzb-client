import { Meta, StoryObj } from '@storybook/vue3';
import BasePanel from '@/components/ui/BasePanel.vue';

const meta: Meta<typeof BasePanel> = {
  component: BasePanel,
  tags: ['autodocs'],
  argTypes: {
    default: {
      type: 'string',
    },
  },
};

export default meta;
type Story = StoryObj<typeof BasePanel>;

export const Default: Story = {};
