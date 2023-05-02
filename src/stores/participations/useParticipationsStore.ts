import { defineStore } from 'pinia';
import {
  ParticipationPriority,
  ParticipationWithProject,
} from '@/models/Participation';
import { useModalsStore } from '../modals/useModalsStore';
import { useProjectsStore } from '../projects/useProjectsStore';
import { state } from './state';
import { candidateApi } from '@/api/CandidateApi';
import { supervisorApi } from '@/api/SupervisorApi';

export const useParticipationsStore = defineStore('participations', {
  state,
  actions: {
    // OPEN PARTICIPATION MODAL
    getParticipationList() {
      return this._onAsync(async () => {
        this.participationList = await candidateApi.getParticipationList();
      });
    },
    // OPEN PARTICIPATION MODAL

    // CREATE PATRICIPATION
    createPatricipation(priority: ParticipationPriority, projectId: number) {
      const modalsStore = useModalsStore();
      const projectsStore = useProjectsStore();

      return this._onAsync(async () => {
        await candidateApi.createProjectParticipation(priority, projectId);
        this.participationList = await candidateApi.getParticipationList();
        await projectsStore.getSingleProject(projectId);
        modalsStore.participationSuccessModal = true;
        modalsStore.participationModal = false;
      });
    },
    // CREATE PATRICIPATION

    // UPDATE PARTICIPATIONS PRIORITIES
    updateParticipationsPriorities(participations: ParticipationWithProject[]) {
      return this._onAsync(async () => {
        await candidateApi.updateParticipationList(participations);
        this.participationList = participations;
      });
    },
    // UPDATE PARTICIPATIONS PRIORITIES

    // DELETE PARTICIPATION
    deleteParticipation(id: number) {
      return this._onAsync(async () => {
        await candidateApi.deleteParticipation(id);
        this.participationList = await candidateApi.getParticipationList();
      });
    },
    // DELETE PARTICIPATION

    // GET PARTICIPATION AND PROJECT TIME
    async getCandidateParticipationTime() {
      this.participationTime = await candidateApi.getParticipationsTime();
    },

    async getSupervisorParticipationTime() {
      this.projectTime = await supervisorApi.getProposalsTime();
    },
    // GET PARTICIPATION AND PROJECT TIME

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
