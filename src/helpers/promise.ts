export const delayRes = <T>(data: T, delay: number): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(data), delay));
