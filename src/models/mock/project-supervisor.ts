import { ProjectSupervisor } from '@/models/Project';
import { MemberRole, MemberRoleText } from '../ProjectProposal';
import { supervisorList } from './supervisor';

export const projectSupervisorList: ProjectSupervisor[] = supervisorList.map(
  (supervisor, index) => {
    const role = index === 0 ? MemberRole.Mentor : MemberRole.CoMentor;
    return {
      id: supervisor.id,
      roles: [{ id: role, name: MemberRoleText[role] }],
      supervisor,
    };
  },
);
