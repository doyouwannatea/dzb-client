import ProjectApi from '@/api/ProjectApi';
import useAsyncData from './useAsyncData';

export default function useProjectList(page: number) {
  return useAsyncData(ProjectApi.getProjectList(page));
}
