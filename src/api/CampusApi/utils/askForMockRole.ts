import Cookies from 'js-cookie';
import { UserMetadata } from '@/models/User';

// Выбор типа пользователя для тестирования
type UserRole = keyof UserMetadata;

const isTeacherKey: UserRole = 'is_teacher';
const isStudentKey: UserRole = 'is_student';

export function setMockRoleToCookies(type?: UserRole) {
  Cookies.remove(isTeacherKey);
  Cookies.remove(isStudentKey);
  if (type) Cookies.set(type, '1');
}

export function getMockRoleFromCookies(): UserRole | undefined {
  const isStudent = Cookies.get(isStudentKey);
  if (isStudent) return 'is_student';

  const isTeacher = Cookies.get(isTeacherKey);
  if (isTeacher) return 'is_teacher';

  return undefined;
}

export function askForMockRole(): UserRole | undefined {
  let mockRole: UserRole | undefined = undefined;

  const isTeacher = window.confirm('Зайти как преподаватель?');
  if (isTeacher) mockRole = 'is_teacher';

  if (!mockRole) {
    const isStudent = window.confirm('Зайти как студент?');
    if (isStudent) mockRole = 'is_student';
  }

  return mockRole;
}
