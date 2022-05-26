import { UserSkills } from '@/models/Candidate';
import { Skill } from '@/models/Project';

export default abstract class ISkillsApi {
  abstract getUserSkills(): Promise<UserSkills>;
  abstract updateUserSkills(skills: Skill[]): Promise<void>;
}
