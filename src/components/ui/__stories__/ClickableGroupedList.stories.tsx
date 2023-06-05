import { Meta, StoryObj } from '@storybook/vue3';
import ClickableGroupedList from '../clickable-grouped-list/ClickableGroupedList.vue';

const meta: Meta<typeof ClickableGroupedList> = {
  title: 'ui/ClickableGroupedList',
  component: ClickableGroupedList,
  tags: ['autodocs'],
  argTypes: {
    cols: {
      control: 'number',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ClickableGroupedList>;

export const Default: Story = {
  args: {
    cols: 2,
    groupedList: [
      {
        id: 1,
        list: [
          { id: 1, label: 'Элемент 1', value: 1 },
          { id: 2, label: 'Элемент 2', value: 2 },
          { id: 3, label: 'Элемент 3', value: 3 },
        ],
        groupLabel: 'Группа 1',
      },
      {
        id: 2,
        list: [
          { id: 4, label: 'Элемент 1', value: 4 },
          { id: 5, label: 'Элемент 2', value: 5 },
          { id: 6, label: 'Элемент 3', value: 6 },
        ],
        groupLabel: 'Группа 2',
      },
    ],
  },
};
