export const sleep = (time: number) => {
  if (process.env.VITE_TEST === 'true') return Promise.resolve();
  return new Promise((res) => setTimeout(res, time));
};

// Возвращает переданные данные с заданной задержкой
export const delayRes = async <T>(data: T, delay: number): Promise<T> => {
  await sleep(delay);
  return data;
};
