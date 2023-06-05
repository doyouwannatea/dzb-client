import { Meta, StoryObj } from '@storybook/vue3';
import { ref, watchEffect } from 'vue';
import BaseAccordion from '../accordion/BaseAccordion.vue';

const meta: Meta<typeof BaseAccordion> = {
  title: 'ui/accordion/BaseAccordion',
  component: BaseAccordion,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BaseAccordion>;

export const Default: Story = {
  args: { title: 'Заголовок компонента', content: 'Контент компонента' },
  render: (args) => ({
    setup: () => {
      const isOpened = ref(args.opened);
      watchEffect(() => (isOpened.value = args.opened));
      return () => (
        <BaseAccordion
          opened={isOpened.value}
          animated={args.animated}
          onUpdate:opened={(opened) => (isOpened.value = opened)}
        >
          {{
            title: args.title,
            content: args.content,
            icon: args.icon,
          }}
        </BaseAccordion>
      );
    },
  }),
};
