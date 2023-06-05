import { shallowMount } from '@vue/test-utils';
import GridLayout from '../GridLayout.vue';

describe('GridLayout.vue', () => {
  it('компонент отображается', async () => {
    const wrapper = shallowMount(GridLayout);
    expect(wrapper.exists()).toBeTruthy();
  });

  describe(':props', () => {
    it('тест', async () => {
      const wrapper = shallowMount(GridLayout, { props: { cols: 3 } });
      expect(getComputedStyle(wrapper.element).gridTemplateColumns).toBe(
        '1fr 1fr 1fr',
      );

      await wrapper.setProps({ cols: '1fr' });
      expect(getComputedStyle(wrapper.element).gridTemplateColumns).toBe('1fr');
    });
  });
});
