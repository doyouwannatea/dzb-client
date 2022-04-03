export const mapNumber = <T>(arr: T[]) => arr.map(Number);

export function deleteByKey<T extends Record<string, unknown>>(
  array: T[],
  key: keyof T,
  searchValue: unknown,
): T[] {
  const idx = array.findIndex((item) => item[key] === searchValue);
  return [...array.slice(0, idx), ...array.slice(idx + 1)];
}

export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}
