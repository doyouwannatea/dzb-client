import { CandidateSkills } from '@/models/Candidate';
import { Tag } from '@/models/Project';

export default abstract class ISkillsApi {
  abstract getUserSkills(): Promise<CandidateSkills>;
  abstract updateUserSkills(skills: Tag[]): Promise<void>;
}
