import { isValidDate } from '../date';

describe('date.ts', () => {
  it('isValidDate() корректно определяет валидность даты', () => {
    expect(isValidDate('2023-02-20')).toBeTruthy();
    expect(isValidDate('23.02.20')).toBeFalsy();
    expect(isValidDate('2023/20/03')).toBeFalsy();
    expect(isValidDate('/02/20')).toBeFalsy();
    expect(isValidDate('')).toBeFalsy();
  });
});
