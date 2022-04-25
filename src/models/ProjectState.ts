export const enum StateID {
  RecruitingState = 1,
  ActiveState = 2,
  ExtraState = 3,
  ArchivedState = 4,
}

export interface State {
  id: StateID;
  state: string;
}

export const StateClass: Record<StateID, string> = {
  [StateID.RecruitingState]: 'recruiting',
  [StateID.ActiveState]: 'active',
  [StateID.ExtraState]: 'extra',
  [StateID.ArchivedState]: 'archived',
};
