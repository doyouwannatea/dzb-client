import { mount } from '@vue/test-utils';
import DeleteButton from '../DeleteButton.vue';

describe('DeleteButton.vue', () => {
  it('компонент отображается', async () => {
    const wrapper = mount(DeleteButton);
    expect(wrapper.exists()).toBeTruthy();
  });

  describe(':props', () => {
    it('при передаче disabled кнопка выключается', async () => {
      const wrapper = mount(DeleteButton, {
        props: { disabled: true },
      });
      expect(wrapper.find('button').element.disabled).toBeTruthy();
    });
  });
});
