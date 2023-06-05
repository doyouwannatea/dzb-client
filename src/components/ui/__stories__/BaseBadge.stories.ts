import { Meta, StoryObj } from '@storybook/vue3';
import BaseBadge from '@/components/ui/BaseBadge.vue';

const meta: Meta<typeof BaseBadge> = {
  title: 'ui/BaseBadge',
  component: BaseBadge,
  tags: ['autodocs'],
  argTypes: {
    default: {
      type: 'string',
    },
  },
};

export default meta;
type Story = StoryObj<typeof BaseBadge>;

export const Default: Story = { args: { default: 'badge' } };
