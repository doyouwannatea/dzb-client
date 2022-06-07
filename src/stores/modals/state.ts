export interface State {
  loading: boolean;
  authModal: boolean;
  editSkillsModal: boolean;
  participationSuccessModal: boolean;
  participationModal: boolean;
  projectFeedbackModal: boolean;
  wrongInstitutionModal: boolean;
}

export const state = (): State => ({
  loading: false,
  authModal: false,
  editSkillsModal: false,
  participationModal: false,
  participationSuccessModal: false,
  projectFeedbackModal: false,
  wrongInstitutionModal: false,
});
