import { State } from './State';

export const enum ProjectStateID {
  RecruitingState = 1,
  ActiveState = 2,
  ExtraState = 3,
  ArchivedState = 4,
  ProcessingState = 5,
}

export type ProjectState = State<ProjectStateID>;

export const StateClass: Record<ProjectStateID, string> = {
  [ProjectStateID.RecruitingState]: 'recruiting',
  [ProjectStateID.ActiveState]: 'active',
  [ProjectStateID.ExtraState]: 'extra',
  [ProjectStateID.ArchivedState]: 'archived',
  [ProjectStateID.ProcessingState]: 'processing',
};

export const StateAcronyms: Partial<Record<ProjectStateID, string>> = {
  [ProjectStateID.ProcessingState]: 'Обр-ка заявок',
};
