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

export default abstract class IProjectCreationApi {
  abstract createProjectProposal(
    projectProposal: NewProjectProposal,
  ): Promise<CreatedProjectProposal>;
  abstract updateProjectProposal(
    data: UpdateProjectProposalData,
  ): Promise<CreatedProjectProposal>;
  abstract getThemeSources(): Promise<Tag[]>;
  abstract getSpecialties(): Promise<Specialty[]>;
  abstract getProjectProposalList(): Promise<CreatedProjectProposal[]>;
}
