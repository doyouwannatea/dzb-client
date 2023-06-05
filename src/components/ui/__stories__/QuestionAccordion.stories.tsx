import { Meta, StoryObj } from '@storybook/vue3';
import QuestionAccordion from '../accordion/QuestionAccordion.vue';

const meta: Meta<typeof QuestionAccordion> = {
  title: 'ui/accordion/QuestionAccordion',
  component: QuestionAccordion,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Стилизованный выпадающий список.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof QuestionAccordion>;

export const Default: Story = {
  args: { title: 'Заголовок компонента', content: 'Контент компонента' },
};

export const Example: Story = {
  render: (args) => ({
    setup: () => {
      return () => (
        <>
          <QuestionAccordion>
            {{ title: 'Вопрос первый', content: 'content' }}
          </QuestionAccordion>
          <QuestionAccordion>
            {{ title: 'Вопрос второй', content: 'content' }}
          </QuestionAccordion>
          <QuestionAccordion>
            {{ title: 'Вопрос третий', content: 'content' }}
          </QuestionAccordion>
        </>
      );
    },
  }),
};
