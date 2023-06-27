import { Meta, StoryObj } from '@storybook/vue3';
import ScrollablePanel from '../ScrollablePanel.vue';

const loremIpsum =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore illo eaque dolores dolor omnis dolorum necessitatibus reiciendis nostrum dolorem quibusdam! dolor omnis dolorum necessitatibus reiciendis nostrum dolorem quibusdam!';

const meta: Meta<typeof ScrollablePanel> = {
  title: 'ui/ScrollablePanel',
  component: ScrollablePanel,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ScrollablePanel>;

export const Default: Story = {
  args: { header: 'header', default: loremIpsum },
  render: (args) => ({
    setup: () => () =>
      (
        <ScrollablePanel
          style={{ fontSize: '50px', lineHeight: 'normal' }}
          disableScroll={args.disableScroll}
          height={args.height}
        >
          {{ header: args.header, default: args.default }}
        </ScrollablePanel>
      ),
  }),
};
