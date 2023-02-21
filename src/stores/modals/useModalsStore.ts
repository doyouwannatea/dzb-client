import { defineStore } from 'pinia';
import Cookies from 'js-cookie';
import { projectIncludesCandidateSpeciality } from '@/helpers/project';
import { Project } from '@/models/Project';
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
        this.openAlertModal(
          'На данный момент Вы не можете подавать заявки на проекты',
        );
        return;
      }

      if (participationsStore.participationList) {
        for (const participation of participationsStore.participationList) {
          if (participation.project_id === project.id) {
            this.openAlertModal('Вы уже подали заявку на этот проект');
            return;
          }
        }
      }

      const isSameInstitute = await this._onAsync(() =>
        projectIncludesCandidateSpeciality(authStore.profileData!, project),
      );

      if (!isSameInstitute) {
        this.openAlertModal(
          'Вы не можете подать заявку на проект другого института',
        );
        return;
      }

      projectsStore.openedProject = project;
      this.participationModal = true;
    },
    // OPEN PARTICIPATION MODAL

    // OPEN ALERT MODAL
    openAlertModal(title?: string, subtitle?: string) {
      this.alertModalTitle = title;
      this.alertModalSubtitle = subtitle;
    },
    // OPEN ALERT MODAL

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
      this.openAlertModal('На данный момент вы не можете изменять свои заявки');
    },
    // OPEN EDIT DISABLE MODAL

    // OPEN EDIT DISABLE MODAL
    openAutoParticipationInfoModal() {
      const cookieKey = 'AUTO_PARTICIPATION_INFO_MODAL_IS_SHOWN';
      const isShown = Cookies.get(cookieKey);
      if (isShown) return;
      Cookies.set(cookieKey, 'true');
      this.openAlertModal(
        'Внимание',
        'У Вас есть автоматически созданная заявка на проект. В связи с тем, что в прошлом семестре Вы не заполнили заявки на проекты через Ярмарку проектов, Вас распределили на свободный, наиболее подходящий под Вашу специальность проект. Эта заявка имеет наименьший приоритет среди остальных заявок, Вы можете изменить её приоритет или удалить.',
      );
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
