import { Meta, StoryObj } from '@storybook/vue3';
import { TagVariant } from '../BaseTag.vue';
import TagList from '../TagList.vue';

const variantPropVariants: TagVariant[] = ['outlined', 'primary'];

const meta: Meta<typeof TagList> = {
  title: 'ui/TagList',
  component: TagList,
  tags: ['autodocs'],
  argTypes: {
    tagVariant: {
      control: 'select',
      options: variantPropVariants,
    },
    declOfNum: {
      table: {
        type: {
          summary: '[string, string, string]',
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TagList>;

export const Default: Story = {
  args: {
    defaultVisible: 2,
    tagList: [
      { id: 1, name: 'Название тега' },
      { id: 2, name: 'Другой тег' },
      { id: 3, name: 'Еще один' },
    ],
  },
};
