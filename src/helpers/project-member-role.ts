import { ProjectSupervisor } from '@/models/Project';
import { MemberRole } from '@/models/ProjectProposal';

const DefaultRolesPriority: Record<MemberRole, number> = {
  [MemberRole.Mentor]: 1,
  [MemberRole.CoMentor]: 2,
  [MemberRole.JobDeveloper]: 3,
  [MemberRole.Expert]: 4,
};

export function sortByRolePriority<T>(
  array: T[],
  cb: (item: T) => MemberRole,
  priority: Record<MemberRole, number> = DefaultRolesPriority,
): T[] {
  return [...array].sort((a, b) => priority[cb(a)] - priority[cb(b)]);
}

export function groupTeamByRoles(
  teamList: ProjectSupervisor[],
  excludedRoles: MemberRole[] = [],
): Map<MemberRole, string[]> {
  // Map<роль, ФИО преподавателей>
  const roles = new Map<MemberRole, string[]>();

  for (const teamMember of teamList) {
    for (const role of teamMember.roles) {
      if (!excludedRoles.includes(role.id))
        roles.set(role.id, [
          ...(roles.get(role.id) || []),
          teamMember.supervisor.fio,
        ]);
    }
  }

  return roles;
}
