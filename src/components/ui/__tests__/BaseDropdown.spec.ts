import { shallowMount } from '@vue/test-utils';
import BaseDropdown from '../BaseDropdown.vue';

describe('BaseDropdown.vue', () => {
  describe(':props', () => {
    it('isOpen отображает компонент', async () => {
      const wrapper = shallowMount(BaseDropdown, { props: { isOpen: false } });
      expect(wrapper.isVisible()).not.toBeTruthy();
      await wrapper.setProps({ isOpen: true });
      expect(wrapper.isVisible()).toBeTruthy();
    });
  });
});
