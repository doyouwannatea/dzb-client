export interface State {
  loading: boolean;
  authModal: boolean;
  editSkillsModal: boolean;
  participationSuccessModal: boolean;
  participationModal: boolean;
  projectFeedbackModal: boolean;
  projectFilterModal: boolean;
  alertModalTitle?: string;
  alertModalSubtitle?: string;
  confirmModalTitle?: string;
  confirmModalAgree?: string;
  confirmModalDisagree?: string;
}

export const state = (): State => ({
  loading: false,
  authModal: false,
  editSkillsModal: false,
  participationModal: false,
  participationSuccessModal: false,
  projectFeedbackModal: false,
  projectFilterModal: false,
  alertModalTitle: undefined,
  alertModalSubtitle: '',
  confirmModalTitle: undefined,
  confirmModalAgree: '',
  confirmModalDisagree: '',
});
