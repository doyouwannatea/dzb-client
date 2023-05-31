import { Meta, StoryObj } from '@storybook/vue3';
import BaseStub from '@/components/ui/BaseStub.vue';
import BaseButton from '@/components/ui/BaseButton.vue';

const meta: Meta<typeof BaseStub> = {
  component: BaseStub,
  tags: ['autodocs'],
  argTypes: {
    title: {
      type: 'string',
    },
    subtitle: {
      type: 'string',
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
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
