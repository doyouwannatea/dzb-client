import { Student } from '@/models/Student';

interface State {
  isAuth: boolean;
  loading: boolean;
  error: string;
  userData?: Student;
}

export const state = (): State => ({
  isAuth: false,
  userData: undefined,
  error: '',
  loading: false,
});
