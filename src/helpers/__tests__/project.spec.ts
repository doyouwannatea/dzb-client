import { Project } from '@/models/Project';
import {
  canViewParticipants,
  canViewParticipations,
  checkProjectDifficulty,
  formatProjectDate,
  isActiveState,
  isArchivedState,
  isExtraState,
  isProcessingState,
  isProject,
  isProposal,
  isRecruitingState,
} from '../project';
import { ProjectDifficulty } from '@/models/ProjectDifficulty';
import { ProjectStateID } from '@/models/ProjectState';
import {
  CreatedProjectProposal,
  ProjectProposalStateId,
} from '@/models/ProjectProposal';

describe('project.ts', () => {
  it('formatProjectDate()', () => {
    expect(
      formatProjectDate({
        date_start: '2023/05/20',
        date_end: '2023/05/20',
      } as Project),
    ).toEqual({
      date_start: '20.05.2023',
      date_end: '20.05.2023',
    } as Project);
  });
  it('checkProjectDifficulty()', () => {
    expect(checkProjectDifficulty(0 as ProjectDifficulty)).toBeFalsy();
    expect(checkProjectDifficulty(5 as ProjectDifficulty)).toBeFalsy();
    expect(checkProjectDifficulty(ProjectDifficulty.Low)).toBeTruthy();
  });
  it('isRecruitingState()', () => {
    expect(isRecruitingState(100 as ProjectStateID)).toBeFalsy();
    expect(isRecruitingState(ProjectStateID.RecruitingState)).toBeTruthy();
  });
  it('isActiveState()', () => {
    expect(isActiveState(100 as ProjectStateID)).toBeFalsy();
    expect(isActiveState(ProjectStateID.ActiveState)).toBeTruthy();
  });
  it('isExtraState()', () => {
    expect(isExtraState(100 as ProjectStateID)).toBeFalsy();
    expect(isExtraState(ProjectStateID.ExtraState)).toBeTruthy();
  });
  it('isArchivedState()', () => {
    expect(isArchivedState(100 as ProjectStateID)).toBeFalsy();
    expect(isArchivedState(ProjectStateID.ArchivedState)).toBeTruthy();
  });
  it('isProcessingState()', () => {
    expect(isProcessingState(100 as ProjectStateID)).toBeFalsy();
    expect(isProcessingState(ProjectStateID.ProcessingState)).toBeTruthy();
  });
  it('isProject()', () => {
    expect(
      isProject({ state: { id: 100 as ProjectStateID } } as Project),
    ).toBeFalsy();
    expect(
      isProject({ state: { id: ProjectStateID.ActiveState } } as Project),
    ).toBeTruthy();
  });
  it('isProposal()', () => {
    expect(
      isProposal({
        state: { id: 100 as ProjectProposalStateId },
      } as CreatedProjectProposal),
    ).toBeFalsy();
    expect(
      isProposal({
        state: { id: ProjectProposalStateId.Approved },
      } as CreatedProjectProposal),
    ).toBeTruthy();
  });
  it('canViewParticipations()', () => {
    expect(canViewParticipations(ProjectStateID.ActiveState)).toBeTruthy();
    expect(canViewParticipations(ProjectStateID.ExtraState)).toBeTruthy();
    expect(canViewParticipations(ProjectStateID.ProcessingState)).toBeTruthy();
    expect(canViewParticipations(ProjectStateID.RecruitingState)).toBeTruthy();
    expect(canViewParticipations(ProjectStateID.ArchivedState)).toBeFalsy();
  });
  it('canViewParticipants()', () => {
    expect(canViewParticipants(ProjectStateID.ActiveState)).toBeTruthy();
    expect(canViewParticipants(ProjectStateID.ExtraState)).toBeTruthy();
    expect(canViewParticipants(ProjectStateID.ArchivedState)).toBeTruthy();
    expect(canViewParticipants(ProjectStateID.ProcessingState)).toBeFalsy();
    expect(canViewParticipants(ProjectStateID.RecruitingState)).toBeFalsy();
  });
});
