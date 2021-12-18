// Возвращает переданные данные с заданной задержкой
export const delayRes = <T>(data: T, delay: number): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(data), delay));
