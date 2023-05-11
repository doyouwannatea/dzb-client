import { sharedApi } from '@/api/SharedApi';
import BaseBadge from '@/components/ui/BaseBadge.vue';
import { flushPromises, shallowMount } from '@vue/test-utils';

describe('test', () => {
  it('тест 1', async () => {
    const res = await sharedApi.getHarvestSettings();
    console.log(res);
    const msg = 'test';
    const wrapper = shallowMount(BaseBadge, { slots: { default: msg } });

    await flushPromises();
    expect(wrapper.text()).toEqual(msg);
  });
});
