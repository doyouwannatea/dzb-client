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
          variant: 'outlined',
          case: 'lowercase',
          disabled: true,
          fullWidth: true,
          color: 'white',
          is: 'button',
        },
      });
      expect(wrapper.exists()).toBeTruthy();

      await isExistsWithProps({ variant: 'link' });
      await isExistsWithProps({ variant: 'inline-link' });
      await isExistsWithProps({ variant: 'primary' });
      await isExistsWithProps({ variant: 'tag' });
      await isExistsWithProps({ variant: 'tag-outlined' });
      await isExistsWithProps({ is: 'router-link' });
      await isExistsWithProps({ is: 'a' });
      await isExistsWithProps({ case: 'uppercase' });
      await isExistsWithProps({ case: 'none' });
      await isExistsWithProps({ color: 'red' });
      await isExistsWithProps({ disabled: false });
      await isExistsWithProps({ fullWidth: false });

      async function isExistsWithProps(props: typeof wrapper.vm.$props) {
        await wrapper.setProps(props);
        expect(wrapper.exists()).toBeTruthy();
      }
    });
  });
});
