import { Meta, StoryObj } from '@storybook/vue3';
import AppLogo from '../AppLogo.vue';

const meta: Meta<typeof AppLogo> = {
  title: 'ui/AppLogo',
  component: AppLogo,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AppLogo>;

export const Default: Story = {};
