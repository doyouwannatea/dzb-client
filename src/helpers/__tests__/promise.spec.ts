import { delayRes } from '../promise';

describe('promise.ts', () => {
  it('delayRes()', async () => {
    const data = await delayRes(1, 0);
    expect(data).toBe(1);
  });
});
