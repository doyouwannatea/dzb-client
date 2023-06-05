import { Meta, StoryObj } from '@storybook/vue3';
import BaseLabel, { Is } from '../label/BaseLabel.vue';

const isPropVariants: Is[] = ['div', 'fieldset', 'label'];

const meta: Meta<typeof BaseLabel> = {
  title: 'ui/BaseLabel',
  component: BaseLabel,
  tags: ['autodocs'],
  argTypes: {
    is: {
      options: isPropVariants,
    },
  },
};

export default meta;
type Story = StoryObj<typeof BaseLabel>;

export const Default: Story = {
  args: { label: 'Заголовок', required: true },

  render: (args) => ({
    setup: () => () =>
      (
        <BaseLabel
          label={args.label}
          disabled={args.disabled}
          is={args.is}
          required={args.required}
        >
          <input type="text" placeholder="инпут" />
        </BaseLabel>
      ),
  }),
};
