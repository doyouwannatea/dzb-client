import { deepClone } from '@/helpers/array';
import { delayRes } from '@/helpers/promise';
import { CandidateSkills } from '@/models/Candidate';
import { userCandidate, candidateSkills } from '@/models/mock/candidate';
import { Tag } from '@/models/Project';
import ISkillsApi from './ISkillsApi';

export default class SkillsApiMock extends ISkillsApi {
  async getUserSkills(): Promise<CandidateSkills> {
    return delayRes(candidateSkills, 300);
  }

  async updateUserSkills(skills: Tag[]): Promise<void> {
    candidateSkills.personal = deepClone(skills);
    userCandidate.skills = [
      ...candidateSkills.personal,
      ...candidateSkills.common,
    ];
    return delayRes(undefined, 300);
  }
}
