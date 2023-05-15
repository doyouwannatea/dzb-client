import { shallowMount } from '@vue/test-utils';
import BaseButton from '../BaseButton.vue';

describe('BaseButton.vue', () => {
  it('компонент отображается', async () => {
    const wrapper = shallowMount(BaseButton);
    expect(wrapper.exists()).toBeTruthy();
  });

  describe(':props', () => {
    it('компонент не ломается если передать пропсы', async () => {
      const wrapper = shallowMount(BaseButton, {
        props: {
          variant: 'link',
          case: 'lowercase',
          disabled: true,
          fullWidth: true,
          color: 'white',
        },
      });
      expect(wrapper.exists()).toBeTruthy();
    });
  });
});
