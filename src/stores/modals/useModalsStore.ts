import { projectIncludesCandidateSpeciality } from '@/helpers/project';
import { Candidate } from '@/models/Candidate';
import { Project } from '@/models/Project';
import { defineStore } from 'pinia';
import { useAuthStore } from '../auth/useAuthStore';
import { useParticipationsStore } from '../participations/useParticipationsStore';
import { useProjectsStore } from '../projects/useProjectsStore';
import { state } from './state';

export const useModalsStore = defineStore('modals', {
  state,
  actions: {
    // OPEN PARTICIPATION MODAL
    async openParticipationModal(project: Project) {
      const authStore = useAuthStore();
      const participationsStore = useParticipationsStore();
      const projectsStore = useProjectsStore();

      if (!authStore.isAuth || !authStore.profileData) {
        this.authModal = true;
        return;
      }

      if (!authStore.profileData.canSendParticipations) {
        this.understandModalTitle =
          'Сейчас вы не можете подать заявку на проект';
        return;
      }

      if (participationsStore.participationList) {
        for (const participation of participationsStore.participationList) {
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
        this.understandModalTitle =
          'Вы не можете отправлять заявки на проекты другого института';
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

    // OPEN EDIT DISABLE MODAL
    openEditParticipationsDisabledModal() {
      this.understandModalTitle =
        'На данный момент вы не можете изменять свои заявки';
    },
    // OPEN EDIT DISABLE MODAL

    // ON ASYNC
    async _onAsync<T>(callback: () => Promise<T>) {
      this.loading = true;
      try {
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
