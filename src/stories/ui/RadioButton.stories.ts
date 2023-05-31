import { ref, watchEffect } from 'vue';
import { Meta, StoryObj } from '@storybook/vue3';
import BaseRadioButton from '@/components/ui/BaseRadioButton.vue';

const meta: Meta<typeof BaseRadioButton> = {
  component: BaseRadioButton,
  tags: ['autodocs'],
  argTypes: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    default: {
      type: 'string',
    },
  },
};

export default meta;
type Story = StoryObj<typeof BaseRadioButton>;

export const Default: Story = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  args: {
    value: 1,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    default: 'Один',
    modelValue: null,
  },
  render: (args) => ({
    components: { BaseRadioButton },
    setup() {
      const modelValue = ref<unknown>(args.modelValue);
      watchEffect(() => {
        const value = args.modelValue;
        if (value) modelValue.value = value;
      });
      return { args, modelValue };
    },
    template: `
      <BaseRadioButton
        v-bind="args"
        v-model="modelValue"
      >
        {{ args.default }}
      </BaseRadioButton>
      <p class="mt-2">modelValue: <b>{{ modelValue }}</b></p>
    `,
  }),
};

export const MultipleButtons: Story = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  args: { value: 1, default: 'Один', modelValue: null },
  render: (args) => ({
    components: { BaseRadioButton },
    setup() {
      const modelValue = ref<unknown>(args.modelValue);
      return { args, modelValue };
    },
    template: `
      <BaseRadioButton
        v-bind="args"
        :value="1"
        v-model="modelValue"
      >
        Один
      </BaseRadioButton>

      <BaseRadioButton
        class="mt-1"
        v-bind="args"
        :value="2"
        v-model="modelValue"
      >
        Два
      </BaseRadioButton>
      <p class="mt-2">modelValue: <b>{{ modelValue }}</b></p>
    `,
  }),
};
