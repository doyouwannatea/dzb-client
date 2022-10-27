import { projectApi } from '@/api/ProjectApi';
import { projectFiltersToSearchParams } from '@/helpers/query';
import { Project, ProjectFilters } from '@/models/Project';
import { RouteNames } from '@/router/types/route-names';
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import { state } from './state';
import ky from 'ky';

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
        this.setProjectList();
        this.loading = true;
        try {
          const projectListResponse = await projectApi.filterProjectList(
            this.filters,
            (progress) => {
              this.projectProgress = progress.percent;
            },
          );
          const projectCount = projectListResponse.projectCount;
          const projectList = projectListResponse.data;
          this.setProjectList(projectList, projectCount);
        } catch (error) {
          this.error = String(error);
        } finally {
          this.loading = false;
          this.projectProgress = 0;
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
        this.error = '';
        try {
          this.additionalProjectData.tags =
            await projectApi.getAllProjectTags();
          this.additionalProjectData.states =
            await projectApi.getAllProjectStates();
        } catch (error) {
          this.error = String(error);
        }
      },
      // GET SINGLE PROJECT
    },
    getters: {
      tagsLoading(): boolean {
        return !this.additionalProjectData.tags && !this.error;
      },
      statesLoading(): boolean {
        return !this.additionalProjectData.states && !this.error;
      },
    },
  })();
};
