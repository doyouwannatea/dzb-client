import { Meta, StoryObj } from '@storybook/vue3';
import FormSection from '../FormSection.vue';

const meta: Meta<typeof FormSection> = {
  title: 'ui/FormSection',
  component: FormSection,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FormSection>;

export const Default: Story = {
  args: { tag: 'Тег', title: 'Заголовок', default: 'Контент секции' },
};
