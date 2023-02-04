import { insituteApi } from '@/api/InsituteApi';
import { Candidate } from '@/models/Candidate';
import { Project } from '@/models/Project';
import { Difficulty } from '@/models/ProjectDifficulty';
import { ProjectStateID } from '@/models/ProjectState';
import { deepClone } from './array';
import { formatDate } from './string';

export function formatProjectDate(project: Project): Project {
  const formattedProject = deepClone(project);
  formattedProject.date_start = formatDate(new Date(project.date_start));
  formattedProject.date_end = formatDate(new Date(project.date_end));
  return formattedProject;
}

export function checkProjectDifficulty(difficulty: Difficulty): boolean {
  return difficulty && difficulty > 0 && difficulty < 4;
}

export async function projectIncludesCandidateSpeciality(
  candidate: Candidate,
  project: Project,
): Promise<boolean> {
  const matchedSpecialities = await Promise.all(
    project.specialities.map((speciality) =>
      insituteApi.isInSameInstitute(
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

export function canViewParticipations(stateId: ProjectStateID): boolean {
  return (
    isRecruitingState(stateId) ||
    isActiveState(stateId) ||
    isExtraState(stateId)
  );
}

export function canViewParticipants(stateId: ProjectStateID): boolean {
  return (
    isActiveState(stateId) || isArchivedState(stateId) || isExtraState(stateId)
  );
}
