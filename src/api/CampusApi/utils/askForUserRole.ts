import Cookies from 'js-cookie';
import { UserMetadata } from '@/models/User';

// Выбор типа пользователя для тестирования
type UserRole = keyof UserMetadata;

const isTeacherKey: UserRole = 'is_teacher';
const isStudentKey: UserRole = 'is_student';

export function setUserRoleToCookies(role?: UserRole) {
  Cookies.remove(isTeacherKey);
  Cookies.remove(isStudentKey);
  if (role) Cookies.set(role, '1');
}

export function getUserRoleFromCookies(): UserRole | undefined {
  const isStudent = Cookies.get(isStudentKey);
  if (isStudent) return 'is_student';

  const isTeacher = Cookies.get(isTeacherKey);
  if (isTeacher) return 'is_teacher';

  return undefined;
}

export function askForUserRole(): UserRole | undefined {
  const isTeacher = window.confirm('Зайти как преподаватель?');
  if (isTeacher) return 'is_teacher';

  const isStudent = window.confirm('Зайти как студент?');
  if (isStudent) return 'is_student';

  return undefined;
}
