import { projectIncludesCandidateSpeciality } from '@/helpers/project';
import { Project } from '@/models/Project';
import { defineStore } from 'pinia';
import { useAuthStore } from '../auth/useAuthStore';
import { useProjectsStore } from '../projects/useProjectsStore';
import { state } from './state';

export const useModalsStore = defineStore('modals', {
  state,
  actions: {
    // OPEN PARTICIPATION MODAL
    async openParticipationModal(project: Project) {
      const authStore = useAuthStore();
      const projectsStore = useProjectsStore();

      if (!authStore.isAuth || !authStore.profileData) {
        this.authModal = true;
        return;
      }

      if (authStore.participationList) {
        for (const participation of authStore.participationList) {
          if (participation.project_id === project.id) {
            this.selectedProjectModal = true;
            return;
          }
        }
      }

      const isSameInstitute = await this._onAsync(() =>
        projectIncludesCandidateSpeciality(authStore.profileData!, project),
      );

      if (!isSameInstitute) {
        this.wrongInstitutionModal = true;
        return;
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

    // ON ASYNC
    async _onAsync<T>(callback: () => Promise<T>) {
      try {
        this.loading = true;
        return await callback();
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    // ON ASYNC
  },
});
