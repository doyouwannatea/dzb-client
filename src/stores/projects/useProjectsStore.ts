import { projectApi } from '@/api/ProjectApi';
import { projectIncludesCandidateSpeciality } from '@/helpers/project';
import { projectFiltersToSearchParams } from '@/helpers/query';
import { Project, ProjectFilters } from '@/models/Project';
import { RouteNames } from '@/router/types/route-names';
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../auth/useAuthStore';
import { state } from './state';

export const useProjectsStore = () => {
  const router = useRouter();

  return defineStore('projects', {
    state,
    actions: {
      setProjectList(projectList?: Project[], projectCount = 0) {
        this.projectList = projectList;
        this.projectCount = projectCount;
      },
      setFilters(filters: ProjectFilters = {}) {
        if (this.loading) return;
        this.filters = { ...this.filters, ...filters };
      },
      updateFilters() {
        if (this.loading) return;
        router.push({
          name: router.currentRoute.value.name || RouteNames.HOME,
          query: projectFiltersToSearchParams(this.filters),
        });
      },
      clearFilters() {
        if (this.loading) return;
        this.filters = {
          difficulty: undefined,
          page: undefined,
          state: undefined,
          skills: undefined,
          title: undefined,
        };
      },
      // GET PROJECT LIST
      async getProjectList() {
        const authStore = useAuthStore();
        this.setProjectList();
        this.loading = true;
        this.error = '';
        try {
          const projectListResponse = await projectApi.filterProjectList(
            this.filters,
          );
          const projectCount = projectListResponse.projectCount;
          let projectList = projectListResponse.data;
          if (authStore.profileData) {
            const profileData = authStore.profileData;
            projectList = projectList.filter((project) =>
              projectIncludesCandidateSpeciality(profileData, project),
            );
          }
          this.setProjectList(projectList, projectCount);
        } catch (error) {
          this.error = String(error);
        } finally {
          this.loading = false;
        }
      },
      // GET PROJECT LIST

      // GET SINGLE PROJECT
      async getSingleProject(projectId: number) {
        this.openedProject = undefined;
        this.loading = true;
        this.error = '';
        try {
          const project = await projectApi.getSingleProject(projectId);
          this.openedProject = project;
        } catch (error) {
          this.error = String(error);
        } finally {
          this.loading = false;
        }
      },
      // GET SINGLE PROJECT

      // GET SINGLE PROJECT
      async getAddProjectData() {
        this.additionalProjectData = {
          states: undefined,
          tags: undefined,
        };
        this.loading = true;
        this.error = '';
        try {
          this.additionalProjectData.tags =
            await projectApi.getAllProjectTags();
          this.additionalProjectData.states =
            await projectApi.getAllProjectStates();
        } catch (error) {
          this.error = String(error);
        } finally {
          this.loading = false;
        }
      },
      // GET SINGLE PROJECT
    },
    getters: {
      tagsLoading(): boolean {
        return this.loading && !this.additionalProjectData.tags;
      },
      statesLoading(): boolean {
        return this.loading && !this.additionalProjectData.states;
      },
    },
  })();
};
