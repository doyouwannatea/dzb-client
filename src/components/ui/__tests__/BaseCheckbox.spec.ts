import { shallowMount } from '@vue/test-utils';
import BaseCheckbox from '../BaseCheckbox.vue';

describe('BaseCheckbox.vue', () => {
  describe(':props', () => {
    it('checked инпута зависит от modelValue', async () => {
      const value = 1;
      const modelValue: number[] = [];
      const wrapper = shallowMount(BaseCheckbox, {
        props: { modelValue, value },
      });
      expect(wrapper.vm.checked).not.toBeTruthy();
      await wrapper.setProps({ modelValue: [value] });
      expect(wrapper.vm.checked).toBeTruthy();
    });
  });

  describe('@emits', () => {
    const value = 1;
    const modelValue: number[] = [2];

    it('modelValue обновляется при изменении инпута', async () => {
      const expectedModelValue = [2, value];
      const wrapper = shallowMount(BaseCheckbox, {
        props: {
          modelValue,
          value,
          'onUpdate:modelValue': async (modelValue: any) => {
            await wrapper.setProps({ modelValue });
          },
        },
      });
      await wrapper.find('input[type=checkbox]').setValue(true);
      expect(wrapper.vm.modelValue).toMatchObject(expectedModelValue);
    });

    it('disabled не даёт обновить modelValue', async () => {
      const wrapper = shallowMount(BaseCheckbox, {
        props: { modelValue, value, disabled: true },
      });
      await wrapper.find('input[type=checkbox]').setValue(true);
      expect(wrapper.emitted('update:modelValue')).toBeUndefined();
    });
  });
});
