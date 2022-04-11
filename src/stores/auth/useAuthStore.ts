import { defineStore } from 'pinia';
import campusAuthApi from '@/api/CampusAuthApi';
import { state } from './state';
import { State } from './state';
import { useModalsStore } from '../modals/useModalsStore';

export const useAuthStore = defineStore('auth', {
  state,
  actions: {
    // AUTH
    async auth() {
      await this._onAsync(async () => {
        await campusAuthApi.auth();
        this.profileData = await campusAuthApi.getCandidateInfo();
        this.requestsList =
          await campusAuthApi.getCandidateParticipationsList();
      });
    },
    // AUTH

    // EXIT
    exit() {
      this.profileData = undefined;
    },
    // EXIT

    // CREATE PATRICIPATION
    async createPatricipation(priority: number, projectId: number) {
      const modalsStore = useModalsStore();

      await this._onAsync(async () => {
        await campusAuthApi.createProjectParticipation(priority, projectId);
        this.requestsList =
          await campusAuthApi.getCandidateParticipationsList();
        modalsStore.projectSuccessRequestModal = true;
        modalsStore.projectRequestModal = false;
      });
    },
    // CREATE PATRICIPATION

    // UPDATE PARTICIPATIONS PRIORITIES
    async updateParticipationsPriorities(
      participations: { id: number; priority: number }[],
    ) {
      await this._onAsync(async () => {
        const promises = participations.map((participation) =>
          campusAuthApi.setParticipationPriority(
            participation.id,
            participation.priority,
          ),
        );
        await Promise.allSettled(promises);
        this.requestsList =
          await campusAuthApi.getCandidateParticipationsList();
      });
    },
    // UPDATE PARTICIPATIONS PRIORITIES

    // DELETE PARTICIPATION
    async deleteParticipation(id: number) {
      await this._onAsync(async () => {
        await campusAuthApi.deleteParticipation(id);
        this.requestsList =
          await campusAuthApi.getCandidateParticipationsList();
      });
    },
    // DELETE PARTICIPATION

    // ON ASYNC
    async _onAsync<T>(callback: () => Promise<T>) {
      try {
        this.loading = true;
        this.error = '';
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
    isAuth: (state) => {
      return Boolean(state.profileData);
    },
  },
  persist: {
    afterRestore(ctx) {
      (ctx.store.$state as State).loading = false;
    },
  },
});
