import { Meta, StoryObj } from '@storybook/vue3';
import BaseButton, {
  Case,
  Color,
  Is,
  Variant,
} from '@/components/ui/BaseButton.vue';

const variantPropVariants: Variant[] = [
  'inline-link',
  'link',
  'outlined',
  'primary',
  'tag',
  'tag-outlined',
];
const casePropVariants: Case[] = ['lowercase', 'none', 'uppercase'];
const colorPropVariants: (Color | undefined)[] = ['red', 'white', undefined];
const isPropVariants: Is[] = ['a', 'button', 'router-link'];

const meta: Meta<typeof BaseButton> = {
  title: 'ui/BaseButton',
  component: BaseButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: variantPropVariants,
    },
    case: {
      control: 'select',
      options: casePropVariants,
    },
    color: {
      control: 'select',
      options: colorPropVariants,
    },
    is: {
      control: 'select',
      options: isPropVariants,
    },
    default: {
      type: 'string',
    },
  },
};

export default meta;

type Story = StoryObj<typeof BaseButton>;

export const Default: Story = { args: { default: 'Кнопка' } };

export const Primary: Story = {
  ...Default,
  args: { ...Default.args, variant: 'primary' },
};

export const InlineLink: Story = {
  ...Default,
  args: { ...Default.args, variant: 'inline-link' },
};

export const Link: Story = {
  ...Default,
  args: { ...Default.args, variant: 'link' },
};

export const Outlined: Story = {
  ...Default,
  args: { ...Default.args, variant: 'outlined' },
};

export const Tag: Story = {
  ...Default,
  args: { ...Default.args, variant: 'tag' },
};

export const TagOutlined: Story = {
  ...Default,
  args: { ...Default.args, variant: 'tag-outlined' },
};

export const Disabled: Story = {
  ...Default,
  args: { ...Default.args, disabled: true },
};
