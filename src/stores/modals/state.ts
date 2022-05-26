export interface State {
  authModal: boolean;
  editSkillsModal: boolean;
  participationSuccessModal: boolean;
  participationModal: boolean;
  projectFeedbackModal: boolean;
}

export const state = (): State => ({
  authModal: false,
  editSkillsModal: false,
  participationModal: false,
  participationSuccessModal: false,
  projectFeedbackModal: false,
});
