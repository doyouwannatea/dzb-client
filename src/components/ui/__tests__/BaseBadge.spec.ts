import { shallowMount } from '@vue/test-utils';
import BaseBadge from '../BaseBadge.vue';

describe('BaseBadge.vue', () => {
  it('компонент отображается', async () => {
    const wrapper = shallowMount(BaseBadge);
    expect(wrapper.exists()).toBeTruthy();
  });
});
