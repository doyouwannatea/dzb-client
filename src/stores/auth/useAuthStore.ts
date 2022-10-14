import { defineStore } from 'pinia';
import { state } from './state';
import { useModalsStore } from '../modals/useModalsStore';
import { ParticipationWithProject, Priority } from '@/models/Participation';
import { Tag } from '@/models/Project';
import { campusApi } from '@/api/CampusApi';
import { participationApi } from '@/api/ParticipationApi';
import { projectApi } from '@/api/ProjectApi';
import { skillsApi } from '@/api/SkillsApi';
import { useProjectsStore } from '../projects/useProjectsStore';
import { isSupervisor } from '@/helpers/typeCheck';
import { RouteNames } from '@/router/types/route-names';
import { useSaveCurrentRoute } from '@/hooks/useSaveRoute';

export const useAuthStore = defineStore('auth', {
  state,
  actions: {
    // AUTH
    auth() {
      return this._onAsync(async () => {
        useSaveCurrentRoute(this.router);
        await campusApi.auth();
      });
    },
    // AUTH

    // FETCH USER DATA
    fetchUserData() {
      return this._onAsync(async () => {
        const profileData = await campusApi.getUserInfo();
        if (isSupervisor(profileData)) return;
        this.profileData = profileData;
        this.participationList = await participationApi.getParticipationList();
        this.projectList = await projectApi.getUserProjectList();
        this.userSkills = await skillsApi.getUserSkills();
      });
    },
    // FETCH USER DATA

    // EXIT
    async exit() {
      const projectStore = useProjectsStore();

      await campusApi.logout();
      this.router.replace({ name: RouteNames.HOME });
      this.profileData = undefined;
      await projectStore.getAddProjectData();
    },
    // EXIT

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

    // GET USER SKILLS
    getUserSkills() {
      return this._onAsync(async () => {
        this.userSkills = await skillsApi.getUserSkills();
      });
    },
    // GET USER SKILLS

    // UPDATE USER SKILLS
    updateUserSkills(skills: Tag[]) {
      return this._onAsync(async () => {
        await skillsApi.updateUserSkills(skills);
        await this.getUserSkills();
        const profileData = await campusApi.getUserInfo();
        if (isSupervisor(profileData)) return;
        this.profileData = profileData;
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
