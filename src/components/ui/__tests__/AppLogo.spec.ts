import { shallowMount } from '@vue/test-utils';
import AppLogo from '../AppLogo.vue';

describe('AppLogo.vue', () => {
  it('компонент отображается', async () => {
    const wrapper = shallowMount(AppLogo);
    expect(wrapper.exists()).toBeTruthy();
  });
});
