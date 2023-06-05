import { Meta, StoryObj } from '@storybook/vue3';
import GridLayout from '../GridLayout.vue';

const meta: Meta<typeof GridLayout> = {
  title: 'ui/GridLayout',
  component: GridLayout,
  tags: ['autodocs'],
  argTypes: {
    cols: {
      table: {
        type: {
          summary: 'number | string',
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof GridLayout>;

export const Default: Story = {
  args: { cols: 1, default: 'default' },
};

export const TwoCols: Story = {
  args: {
    cols: 2,
    default: (
      <>
        <div>1fr</div>
        <div>1fr</div>
      </>
    ),
  },
};

export const CustomCols: Story = {
  args: {
    cols: '1fr 2fr',
    default: (
      <>
        <div>1fr</div>
        <div>2fr</div>
      </>
    ),
  },
};
