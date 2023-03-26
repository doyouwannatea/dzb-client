import { ProjectSupervisor } from '@/models/Project';
import { MemberRole } from '../ProjectProposal';
import { supervisorList } from './supervisor';

export const projectSupervisorList: ProjectSupervisor[] = supervisorList.map(
  (supervisor, index) => ({
    id: supervisor.id,
    roles: [index === 0 ? MemberRole.Mentor : MemberRole.CoMentor],
    supervisor,
  }),
);
