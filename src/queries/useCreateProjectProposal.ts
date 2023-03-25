import { projectCreationApi } from '@/api/ProjectCreationApi';
import { useMutation } from 'vue-query';

export const useCreateProjectProposal = () =>
  useMutation({
    mutationFn: projectCreationApi.createProjectProposal,
  });
