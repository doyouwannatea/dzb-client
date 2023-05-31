import { Meta, StoryObj } from '@storybook/vue3';
import BaseButton, {
  Variant,
  Case,
  Color,
  Is,
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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    default: {
      type: 'string',
    },
  },
};

export default meta;

type Story = StoryObj<typeof BaseButton>;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const Default: Story = { args: { default: 'Кнопка' } };

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const Primary: Story = {
  ...Default,
  args: { ...Default.args, variant: 'primary' },
};
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const InlineLink: Story = {
  ...Default,
  args: { ...Default.args, variant: 'inline-link' },
};
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const Link: Story = {
  ...Default,
  args: { ...Default.args, variant: 'link' },
};
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const Outlined: Story = {
  ...Default,
  args: { ...Default.args, variant: 'outlined' },
};
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const Tag: Story = {
  ...Default,
  args: { ...Default.args, variant: 'tag' },
};
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const TagOutlined: Story = {
  ...Default,
  args: { ...Default.args, variant: 'tag-outlined' },
};
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const Disabled: Story = {
  ...Default,
  args: { ...Default.args, disabled: true },
};
