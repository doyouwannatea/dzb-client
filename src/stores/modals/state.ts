export interface State {
  authModal: boolean;
  editSkillsModal: boolean;
  projectSuccessRequestModal: boolean;
  projectRequestModal: boolean;
  projectFeedbackModal: boolean;
}

export const state = (): State => ({
  authModal: false,
  editSkillsModal: false,
  projectRequestModal: false,
  projectSuccessRequestModal: false,
  projectFeedbackModal: false,
});
