import { defineStore } from 'pinia';
import { participationApi } from '@/api/ParticipationApi';
import { Priority, ParticipationWithProject } from '@/models/Participation';
import { useModalsStore } from '../modals/useModalsStore';
import { useProjectsStore } from '../projects/useProjectsStore';
import { state } from './state';

export const useParticipationsStore = defineStore('participations', {
  state,
  actions: {
    // OPEN PARTICIPATION MODAL
    getParticipationList() {
      return this._onAsync(async () => {
        this.participationList = await participationApi.getParticipationList();
      });
    },
    // OPEN PARTICIPATION MODAL

    // CREATE PATRICIPATION
    createPatricipation(priority: Priority, projectId: number) {
      const modalsStore = useModalsStore();
      const projectsStore = useProjectsStore();

      return this._onAsync(async () => {
        await participationApi.createProjectParticipation(priority, projectId);
        this.participationList = await participationApi.getParticipationList();
        await projectsStore.getSingleProject(projectId);
        modalsStore.participationSuccessModal = true;
        modalsStore.participationModal = false;
      });
    },
    // CREATE PATRICIPATION

    // UPDATE PARTICIPATIONS PRIORITIES
    updateParticipationsPriorities(participations: ParticipationWithProject[]) {
      return this._onAsync(async () => {
        await participationApi.updateParticipationList(participations);
        this.participationList = participations;
      });
    },
    // UPDATE PARTICIPATIONS PRIORITIES

    // DELETE PARTICIPATION
    deleteParticipation(id: number) {
      return this._onAsync(async () => {
        await participationApi.deleteParticipation(id);
        this.participationList = await participationApi.getParticipationList();
      });
    },
    // DELETE PARTICIPATION

    // ON ASYNC
    async _onAsync<T>(callback: () => Promise<T>) {
      this.loading = true;
      this.error = '';
      try {
        return await callback();
      } catch (error) {
        this.error = String(error);
      } finally {
        this.loading = false;
      }
    },
    // ON ASYNC
  },
  getters: {
    listNotEmpty: (state) =>
      state.participationList && state.participationList.length > 0,
  },
});
