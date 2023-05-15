import { ComputedRef, computed } from 'vue';
import { MaybeRef, get } from '@vueuse/core';

export function usePaginatedList<T>(
  list: MaybeRef<T[] | undefined>,
  options: { pageSize: MaybeRef<number>; currentPage: MaybeRef<number> },
): ComputedRef<T[] | undefined> {
  return computed(() => {
    const listValue = get(list);
    const currentPage = get(options.currentPage);
    const pageSize = get(options.pageSize);
    if (!listValue) return undefined;
    return listValue.slice(
      (currentPage - 1) * pageSize,
      (currentPage - 1) * pageSize + pageSize,
    );
  });
}
