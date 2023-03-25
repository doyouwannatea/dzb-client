import { ProjectProposal } from '@/models/ProjectProposal';

export default abstract class IProjectCreationApi {
  abstract createApplication(projectProposal: ProjectProposal): Promise<void>;
}
