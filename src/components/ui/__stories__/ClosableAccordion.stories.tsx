import { Meta, StoryObj } from '@storybook/vue3';
import ClosableAccordion from '../accordion/ClosableAccordion.vue';

const meta: Meta<typeof ClosableAccordion> = {
  title: 'ui/accordion/ClosableAccordion',
  component: ClosableAccordion,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Основное отличие от <a href="?path=/docs/ui-accordion-simpleaccordion--docs"><code>SimpleAccordion</code></a> состоит в том, что выпадающее меню закрывается если событие клика сработало за пределами компонента',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ClosableAccordion>;

export const Default: Story = {
  args: { title: 'Заголовок компонента', content: 'Контент компонента' },
};

export const Example: Story = {
  render: (args) => ({
    setup: () => {
      return () => (
        <>
          <ClosableAccordion>
            {{ title: 'Вопрос первый', content: 'content' }}
          </ClosableAccordion>
          <ClosableAccordion>
            {{ title: 'Вопрос второй', content: 'content' }}
          </ClosableAccordion>
          <ClosableAccordion>
            {{ title: 'Вопрос третий', content: 'content' }}
          </ClosableAccordion>
        </>
      );
    },
  }),
};
