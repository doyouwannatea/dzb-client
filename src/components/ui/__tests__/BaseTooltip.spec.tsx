import { shallowMount } from '@vue/test-utils';
import { getTestId } from '@/helpers/tests';
import BaseTooltip from '../BaseTooltip.vue';

describe('BaseTooltip.vue', () => {
  it('компонент отображается', async () => {
    const wrapper = shallowMount(BaseTooltip);
    expect(wrapper.exists()).toBeTruthy();
  });

  describe(':props', () => {
    it('текст подсказки правильно отображается', async () => {
      const message = 'подсказка';

      const wrapper = shallowMount(BaseTooltip, {
        props: { message },
      });
      const messageWrapper = wrapper.find(getTestId('message'));
      expect(messageWrapper.html()).toContain(message);
    });
  });
});
