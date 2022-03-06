import { Student } from '@/models/Student';

interface State {
  authModalShow: boolean;
  loading: boolean;
  error: string;
  userData?: Student;
}

export const state = (): State => ({
  authModalShow: false,
  userData: undefined,
  error: '',
  loading: false,
});
