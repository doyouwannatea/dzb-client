import { mount } from '@vue/test-utils';
import DropdownList from '../DropdownList.vue';
import { DropdownItem } from '@/models/DropdownItem';

describe('DropdownList.vue', () => {
  describe(':props', () => {
    it('isOpen отображает компонент', async () => {
      const wrapper = mount(DropdownList, {
        props: {
          itemList: [],
          isOpen: false,
          'onUpdate:isOpen': async (isOpen: any) => {
            await wrapper.setProps({ isOpen });
          },
        },
      });
      expect(wrapper.isVisible()).not.toBeTruthy();
      await wrapper.setProps({ isOpen: true });
      expect(wrapper.isVisible()).toBeTruthy();
    });

    it('отображаются все элементы списка', async () => {
      const itemList: DropdownItem[] = [
        { content: '1', type: 'link', href: '/' },
        { content: '2', type: 'button', action: () => console.log('') },
        { content: '3', type: 'link', location: { path: '/' } },
      ];
      const wrapper = mount(DropdownList, {
        props: {
          itemList,
          isOpen: true,
        },
        global: { stubs: ['router-link'] },
      });
      const passedItems = wrapper.findAll('ul > li');
      expect(passedItems).toHaveLength(3);
    });
  });
});
