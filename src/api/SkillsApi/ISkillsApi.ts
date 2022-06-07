import { UserSkills } from '@/models/Candidate';
import { Tag } from '@/models/Project';

export default abstract class ISkillsApi {
  abstract getUserSkills(): Promise<UserSkills>;
  abstract updateUserSkills(skills: Tag[]): Promise<void>;
}
