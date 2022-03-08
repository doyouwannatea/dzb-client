import { Student } from '@/models/Student';

interface State {
  authModalShow: boolean;
  loading: boolean;
  error: string;
  profileData?: Student;
}

export const state = (): State => ({
  authModalShow: false,
  profileData: undefined,
  error: '',
  loading: false,
});
