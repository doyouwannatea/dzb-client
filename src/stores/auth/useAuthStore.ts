import { defineStore } from 'pinia';
import { state } from './state';
import { useModalsStore } from '../modals/useModalsStore';
import { ParticipationWithProject, Priority } from '@/models/Participation';
import { Skill } from '@/models/Project';
import { campusAuthApi } from '@/api/CampusAuthApi';

export const useAuthStore = defineStore('auth', {
  state,
  actions: {
    // AUTH
    auth() {
      return this._onAsync(async () => {
        await campusAuthApi.auth();
      });
    },
    // AUTH

    // FETCH USER DATA
    fetchUserData() {
      return this._onAsync(async () => {
        this.profileData = await campusAuthApi.getCandidateInfo();
        this.participationList = await campusAuthApi.getParticipationList();
        this.projectList = await campusAuthApi.getUserProjectList();
        this.userSkills = await campusAuthApi.getUserSkills();
      });
    },
    // FETCH USER DATA

    // EXIT
    exit() {
      this.profileData = undefined;
      campusAuthApi.deleteAuthToken();
    },
    // EXIT

    // CREATE PATRICIPATION
    createPatricipation(priority: Priority, projectId: number) {
      const modalsStore = useModalsStore();

      return this._onAsync(async () => {
        await campusAuthApi.createProjectParticipation(priority, projectId);
        this.participationList = await campusAuthApi.getParticipationList();
        modalsStore.projectSuccessRequestModal = true;
        modalsStore.projectRequestModal = false;
      });
    },
    // CREATE PATRICIPATION

    // UPDATE PARTICIPATIONS PRIORITIES
    updateParticipationsPriorities(participations: ParticipationWithProject[]) {
      return this._onAsync(async () => {
        await campusAuthApi.updateParticipationList(participations);
        this.participationList = participations;
      });
    },
    // UPDATE PARTICIPATIONS PRIORITIES

    // DELETE PARTICIPATION
    deleteParticipation(id: number) {
      return this._onAsync(async () => {
        await campusAuthApi.deleteParticipation(id);
        this.participationList = await campusAuthApi.getParticipationList();
      });
    },
    // DELETE PARTICIPATION

    // GET USER SKILLS
    getUserSkills() {
      return this._onAsync(async () => {
        this.userSkills = await campusAuthApi.getUserSkills();
      });
    },
    // GET USER SKILLS

    // UPDATE USER SKILLS
    updateUserSkills(skills: Skill[]) {
      return this._onAsync(async () => {
        await campusAuthApi.updateUserSkills(skills);
        await this.getUserSkills();
        this.profileData = await campusAuthApi.getCandidateInfo();
      });
    },
    // GET USER SKILLS

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
    isAuth: (state) => Boolean(state.profileData),
    isParticipationList: (state) =>
      state.participationList && state.participationList.length > 0,
  },
});
