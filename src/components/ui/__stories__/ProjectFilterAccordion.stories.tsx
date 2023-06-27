import { Meta, StoryObj } from '@storybook/vue3';
import ProjectFilterAccordion from '../accordion/ProjectFilterAccordion.vue';

const meta: Meta<typeof ProjectFilterAccordion> = {
  title: 'ui/accordion/ProjectFilterAccordion',
  component: ProjectFilterAccordion,
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
type Story = StoryObj<typeof ProjectFilterAccordion>;

export const Default: Story = {
  args: { title: 'Заголовок компонента', content: 'Контент компонента' },
};

export const Example: Story = {
  render: (args) => ({
    setup: () => {
      return () => (
        <>
          <ProjectFilterAccordion>
            {{ title: 'Вопрос первый', content: 'content' }}
          </ProjectFilterAccordion>
          <ProjectFilterAccordion>
            {{ title: 'Вопрос второй', content: 'content' }}
          </ProjectFilterAccordion>
          <ProjectFilterAccordion>
            {{ title: 'Вопрос третий', content: 'content' }}
          </ProjectFilterAccordion>
        </>
      );
    },
  }),
};
