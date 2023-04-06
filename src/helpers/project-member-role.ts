import { MemberRole } from '@/models/ProjectProposal';

const DefaultRolesPriority: Record<MemberRole, number> = {
  [MemberRole.Mentor]: 1,
  [MemberRole.CoMentor]: 2,
  [MemberRole.JobDeveloper]: 3,
  [MemberRole.Expert]: 4,
};

export function sortByRolePriority<T extends { role: MemberRole }>(
  array: T[],
  priority: Record<MemberRole, number> = DefaultRolesPriority,
): T[] {
  return [...array].sort((a, b) => priority[a.role] - priority[b.role]);
}
