import { shallowMount } from '@vue/test-utils';
import BaseStub from '../BaseStub.vue';

describe('BaseStub.vue', () => {
  it('компонент отображается', async () => {
    const wrapper = shallowMount(BaseStub);
    expect(wrapper.exists()).toBeTruthy();
  });

  describe(':props', () => {
    it('компонент не ломается если передать пропсы', async () => {
      const wrapper = shallowMount(BaseStub, {
        props: {
          title: 'title',
          subtitle: 'subtitle',
        },
        slots: {
          button: 'button',
        },
      });
      expect(wrapper.exists()).toBeTruthy();
    });
  });
});
