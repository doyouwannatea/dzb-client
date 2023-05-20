import { specialtyFullName } from '../specialty';

describe('specialty.ts', () => {
  it('specialtyFullName()', () => {
    expect(specialtyFullName('имя', 1)).toBe('имя, 1 курс');
    expect(specialtyFullName('имя', 2)).toBe('имя, 2 курс');
    expect(specialtyFullName('имя', 3)).toBe('имя, 3 курс');
    expect(specialtyFullName('имя', 4)).toBe('имя, 4 курс');
    expect(specialtyFullName('имя', 5)).toBe('имя, 5 курс');
  });
});
