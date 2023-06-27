import { Meta, StoryObj } from '@storybook/vue3';
import ToUpButton from '../ToUpButton.vue';

const meta: Meta<typeof ToUpButton> = {
  title: 'ui/ToUpButton',
  component: ToUpButton,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ToUpButton>;

export const Default: Story = {
  args: { visible: true },
  render: (args) => ({
    setup: () => () =>
      (
        <div style={{ height: '200px' }}>
          <ToUpButton visible={args.visible} />
        </div>
      ),
  }),
};
