import { Project } from '@/models/Project';
import {
  CreatedProjectProposal,
  NewProjectProposal,
} from '@/models/ProjectProposal';
import { Specialty } from '@/models/Specialty';
import { Tag } from '@/models/Tag';

export interface UpdateProjectProposalData {
  projectProposal: Partial<NewProjectProposal>;
  id: number;
}

export default interface SupervisorApiType {
  createProjectProposal(
    projectProposal: NewProjectProposal,
  ): Promise<CreatedProjectProposal>;
  updateProjectProposal(
    data: UpdateProjectProposalData,
  ): Promise<CreatedProjectProposal>;
  deleteProjectProposal(
    projectProposalId: number,
  ): Promise<CreatedProjectProposal>;
  getThemeSources(): Promise<Tag[]>;
  getSpecialties(): Promise<Specialty[]>;
  getProjectProposalList(): Promise<CreatedProjectProposal[]>;
  getProjectList(): Promise<Project[]>;
  getProposalsTime(): Promise<[string, string]>;
}
