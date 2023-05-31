import { ref, watchEffect } from 'vue';
import { Meta, StoryObj } from '@storybook/vue3';
import BaseCheckbox from '@/components/ui/BaseCheckbox.vue';

const meta: Meta<typeof BaseCheckbox> = {
  component: BaseCheckbox,
  tags: ['autodocs'],
  argTypes: {
    default: {
      type: 'string',
    },
    modelValue: {
      table: {
        type: {
          detail: `unknown`,
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof BaseCheckbox>;

export const Default: Story = {
  args: {
    value: 1,
    default: 'Один',
    modelValue: [],
  },
  render: (args) => ({
    components: { BaseCheckbox },
    setup() {
      const modelValue = ref<unknown[]>(args.modelValue || []);
      watchEffect(() => {
        const value = args.modelValue;
        if (value) modelValue.value = value;
      });
      return { args, modelValue };
    },
    template: `
      <BaseCheckbox
        v-bind="args"
        v-model="modelValue"
      >
        {{ args.default }}
      </BaseCheckbox>
      <p class="mt-2">modelValue: <b>{{ modelValue }}</b></p>
    `,
  }),
};

export const MultipleButtons: Story = {
  args: { value: 1, default: 'Один', modelValue: [] },
  render: (args) => ({
    components: { BaseCheckbox },
    setup() {
      const modelValue = ref<unknown[]>(args.modelValue || []);
      return { args, modelValue };
    },
    template: `
      <BaseCheckbox
        v-bind="args"
        :value="1"
        v-model="modelValue"
      >
        Один
      </BaseCheckbox>

      <BaseCheckbox
        class="mt-1"
        v-bind="args"
        :value="2"
        v-model="modelValue"
      >
        Два
      </BaseCheckbox>
      <p class="mt-2">modelValue: <b>{{ modelValue }}</b></p>
    `,
  }),
};
