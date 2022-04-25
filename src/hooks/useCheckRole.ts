import { useAuthStore } from '@/stores/auth/useAuthStore';
import { UserRole } from '@/types/vue-router';

export const useCheckRole = (roles?: UserRole[]) => {
  const authStore = useAuthStore();
  const forStudent = roles?.includes('student');
  const forTeacher = roles?.includes('teacher');
  const isStudent = authStore.profileData?.is_student;
  const isTeacher = authStore.profileData?.is_teacher;
  return (forStudent && isStudent) || (forTeacher && isTeacher);
};
