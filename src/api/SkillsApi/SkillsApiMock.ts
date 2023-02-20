import { deepClone } from '@/helpers/object';
import { delayRes } from '@/helpers/promise';
import { UserSkills } from '@/models/Candidate';
import { candidate, userSkills } from '@/models/mock/candidate';
import { Tag } from '@/models/Project';
import ISkillsApi from './ISkillsApi';

export default class SkillsApiMock extends ISkillsApi {
  async getUserSkills(): Promise<UserSkills> {
    return delayRes(userSkills, 300);
  }

  async updateUserSkills(skills: Tag[]): Promise<void> {
    userSkills.personal = deepClone(skills);
    candidate.skills = [...userSkills.personal, ...userSkills.common];
    return delayRes(undefined, 300);
  }
}
