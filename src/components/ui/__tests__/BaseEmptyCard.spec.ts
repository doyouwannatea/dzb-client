import { shallowMount } from '@vue/test-utils';
import BaseEmptyCard from '../BaseEmptyCard.vue';

describe('BaseEmptyCard.vue', () => {
  it('компонент отображается', async () => {
    const wrapper = shallowMount(BaseEmptyCard);
    expect(wrapper.exists()).toBeTruthy();
  });

  describe(':props', () => {
    it('компонент не ломается если передать пропсы', async () => {
      const wrapper = shallowMount(BaseEmptyCard, {
        props: { size: 's' },
      });
      expect(wrapper.exists()).toBeTruthy();
      await wrapper.setProps({ size: 'm' });
      expect(wrapper.exists()).toBeTruthy();
    });
  });
});
