import { ref, onBeforeMount, UnwrapRef } from 'vue';

type Data<T> = T | null;

interface Options<T> {
  defaultValue?: T;
  cancelRequest?: () => boolean;
}

export default function useAsyncData<T>(
  promise: Promise<T>,
  options?: Options<T>,
) {
  const loading = ref(false);
  const error = ref('');
  const data = ref<Data<T>>(options?.defaultValue || null);

  onBeforeMount(async () => {
    if (options?.cancelRequest && options.cancelRequest()) return;

    loading.value = true;
    error.value = '';
    try {
      data.value = (await promise) as UnwrapRef<Data<T>>;
    } catch (projectApiError) {
      error.value = String(projectApiError);
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
