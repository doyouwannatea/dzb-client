import { ProjectTypeName } from './Project';
import { ProjectDifficulty } from './ProjectDifficulty';
import { SpecialtyCourse } from './Specialty';

export const enum MemberRole {
  Mentor = 1,
  JobDeveloper = 2,
  CoMentor = 3,
  Expert = 4,
}

export const MemberRoleText: Record<MemberRole, string> = {
  [MemberRole.Mentor]: 'Наставник',
  [MemberRole.JobDeveloper]: 'Разработчик задания',
  [MemberRole.CoMentor]: 'Сонаставник',
  [MemberRole.Expert]: 'Эксперт',
};

export interface ProjectProposalTeamMember {
  supervisor_id: number;
  role_ids: MemberRole;
}

export const enum SpecialtyPriority {
  High = 1,
  Low = 2,
}

export const enum ProjectProposalState {
  UnderReview = 6,
  Draft = 7,
  Rejected = 8,
  Approved = 9,
}

export interface ProjectProposalSpecialty {
  specialitiy_id: number;
  course: SpecialtyCourse;
  priority: SpecialtyPriority;
}

export interface ProjectProposal {
  title: string;
  places: number;
  goal: string;
  description: string;
  difficulty: ProjectDifficulty;
  date_start: string;
  date_end: string;
  requirements: string;
  customer: string;
  product_result: string;
  study_result: string;
  additional_inf: string;
  type_id: ProjectTypeName;
  theme_source_id: number;
  department_id: number;
  prev_project_id: number;
  state_id: ProjectProposalState;
  supervisors: ProjectProposalTeamMember[];
  skill_ids: number[];
  new_skills: string[];
  specialities: ProjectProposalSpecialty[];
}
