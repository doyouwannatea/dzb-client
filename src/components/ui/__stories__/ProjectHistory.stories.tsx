import { Meta, StoryObj } from '@storybook/vue3';
import { vueRouter } from 'storybook-vue3-router';
import { routes } from '@/router/routes';
import ProjectHistory from '../ProjectHistory.vue';

const meta: Meta<typeof ProjectHistory> = {
  title: 'ui/ProjectHistory',
  component: ProjectHistory,
  tags: ['autodocs'],
  decorators: [vueRouter(routes)],
  argTypes: {
    projectList: {
      table: {
        type: {
          detail: `  
interface Project {
    title: string;
    year: string;
    projectId: number;
}`,
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProjectHistory>;

export const Default: Story = {
  args: {
    currentProjectId: 1,
    projectList: [
      { projectId: 1, title: 'Проект 1', year: '2021' },
      { projectId: 2, title: 'Проект 2', year: '2022' },
      { projectId: 3, title: 'Проект 3', year: '2023' },
      { projectId: 4, title: 'Проект 4', year: '2024' },
      { projectId: 5, title: 'Проект 5', year: '2025' },
      { projectId: 6, title: 'Проект 6', year: '2026' },
      { projectId: 7, title: 'Проект 7', year: '2027' },
    ],
  },
  render: (args) => ({
    setup: () => () =>
      (
        <ProjectHistory
          style={{ paddingTop: '30px' }}
          currentProjectId={args.currentProjectId}
          projectList={args.projectList}
        />
      ),
  }),
};
