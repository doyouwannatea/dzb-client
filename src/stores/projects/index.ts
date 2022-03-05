import ProjectApi from '@/api/ProjectApi';
import { Project, ProjectFilters } from '@/models/Project';
import { defineStore } from 'pinia';
import { ProjectFilterOptions, state } from './state';

export const useProjectsStore = defineStore('projects', {
  state,
  actions: {
    // MUTATIONS
    setProjectList(projectList?: Project[], projectCount = 0) {
      this.projectList = projectList;
      this.projectCount = projectCount;
    },
    setFilters(filters?: ProjectFilters) {
      if (filters) {
        this.filters = { ...this.filters, ...filters };
      }
    },
    setFilterOptions(options: ProjectFilterOptions) {
      this.filterOptions = options;
    },
    // ASYNC ACTIONS
    async getProjectList() {
      this.setProjectList();
      this.loading = true;
      this.error = '';
      try {
        const { data, projectCount } = await ProjectApi.filterProjectList(
          this.filters,
        );
        this.setProjectList(data, projectCount);
      } catch (error) {
        this.error = String(error);
      } finally {
        this.loading = false;
      }
    },
    async getSingleProject(projectId: number) {
      this.openedProject = undefined;
      this.loading = true;
      this.error = '';
      try {
        const project = await ProjectApi.getSingleProject(projectId);
        this.openedProject = project;
      } catch (error) {
        this.error = String(error);
      } finally {
        this.loading = false;
      }
    },
  },
});
