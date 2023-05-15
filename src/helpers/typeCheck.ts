import { UserCandidate, UserSupervisor } from '@/models/User';

export function isCandidate(
  obj: UserCandidate | UserSupervisor,
): obj is UserCandidate {
  return Boolean(obj.is_student);
}

export function isSupervisor(
  obj: UserCandidate | UserSupervisor,
): obj is UserSupervisor {
  return Boolean(obj.is_teacher);
}
