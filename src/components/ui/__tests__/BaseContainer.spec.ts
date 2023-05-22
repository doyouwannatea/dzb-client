import { shallowMount } from '@vue/test-utils';
import BaseContainer from '../BaseContainer.vue';
import { ContainerSize } from '@/models/components/BaseContainer';

describe('BaseContainer.vue', () => {
  it('компонент отображается', async () => {
    const wrapper = shallowMount(BaseContainer);
    expect(wrapper.exists()).toBeTruthy();
  });

  describe(':props', () => {
    it('компонент не ломается если передать пропсы', async () => {
      const wrapper = shallowMount(BaseContainer, {
        props: { size: ContainerSize.lg },
        slots: { default: 'тестовый текст' },
      });
      expect(wrapper.exists()).toBeTruthy();
      await wrapper.setProps({ size: ContainerSize.md });
      expect(wrapper.exists()).toBeTruthy();
    });
  });
});
