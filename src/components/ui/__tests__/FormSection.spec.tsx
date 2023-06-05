import { shallowMount } from '@vue/test-utils';
import { getTestId } from '@/helpers/tests';
import FormSection from '../FormSection.vue';

describe('FormSection.vue', () => {
  it('компонент отображается', async () => {
    const wrapper = shallowMount(FormSection, {
      props: { tag: '', title: '' },
    });
    expect(wrapper.exists()).toBeTruthy();
  });

  describe(':props', () => {
    it('пропсы правильно отображаются', async () => {
      const slotContent = 'slotContent';
      const tagContent = 'tagContent';
      const titleContent = 'titleContent';

      const wrapper = shallowMount(FormSection, {
        props: { tag: tagContent, title: titleContent },
        slots: { default: slotContent },
      });

      expect(wrapper.find(getTestId('tag')).text()).toBe(tagContent);
      expect(wrapper.find(getTestId('title')).text()).toBe(titleContent);
      expect(wrapper.find(getTestId('content')).text()).toBe(slotContent);
    });
  });
});
