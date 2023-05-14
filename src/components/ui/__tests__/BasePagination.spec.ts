import { shallowMount } from '@vue/test-utils';
import BasePagination from '../BasePagination.vue';

describe('BasePagination.vue', () => {
  describe(':props', () => {
    it('отрендерилось правильное количество ссылок', async () => {
      const wrapper = shallowMount(BasePagination, {
        props: {
          page: 1,
          totalItems: 20,
          pageSize: 7,
          pagesVisible: 7,
        },
      });
      expect(
        wrapper.findAll('.pagination-btn:not(.pagination-arrow)'),
      ).toHaveLength(3);
    });

    it('минимальное количество сгенерированных ссылок === 1', async () => {
      const wrapper = shallowMount(BasePagination, {
        props: {
          page: 1,
          totalItems: 0,
          pageSize: 7,
          pagesVisible: 7,
        },
      });
      expect(
        wrapper.findAll('.pagination-btn:not(.pagination-arrow)'),
      ).toHaveLength(1);
    });
  });

  describe('@emits', () => {
    it('страницы переключаются при нажатии на стрелки', async () => {
      const wrapper = shallowMount(BasePagination, {
        props: {
          page: 1,
          totalItems: 20,
          pageSize: 7,
          pagesVisible: 7,
        },
      });
      await wrapper.setProps({
        'onUpdate:page': async (page: any) => {
          await wrapper.setProps({ page });
        },
      });
      const [leftArrow, rightArrow] = wrapper.findAll('.pagination-arrow');
      expect(leftArrow.exists()).toBeTruthy();
      expect(rightArrow.exists()).toBeTruthy();
      await rightArrow.trigger('click');
      expect(wrapper.vm.page).toBe(2);
      await leftArrow.trigger('click');
      expect(wrapper.vm.page).toBe(1);
    });

    it('блокировка стрелок если достигнуты граничные значения', async () => {
      const wrapper = shallowMount(BasePagination, {
        props: {
          page: 1,
          totalItems: 20,
          pageSize: 7,
          pagesVisible: 7,
        },
      });
      await wrapper.setProps({
        'onUpdate:page': async (page: any) => {
          await wrapper.setProps({ page });
        },
      });
      const [leftArrow, rightArrow] = wrapper.findAll('.pagination-arrow');
      await leftArrow.trigger('click');
      expect(wrapper.vm.page).toBe(1);
      await wrapper.setProps({ page: 3 });
      await rightArrow.trigger('click');
      expect(wrapper.vm.page).toBe(3);
    });
  });
});
