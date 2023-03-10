import { UserCandidate, UserSupervisor } from '@/models/User';

export function isCandidate(obj: any): obj is UserCandidate {
  return obj.is_student;
}

export function isSupervisor(obj: any): obj is UserSupervisor {
  return obj.is_teacher;
}
