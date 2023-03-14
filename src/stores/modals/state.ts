// TODO: надо Alert и Confirm вынести в отдельный store

export interface State {
  loading: boolean;
  authModal: boolean;
  editSkillsModal: boolean;
  participationSuccessModal: boolean;
  participationModal: boolean;
  projectFeedbackModal: boolean;
  projectFilterModal: boolean;
  // Alert modal
  alertModalTitle?: string;
  alertModalSubtitle?: string;
  // Confirm modal
  confirmModalTitle?: string;
  confirmModalAgree?: string;
  confirmModalDisagree?: string;
  confirmModalAgreeAction?: () => void;
  confirmModalDisagreeAction?: () => void;
}

export const state = (): State => ({
  loading: false,
  authModal: false,
  editSkillsModal: false,
  participationModal: false,
  participationSuccessModal: false,
  projectFeedbackModal: false,
  projectFilterModal: false,
  // Alert modal
  alertModalTitle: undefined,
  alertModalSubtitle: '',
  // Confirm modal
  confirmModalTitle: undefined,
  confirmModalAgree: '',
  confirmModalDisagree: '',
  confirmModalAgreeAction: undefined,
  confirmModalDisagreeAction: undefined,
});
