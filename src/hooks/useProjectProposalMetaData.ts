import { computed } from 'vue';
import { TeamMember } from '@/components/project/ProjectTeamCollect.vue';
import { Department } from '@/models/Department';
import { MemberRole } from '@/models/ProjectProposal';
import { Specialty } from '@/models/Specialty';
import { MaybeRef, get } from '@vueuse/core';
import { ProjectProposalFormValue } from '@/models/components/ProjectProposalForm';

export function useProjectProposalMetaData(
  formValue: MaybeRef<ProjectProposalFormValue>,
  specialties?: MaybeRef<Specialty<number>[] | undefined>,
) {
  const projectMentor = computed<TeamMember | undefined>(() =>
    get(formValue).team.find((member) => member.role === MemberRole.Mentor),
  );
  const projectDepartment = computed<Department | undefined>(
    () => projectMentor.value?.memberData?.department,
  );
  const mentorSpecialties = computed<Specialty<number>[]>(
    () =>
      get(specialties)?.filter(
        (specialty) => specialty.department?.id === projectDepartment.value?.id,
      ) || [],
  );

  return {
    projectMentor,
    projectDepartment,
    mentorSpecialties,
  };
}
