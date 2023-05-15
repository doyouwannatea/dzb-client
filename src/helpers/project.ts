import { Candidate } from '@/models/Candidate';
import { Project } from '@/models/Project';
import { ProjectDifficulty } from '@/models/ProjectDifficulty';
import { PROJECT_IDS, ProjectStateID } from '@/models/ProjectState';
import { deepClone } from './object';
import { formatDate } from './string';
import {
  CreatedProjectProposal,
  PROJECT_PROPOSAL_IDS,
  ProjectProposalStateId,
} from '@/models/ProjectProposal';
import { sharedApi } from '@/api/SharedApi';

export function formatProjectDate<T extends Project | CreatedProjectProposal>(
  project: T,
): T {
  const formattedProject = deepClone(project);
  formattedProject.date_start = formatDate(project.date_start);
  formattedProject.date_end = formatDate(project.date_end);
  return formattedProject;
}

export function checkProjectDifficulty(difficulty: ProjectDifficulty): boolean {
  return difficulty && difficulty > 0 && difficulty < 4;
}

export async function projectIncludesCandidateSpeciality(
  candidate: Candidate,
  project: Project,
): Promise<boolean> {
  const matchedSpecialities = await Promise.all(
    project.specialities.map((speciality) =>
      sharedApi.isInSameInstitute(
        speciality.name,
        candidate.training_group.split('-')[0],
      ),
    ),
  );

  return matchedSpecialities.filter(Boolean).length > 0;
}

export function isRecruitingState(stateId: ProjectStateID): boolean {
  return stateId === ProjectStateID.RecruitingState;
}
export function isActiveState(stateId: ProjectStateID): boolean {
  return stateId === ProjectStateID.ActiveState;
}
export function isExtraState(stateId: ProjectStateID): boolean {
  return stateId === ProjectStateID.ExtraState;
}
export function isArchivedState(stateId: ProjectStateID): boolean {
  return stateId === ProjectStateID.ArchivedState;
}
export function isProcessingState(stateId: ProjectStateID): boolean {
  return stateId === ProjectStateID.ProcessingState;
}

export function isProject(
  obj: Project | CreatedProjectProposal,
): obj is Project {
  return PROJECT_IDS.includes(obj.state.id as ProjectStateID);
}

export function isProposal(
  obj: Project | CreatedProjectProposal,
): obj is CreatedProjectProposal {
  return PROJECT_PROPOSAL_IDS.includes(obj.state.id as ProjectProposalStateId);
}

export function canViewParticipations(stateId: ProjectStateID): boolean {
  return (
    isRecruitingState(stateId) ||
    isActiveState(stateId) ||
    isExtraState(stateId) ||
    isProcessingState(stateId)
  );
}

export function canViewParticipants(stateId: ProjectStateID): boolean {
  return (
    isActiveState(stateId) || isArchivedState(stateId) || isExtraState(stateId)
  );
}
