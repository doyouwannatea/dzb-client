import { AppListItemType } from '@/models/AppList';
import AppList from '../AppList.vue';
import { shallowMount } from '@vue/test-utils';

describe('AppList.vue', () => {
  describe(':props', () => {
    it('отображаются все элементы списка', async () => {
      const items: AppListItemType[] = [
        { title: '1', content: '1' },
        { title: '2', content: '2' },
        { title: '3', content: '3' },
      ];
      const wrapper = shallowMount(AppList, { props: { items } });
      const passedItems = wrapper.findAll('ul > *');
      expect(passedItems.length).toBe(items.length);
    });
  });
});
