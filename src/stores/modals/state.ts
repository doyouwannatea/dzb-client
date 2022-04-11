export interface State {
  authModal: boolean;
  editSkillsModal: boolean;
  projectSuccessRequestModal: boolean;
  projectRequestModal: boolean;
}

export const state = (): State => ({
  authModal: false,
  editSkillsModal: false,
  projectRequestModal: false,
  projectSuccessRequestModal: false,
});
