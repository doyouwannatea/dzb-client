import { UserSkills } from '@/models/Candidate';
import { Tag } from '@/models/Project';
import SkillsApiMock from './SkillsApiMock';
import ISkillsApi from './ISkillsApi';

export default class SkillsApi extends ISkillsApi {
  async getUserSkills(): Promise<UserSkills> {
    const campusAuthApiMock = new SkillsApiMock();
    return campusAuthApiMock.getUserSkills();
  }

  async updateUserSkills(skills: Tag[]): Promise<void> {
    const campusAuthApiMock = new SkillsApiMock();
    return campusAuthApiMock.updateUserSkills(skills); // TODO: https://app.swaggerhub.com/apis/CoolSheff/Yarmarka/1#/Candidate/put_api_candidate
  }
}
