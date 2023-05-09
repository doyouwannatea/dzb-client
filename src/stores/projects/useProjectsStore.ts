import { ProjectFilters } from '@/models/Project';
import { defineStore } from 'pinia';
import { DEFAULT_FILTERS, state } from './state';

export const useProjectsStore = defineStore('projects', {
  state,
  actions: {
    setFilters(filters: Partial<ProjectFilters>) {
      this.filters = { ...this.filters, ...filters };
    },
    updateFilters() {
      const currentRoute = this.$router.currentRoute;
      this.$router.push({ ...currentRoute, query: this.filters });
    },
    clearFilters() {
      this.filters = { ...DEFAULT_FILTERS };
    },
  },
});
