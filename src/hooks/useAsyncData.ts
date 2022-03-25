import { ref, onBeforeMount, UnwrapRef } from 'vue';

interface Options<T> {
  defaultValue?: T;
  cancelRequest?: () => boolean;
}

export default function useAsyncData<T>(
  fetchData: () => Promise<T>,
  options?: Options<T>,
) {
  const loading = ref(false);
  const error = ref('');
  const data = ref<T | undefined>(options?.defaultValue);

  onBeforeMount(async () => {
    if (options?.cancelRequest && options.cancelRequest()) return;

    loading.value = true;
    error.value = '';
    try {
      data.value = (await fetchData()) as UnwrapRef<T>;
    } catch (e) {
      error.value = String(e);
    } finally {
      loading.value = false;
    }
  });

  return {
    loading,
    error,
    data,
  };
}
