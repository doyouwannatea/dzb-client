import { UserCandidate, UserSupervisor } from '@/models/User';
import { isCandidate, isSupervisor } from '../typeCheck';

describe('typeCheck.ts', () => {
  it('isCandidate()', () => {
    expect(isCandidate({ is_student: true } as UserCandidate)).toBeTruthy();
  });
  it('isSupervisor()', () => {
    expect(isSupervisor({ is_teacher: true } as UserSupervisor)).toBeTruthy();
  });
});
