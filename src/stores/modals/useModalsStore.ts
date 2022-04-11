import { Project } from '@/models/Project';
import { defineStore } from 'pinia';
import { useAuthStore } from '../auth/useAuthStore';
import { useProjectsStore } from '../projects/useProjectsStore';
import { state } from './state';

export const useModalsStore = defineStore('modals', {
  state,
  actions: {
    // OPEN REQUEST MODAL
    openRequestModal(project: Project) {
      const authStore = useAuthStore();
      const projectsStore = useProjectsStore();

      if (authStore.isAuth) {
        projectsStore.openedProject = project;
        this.projectRequestModal = true;
        return;
      }
      this.authModal = true;
    },
    // OPEN REQUEST MODAL
  },
});
