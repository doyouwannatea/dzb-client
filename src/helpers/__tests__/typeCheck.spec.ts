import { isCandidate, isSupervisor } from '../typeCheck';
import { UserCandidate, UserSupervisor } from '@/models/User';

describe('typeCheck.ts', () => {
  it('isCandidate()', () => {
    expect(isCandidate({ is_student: true } as UserCandidate)).toBeTruthy();
  });
  it('isSupervisor()', () => {
    expect(isSupervisor({ is_teacher: true } as UserSupervisor)).toBeTruthy();
  });
});
