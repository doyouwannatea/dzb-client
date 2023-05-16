import { shallowMount } from '@vue/test-utils';
import BaseTag from '../BaseTag.vue';

describe('BaseTag.vue', () => {
  it('компонент отображается', async () => {
    const wrapper = shallowMount(BaseTag);
    expect(wrapper.exists()).toBeTruthy();
  });

  describe(':props', () => {
    it('кнопка удаления появляется и реагирует на событие', async () => {
      const wrapper = shallowMount(BaseTag, {
        props: { deletable: true },
        slots: { default: 'default' },
      });
      let buttonWrapper = wrapper.find('button.remove-btn');
      expect(buttonWrapper.exists()).toBeTruthy();
      await buttonWrapper.trigger('click');
      expect(wrapper.emitted('delete')).toHaveLength(1);
      await wrapper.setProps({ deletable: false });
      buttonWrapper = wrapper.find('button.remove-btn');
      expect(buttonWrapper.exists()).not.toBeTruthy();
    });
  });
});
