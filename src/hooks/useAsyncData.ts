import { ref, onBeforeMount, UnwrapRef } from 'vue';

type Data<T> = T | null;

export default function useAsyncData<T>(promise: Promise<T>) {
  const loading = ref(false);
  const error = ref('');
  const data = ref<Data<T>>(null);

  onBeforeMount(async () => {
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
