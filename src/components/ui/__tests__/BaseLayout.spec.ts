import { shallowMount } from '@vue/test-utils';
import BaseLayout from '../BaseLayout.vue';

describe('BaseLayout.vue', () => {
  it('компонент отображается', async () => {
    const wrapper = shallowMount(BaseLayout, {
      slots: { header: 'header', content: 'content', footer: 'footer' },
    });
    expect(wrapper.exists()).toBeTruthy();
  });
});
