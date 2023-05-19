import { mount } from '@vue/test-utils';
import BaseModal from '../BaseModal.vue';

describe('BaseModal.vue', () => {
  describe(':props', () => {
    it('checked инпута зависит от modelValue', async () => {
      const wrapper = mount(BaseModal, {
        props: { isShow: false },
      });
      expect(wrapper.isVisible()).toBeFalsy();
      await wrapper.setProps({ isShow: true });
      expect(wrapper.isVisible()).toBeTruthy();
    });
  });

  describe('@emits', () => {
    it('modelValue обновляется', async () => {
      const wrapper = mount(BaseModal, {
        props: {
          isShow: true,
          onClose: async () => {
            await wrapper.setProps({ isShow: false });
          },
        },
      });
      await wrapper.find('.close-btn').trigger('click');
      expect(wrapper.isVisible()).toBeFalsy();
    });
  });
});
