import { Meta, StoryObj } from '@storybook/vue3';
import DeleteButton from '../DeleteButton.vue';

const meta: Meta<typeof DeleteButton> = {
  title: 'ui/DeleteButton',
  component: DeleteButton,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DeleteButton>;

export const Default: Story = {};
