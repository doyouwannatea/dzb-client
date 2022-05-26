import { defineStore } from 'pinia';
import { state } from './state';
import { useModalsStore } from '../modals/useModalsStore';
import { ParticipationWithProject, Priority } from '@/models/Participation';
import { Skill } from '@/models/Project';
import { campusApi } from '@/api/CampusApi';
import { participationApi } from '@/api/ParticipationApi';
import { projectApi } from '@/api/ProjectApi';
import { skillsApi } from '@/api/SkillsApi';
import ICampusApi from '@/api/CampusApi/ICampusApi';

export const useAuthStore = defineStore('auth', {
  state,
  actions: {
    // AUTH
    auth() {
      return this._onAsync(async () => {
        await campusApi.auth();
      });
    },
    // AUTH

    // FETCH USER DATA
    fetchUserData() {
      return this._onAsync(async () => {
        this.profileData = await campusApi.getUserInfo();
        this.participationList = await participationApi.getParticipationList();
        this.projectList = await projectApi.getUserProjectList();
        this.userSkills = await skillsApi.getUserSkills();
      });
    },
    // FETCH USER DATA

    // EXIT
    exit() {
      this.profileData = undefined;
      ICampusApi.deleteAuthToken();
    },
    // EXIT

    // CREATE PATRICIPATION
    createPatricipation(priority: Priority, projectId: number) {
      const modalsStore = useModalsStore();

      return this._onAsync(async () => {
        await participationApi.createProjectParticipation(priority, projectId);
        this.participationList = await participationApi.getParticipationList();
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

    // GET USER SKILLS
    getUserSkills() {
      return this._onAsync(async () => {
        this.userSkills = await skillsApi.getUserSkills();
      });
    },
    // GET USER SKILLS

    // UPDATE USER SKILLS
    updateUserSkills(skills: Skill[]) {
      return this._onAsync(async () => {
        await skillsApi.updateUserSkills(skills);
        await this.getUserSkills();
        this.profileData = await campusApi.getUserInfo();
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
