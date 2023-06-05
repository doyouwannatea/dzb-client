import { Meta, StoryObj } from '@storybook/vue3';
import SimpleAccordion from '../accordion/SimpleAccordion.vue';

const meta: Meta<typeof SimpleAccordion> = {
  title: 'ui/accordion/SimpleAccordion',
  component: SimpleAccordion,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Нет контроля над состоянием выпадающего списка, вместо этого сам открывает / закрывает выпадающий список при нажатии на него.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SimpleAccordion>;

export const Default: Story = {
  args: { title: 'Заголовок компонента', content: 'Контент компонента' },
};

export const Example: Story = {
  render: (args) => ({
    setup: () => {
      return () => (
        <>
          <SimpleAccordion>
            {{ title: 'Вопрос первый', content: 'content' }}
          </SimpleAccordion>
          <SimpleAccordion>
            {{ title: 'Вопрос второй', content: 'content' }}
          </SimpleAccordion>
          <SimpleAccordion>
            {{ title: 'Вопрос третий', content: 'content' }}
          </SimpleAccordion>
        </>
      );
    },
  }),
};
