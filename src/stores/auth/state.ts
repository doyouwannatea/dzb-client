import { Student } from '@/models/Student';

interface State {
  loading: boolean;
  error: string;
  userData?: Student;
}

export const state = (): State => ({
  userData: undefined,
  error: '',
  loading: false,
});
