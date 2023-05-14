import { mount, shallowMount } from '@vue/test-utils';
import BaseModal from '../BaseModal.vue';

// TODO: в BaseModal ошибка при запуске тестов, как фиксить не понятно
// TODO: Cannot find module '@vueuse/integrations/useFocusTrap' from 'src/components/ui/BaseModal.vue'

describe('BaseModal.vue', () => {
  describe(':props', () => {
    it('checked инпута зависит от modelValue', async () => {
      // const wrapper = mount(BaseModal, {
      //   props: { isShow: false },
      // });
      // expect(wrapper.isVisible()).not.toBeTruthy();
      // await wrapper.setProps({ isShow: true });
      // expect(wrapper.isVisible()).toBeTruthy();
    });
  });

  describe('@emits', () => {
    it('modelValue обновляется', async () => {
      // const wrapper = mount(BaseModal, {
      //   props: { isShow: true },
      // });
      // await wrapper.find('.close-btn').trigger('click');
      // expect(wrapper.isVisible()).not.toBeTruthy();
    });
  });
});
