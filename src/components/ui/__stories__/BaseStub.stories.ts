import { Meta, StoryObj } from '@storybook/vue3';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseStub from '@/components/ui/BaseStub.vue';

const meta: Meta<typeof BaseStub> = {
  title: 'ui/BaseStub',
  component: BaseStub,
  tags: ['autodocs'],
  argTypes: {
    title: {
      type: 'string',
    },
    subtitle: {
      type: 'string',
    },
    button: {
      type: 'string',
    },
  },
};

export default meta;
type Story = StoryObj<typeof BaseStub>;

export const Default: Story = {
  args: { title: 'Заголовок', subtitle: 'Подзаголовок' },
  render: (args) => ({
    components: { BaseStub, BaseButton },
    setup: () => {
      return { args };
    },
    template: `
    <BaseStub v-bind="args">
      <template #button>
        <BaseButton>Кнопка</BaseButton>
      </template>
    </BaseStub>`,
  }),
};
