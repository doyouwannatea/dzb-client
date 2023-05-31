import { Meta, StoryObj } from '@storybook/vue3';
import BaseTag, { TagVariant } from '@/components/ui/BaseTag.vue';

const variantPropVariants: TagVariant[] = ['outlined', 'primary'];

const meta: Meta<typeof BaseTag> = {
  component: BaseTag,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: variantPropVariants,
    },
  },
  args: { default: 'Tag' },
};

export default meta;
type Story = StoryObj<typeof BaseTag>;

export const Default: Story = {};
export const Disabled: Story = { args: { disabled: true } };
export const Deletable: Story = { args: { deletable: true } };
