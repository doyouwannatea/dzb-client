import { shallowMount } from '@vue/test-utils';
import AppListItem from '../AppListItem.vue';

describe('AppListItem.vue', () => {
  it('компонент отображается', async () => {
    const wrapper = shallowMount(AppListItem, {
      props: { bold: true, wide: true },
    });
    expect(wrapper.exists()).toBeTruthy();
  });
});
