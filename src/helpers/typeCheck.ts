import { UserCandidate, UserSupervisor } from '@/models/User';

export function isCandidate(
  obj: UserCandidate | UserSupervisor,
): obj is UserCandidate {
  return obj.is_student;
}

export function isSupervisor(
  obj: UserCandidate | UserSupervisor,
): obj is UserSupervisor {
  return obj.is_teacher;
}
