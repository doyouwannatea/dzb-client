import { Meta, StoryObj } from '@storybook/vue3';
import AppListItem from '../AppListItem.vue';

const meta: Meta<typeof AppListItem> = {
  title: 'ui/AppList/AppListItem',
  component: AppListItem,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AppListItem>;

export const Default: Story = {
  args: { title: 'Заголовок', default: 'контент' },
};
