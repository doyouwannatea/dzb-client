import { CandidateSkills } from '@/models/Candidate';
import { Skill } from '@/models/Project';

export default abstract class ISkillsApi {
  abstract getUserSkills(): Promise<CandidateSkills>;
  abstract updateUserSkills(skills: Skill[]): Promise<void>;
}
