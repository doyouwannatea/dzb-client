import { getRandomIntInclusive } from '../number';

describe('number.ts', () => {
  it('getRandomIntInclusive() возвращает число в заданном диапазоне', () => {
    let num = getRandomIntInclusive(1, 1);
    expect(typeof num === 'number').toBeTruthy();
    expect(num === 1).toBeTruthy();
    num = getRandomIntInclusive(10, -10);
    expect(num >= -10 && num <= 10).toBeTruthy();
  });
});
