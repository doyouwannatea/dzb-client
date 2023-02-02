export const enum ProjectStateID {
  RecruitingState = 1,
  ActiveState = 2,
  ExtraState = 3,
  ArchivedState = 4,
}

export interface State {
  id: ProjectStateID;
  state: string;
}

export const StateClass: Record<ProjectStateID, string> = {
  [ProjectStateID.RecruitingState]: 'recruiting',
  [ProjectStateID.ActiveState]: 'active',
  [ProjectStateID.ExtraState]: 'extra',
  [ProjectStateID.ArchivedState]: 'archived',
};
