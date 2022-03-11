import { Student } from '@/models/Student';

interface State {
  authModalShow: boolean;
  editSkillsModalShow: boolean;
  loading: boolean;
  error: string;
  profileData?: Student;
}

export const state = (): State => ({
  authModalShow: false,
  editSkillsModalShow: false,
  profileData: undefined,
  error: '',
  loading: false,
});
