import { Meta, StoryObj } from '@storybook/vue3';
import { toRefs } from 'vue';
import BasePagination from '../BasePagination.vue';

const meta: Meta<typeof BasePagination> = {
  title: 'ui/BasePagination',
  component: BasePagination,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BasePagination>;

export const Default: Story = {
  args: {
    page: 1,
    totalItems: 100,
    pageSize: 5,
    pagesVisible: 5,
  },

  render: (args) => ({
    setup: () => {
      const { page, totalItems, pageSize, pagesVisible } = toRefs(args);
      return () => (
        <BasePagination
          onUpdate:page={(newPage) => (page.value = newPage)}
          page={page.value}
          totalItems={totalItems.value}
          pageSize={pageSize.value}
          pagesVisible={pagesVisible.value}
        />
      );
    },
  }),
};
