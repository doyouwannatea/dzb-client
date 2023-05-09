import Cookies from 'js-cookie';
import { UserRoleKey } from '@/models/User';

const isTeacherKey: UserRoleKey = 'is_teacher';
const isStudentKey: UserRoleKey = 'is_student';

export function setUserRoleToCookies(role?: UserRoleKey) {
  Cookies.remove(isTeacherKey);
  Cookies.remove(isStudentKey);
  if (role) Cookies.set(role, '1');
}

export function getUserRoleFromCookies(): UserRoleKey | undefined {
  const isStudent = Cookies.get(isStudentKey);
  if (isStudent) return 'is_student';

  const isTeacher = Cookies.get(isTeacherKey);
  if (isTeacher) return 'is_teacher';

  return undefined;
}

export function askForUserRole(): UserRoleKey | undefined {
  const isTeacher = window.confirm('Зайти как преподаватель?');
  if (isTeacher) return 'is_teacher';

  const isStudent = window.confirm('Зайти как студент?');
  if (isStudent) return 'is_student';

  return undefined;
}
