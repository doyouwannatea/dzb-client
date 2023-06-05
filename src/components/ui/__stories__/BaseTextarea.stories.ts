import { Meta, StoryObj } from '@storybook/vue3';
import { ref, watchEffect } from 'vue';
import BaseTextarea, { TextareaResize } from '@/components/ui/BaseTextarea.vue';

const resizePropVariants: TextareaResize[] = [
  'both',
  'horizontal',
  'vertical',
  'none',
];

const meta: Meta<typeof BaseTextarea> = {
  title: 'ui/BaseTextarea',
  component: BaseTextarea,
  tags: ['autodocs'],
  argTypes: {
    resize: {
      control: 'select',
      options: resizePropVariants,
    },
  },
};

export default meta;
type Story = StoryObj<typeof BaseTextarea>;

export const Default: Story = {
  render: (args) => ({
    components: { BaseTextarea },
    setup() {
      const value = ref<string>(args.modelValue || '');
      watchEffect(() => {
        const newValue = args.modelValue;
        if (newValue) value.value = newValue;
      });
      return { args, value };
    },
    template: `
    <div class="text-area">
      <BaseTextarea v-bind="args" placeholder="Введите текст" v-model="value" />
      <div class="mt-2">modelValue: <b>{{ value }}</b></div>
    </div>
    `,
  }),
};
