import { Meta, StoryObj } from '@storybook/vue3';
import BaseBadge from '@/components/ui/BaseBadge.vue';

const meta: Meta<typeof BaseBadge> = {
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

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const Default: Story = { args: { default: 'badge' } };
