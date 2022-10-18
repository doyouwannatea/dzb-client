export interface State {
  loading: boolean;
  authModal: boolean;
  SelectedProjectModal: boolean;
  editSkillsModal: boolean;
  participationSuccessModal: boolean;
  participationModal: boolean;
  projectFeedbackModal: boolean;
  wrongInstitutionModal: boolean;
  projectFilterModal: boolean;
}

export const state = (): State => ({
  loading: false,
  authModal: false,
  SelectedProjectModal: false,
  editSkillsModal: false,
  participationModal: false,
  participationSuccessModal: false,
  projectFeedbackModal: false,
  wrongInstitutionModal: false,
  projectFilterModal: false,
});
