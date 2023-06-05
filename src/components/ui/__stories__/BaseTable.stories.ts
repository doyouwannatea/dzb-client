import { Meta, StoryObj } from '@storybook/vue3';
import BaseTable, { RowData } from '@/components/ui/BaseTable.vue';

const initialRows: RowData[] = [
  { data: ['1', 'Венедикт', 'Зуев', 'ИСТб-19-1'], key: '1' },
  { data: ['2', 'Петров', 'Кирилл ', 'ИСТб-19-1'], key: '2' },
  { data: ['3', 'Никифоров', 'Артём', 'ИСТб-19-1'], key: '3' },
];

const initialHeaders: string[] = ['Номер', 'Имя', 'Фамилия', 'Группа'];

const meta: Meta<typeof BaseTable> = {
  title: 'ui/BaseTable',
  component: BaseTable,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BaseTable>;

export const Default: Story = {
  args: { rows: initialRows, headers: initialHeaders },
};
