import { ProjectProposal } from '@/models/ProjectProposal';
import { Specialty } from '@/models/Specialty';
import { Tag } from '@/models/Tag';

export default abstract class IProjectCreationApi {
  abstract createProjectProposal(
    projectProposal: ProjectProposal,
  ): Promise<void>;
  abstract getThemeSources(): Promise<Tag[]>;
  abstract getSpecialties(): Promise<Specialty[]>;
}
