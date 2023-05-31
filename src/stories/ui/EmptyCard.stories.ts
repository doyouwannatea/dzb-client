import { Meta, StoryObj } from '@storybook/vue3';
import BaseEmptyCard, {
  EmptyCardSize,
} from '@/components/ui/BaseEmptyCard.vue';

const sizePropVariants: EmptyCardSize[] = ['s', 'm'];

const meta: Meta<typeof BaseEmptyCard> = {
  component: BaseEmptyCard,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: sizePropVariants,
    },
  },
};

export default meta;
type Story = StoryObj<typeof BaseEmptyCard>;

export const Default: Story = {};
export const SizeS: Story = { args: { size: 's' } };
export const SizeM: Story = { args: { size: 'm' } };
