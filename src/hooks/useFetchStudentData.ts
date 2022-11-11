import { useParticipationsStore } from '@/stores/participations/useParticipationsStore';
import { useProjectsStore } from '@/stores/projects/useProjectsStore';
import { useSkillsStore } from '@/stores/skills/useSkillsStore';
import { onBeforeMount } from 'vue';

export const useFetchStudentData = () => {
  const participationsStore = useParticipationsStore();
  const projectsStore = useProjectsStore();
  const skillsStore = useSkillsStore();

  onBeforeMount(() => {
    projectsStore.getUserProjectList();
    participationsStore.getParticipationList();
    skillsStore.getUserSkills();
  });
};
