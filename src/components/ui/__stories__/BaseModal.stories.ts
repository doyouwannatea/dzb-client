import { Meta, StoryObj } from '@storybook/vue3';
import { ref, watchEffect } from 'vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseModal, { ModalSize } from '@/components/ui/BaseModal.vue';

const sizePropVariants: ModalSize[] = ['m', 's'];

const meta: Meta<typeof BaseModal> = {
  title: 'ui/BaseModal',
  component: BaseModal,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: sizePropVariants,
    },
    header: {
      type: 'string',
    },
    default: {
      type: 'string',
    },
    actions: {
      type: 'string',
    },
  },
};

export default meta;
type Story = StoryObj<typeof BaseModal>;

export const Default: Story = {
  render: (args) => ({
    components: { BaseModal, BaseButton },
    setup() {
      const isShow = ref(false);
      function onClose() {
        isShow.value = false;
      }
      watchEffect(() => (isShow.value = Boolean(args.isShow)));
      return { args, isShow, onClose };
    },
    template: `
    <div style="height: 500px">
      <BaseModal v-bind="args" :is-show="isShow" @close="onClose">
        <template v-if="args.header" #header>
          {{ args.header }}
        </template>
        <template v-if="args.default" #default>
          {{ args.default }}
        </template>
        <template v-if="args.actions" #actions>
          {{ args.actions }}
        </template>
      </BaseModal>
    </div>
    `,
  }),
};
