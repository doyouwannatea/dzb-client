import { Meta, StoryObj } from '@storybook/vue3';
import BaseContainer from '@/components/ui/BaseContainer.vue';
import { ContainerSize } from '@/models/components/BaseContainer';

const sizePropVariants: ContainerSize[] = [ContainerSize.lg, ContainerSize.md];

const meta: Meta<typeof BaseContainer> = {
  component: BaseContainer,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: sizePropVariants,
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    default: {
      type: 'string',
    },
  },
};

export default meta;
type Story = StoryObj<typeof BaseContainer>;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const Default: Story = { args: { default: 'Контент' } };
