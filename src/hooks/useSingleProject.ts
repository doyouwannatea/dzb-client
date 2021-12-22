import ProjectApi from '@/api/ProjectApi';
import useAsyncData from './useAsyncData';

export default function useSingleProject(projectId: number) {
  return useAsyncData(ProjectApi.getSingleProject(projectId));
}
