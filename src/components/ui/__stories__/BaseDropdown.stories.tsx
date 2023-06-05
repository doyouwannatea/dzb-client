import { Meta, StoryObj } from '@storybook/vue3';
import { ref, watchEffect } from 'vue';
import BaseButton from '../BaseButton.vue';
import BaseDropdown from '../BaseDropdown.vue';

const meta: Meta<typeof BaseDropdown> = {
  title: 'ui/Dropdown/BaseDropdown',
  component: BaseDropdown,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BaseDropdown>;

export const Default: Story = {
  args: { default: 'dropdown content', isOpen: true, position: { left: '0' } },
  render: (args) => ({
    setup: () => {
      const containerRef = ref<HTMLElement | undefined>(undefined);
      const isOpen = ref(args.isOpen);
      watchEffect(() => {
        containerRef.value = args.handleNode;
        isOpen.value = args.isOpen;
      });
      return () => (
        <section style={{ height: '200px' }}>
          <div
            style={{ display: 'inline-block' }}
            ref={containerRef}
            onClick={() => (isOpen.value = !isOpen.value)}
          >
            <BaseButton>trigger</BaseButton>
            <BaseDropdown
              isOpen={isOpen.value}
              onUpdate:isOpen={(value) => (isOpen.value = value)}
              handleNode={containerRef.value}
              position={args.position}
            >
              {args.default}
            </BaseDropdown>
          </div>
        </section>
      );
    },
  }),
};
