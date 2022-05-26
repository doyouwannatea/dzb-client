import { UserSkills } from '@/models/Candidate';
import { Skill } from '@/models/Project';
import SkillsApiMock from './SkillsApiMock';
import ISkillsApi from './ISkillsApi';

export default class SkillsApi extends ISkillsApi {
  async getUserSkills(): Promise<UserSkills> {
    const campusAuthApiMock = new SkillsApiMock();
    return campusAuthApiMock.getUserSkills();
  }

  async updateUserSkills(skills: Skill[]): Promise<void> {
    const campusAuthApiMock = new SkillsApiMock();
    return campusAuthApiMock.updateUserSkills(skills);
  }
}
