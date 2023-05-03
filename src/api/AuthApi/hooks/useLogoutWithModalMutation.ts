import { useModalsStore } from '@/stores/modals/useModalsStore';
import { useToast } from 'vue-toastification';
import { useLogoutMutation } from './useLogoutMutation';

export const useLogoutWithModalMutation = () => {
  const toast = useToast();
  const modalsStore = useModalsStore();
  const logoutMutation = useLogoutMutation({ onError });

  function logout() {
    modalsStore.openExitConfirmModal(onLogout, onCancelLogout);
  }

  function onLogout() {
    logoutMutation.mutate();
    modalsStore.closeConfirmModal();
  }

  function onCancelLogout() {
    modalsStore.closeConfirmModal();
  }

  function onError(error: unknown) {
    toast.error(String(error));
  }

  return {
    logoutMutation,
    logout,
  };
};
