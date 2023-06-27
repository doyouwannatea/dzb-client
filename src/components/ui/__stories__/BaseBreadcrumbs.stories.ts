import { SBType } from '@storybook/csf';
import { Meta, StoryObj } from '@storybook/vue3';
import Breadcrumbs from '@/components/ui/BaseBreadcrumbs.vue';
import BaseBreadcrumbs from '@/components/ui/BaseBreadcrumbs.vue';
import { Breadcrumb } from '@/models/components/BaseBreadcrumbs';

const breadcrumbsPropExampleValue: Breadcrumb[] = [
  {
    title: 'Первый уровень',
  },
  {
    title: '...',
  },
];

const breadcrumbSBType: SBType = {
  name: 'object',
  value: {
    to: { name: 'other', value: 'RouteLocationRaw', required: false },
    back: {
      name: 'boolean',
      required: false,
    },
    title: { name: 'string', required: true },
  },
};

const meta: Meta<typeof BaseBreadcrumbs> = {
  title: 'ui/BaseBreadcrumbs',
  component: Breadcrumbs,
  tags: ['autodocs'],
  argTypes: {
    breadcrumbs: {
      type: {
        name: 'array',
        value: breadcrumbSBType,
        required: true,
      },
      table: {
        type: {
          detail: `
to?: RouteLocationRaw;
back?: boolean;
title: string;
          `,
        },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof BaseBreadcrumbs>;

export const Default: Story = {
  args: { breadcrumbs: breadcrumbsPropExampleValue },
};
