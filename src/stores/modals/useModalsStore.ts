import { Project } from '@/models/Project';
import { defineStore } from 'pinia';
import { useAuthStore } from '../auth/useAuthStore';
import { useProjectsStore } from '../projects/useProjectsStore';
import { state } from './state';

export const useModalsStore = defineStore('modals', {
  state,
  actions: {
    // OPEN PARTICIPATION MODAL
    openParticipationModal(project: Project) {
      const authStore = useAuthStore();
      const projectsStore = useProjectsStore();

      if (!authStore.isAuth) {
        this.authModal = true;
        return;
      }

      if (authStore.participationList) {
        for (const participation of authStore.participationList) {
          if (participation.project_id === project.id) {
            alert('Проект уже выбран');
            return;
          }
        }
      }

      projectsStore.openedProject = project;
      this.participationModal = true;
    },
    // OPEN PARTICIPATION MODAL

    // OPEN FEEDBACK MODAL
    openFeedbackModal(project: Project) {
      const authStore = useAuthStore();
      const projectsStore = useProjectsStore();

      if (!authStore.isAuth) {
        this.authModal = true;
        return;
      }

      projectsStore.openedProject = project;
      this.projectFeedbackModal = true;
    },
    // OPEN FEEDBACK MODAL
  },
});
