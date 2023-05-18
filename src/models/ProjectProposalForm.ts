import { TeamMember } from '@/components/project/ProjectTeamCollect.vue';
import { EditedSkill } from '@/components/skill/SkillsEditModal.vue';
import { ProjectDifficulty } from './ProjectDifficulty';
import { MemberRole } from './ProjectProposal';
import { SelectedSpecialty } from './Specialty';

export const enum ProjectDuration {
  SpringSemester = 1,
  FallSemester = 2,
  FullYear = 3,
}

export type ProjectProposalFormValue = {
  isNewProject: boolean;
  prevProjectId: number | null;
  projectName: string;
  projectGoal: string;
  projectCustomer: string;
  projectThemeSourceId: number | null;
  projectDuration: ProjectDuration;
  projectDifficulty: ProjectDifficulty;
  skillsToBeFormed: string;
  projectExpectedResult: string;
  projectDescription: string;
  specialtyList: SelectedSpecialty<number | string>[];
  additionalSpecialtyList: SelectedSpecialty<number | string>[];
  skillList: EditedSkill[];
  team: TeamMember[];
  sharedRoleList: MemberRole[];
  currentUserRoleList: MemberRole[];
};
