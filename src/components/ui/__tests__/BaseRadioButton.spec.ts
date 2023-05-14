import { shallowMount } from '@vue/test-utils';
import BaseRadioButton from '../BaseRadioButton.vue';

describe('BaseRadioButton.vue', () => {
  describe(':props', () => {
    it('checked инпута зависит от modelValue', async () => {
      const value = 1;
      const modelValue = undefined;
      const wrapper = shallowMount(BaseRadioButton, {
        props: { modelValue, value },
      });
      expect(wrapper.vm.checked).not.toBeTruthy();
      await wrapper.setProps({ modelValue: value });
      expect(wrapper.vm.checked).toBeTruthy();
    });
  });

  describe('@emits', () => {
    const value = 1;
    const modelValue = undefined;

    it('modelValue обновляется', async () => {
      const wrapper = shallowMount(BaseRadioButton, {
        props: { modelValue, value },
      });
      await wrapper.find('input[type=radio]').setValue(true);
      expect(wrapper.emitted('update:modelValue')?.[0][0]).toBe(value);
    });

    it('disabled не даёт обновить modelValue', async () => {
      const wrapper = shallowMount(BaseRadioButton, {
        props: { modelValue, value, disabled: true },
      });
      await wrapper.find('input[type=radio]').setValue(true);
      expect(wrapper.emitted('update:modelValue')).toBeUndefined();
    });
  });
});
