import { Meta, StoryObj } from '@storybook/vue3';
import BaseTooltip, {
  TooltipPositionX,
  TooltipPositionY,
} from '@/components/ui/BaseTooltip.vue';

const posYPropVariants: TooltipPositionY[] = ['bottom', 'top'];
const posXPropVariants: TooltipPositionX[] = ['left', 'right'];

const meta: Meta<typeof BaseTooltip> = {
  component: BaseTooltip,
  tags: ['autodocs'],
  argTypes: {
    positionX: {
      control: 'select',
      options: posXPropVariants,
    },
    positionY: {
      control: 'select',
      options: posYPropVariants,
    },
  },
};

export default meta;
type Story = StoryObj<typeof BaseTooltip>;

export const Default: Story = {
  args: {
    default: 'Текст для которого нужно дополнительное описание',
    message: 'Описание для текста',
  },
};
