export function immutableArraySort<T>(
  array: T[],
  getKey: (item: T) => number,
  sortBy?: 'ASC' | 'DESC',
): T[] {
  return [...array].sort((a, b) => {
    const aVal = getKey(a);
    const bVal = getKey(b);
    return sortBy === 'ASC' ? aVal - bVal : bVal - aVal;
  });
}

export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

export function isEmptyObject(object: Record<string, unknown>): boolean {
  return Object.values(object).every(
    (field) =>
      field === undefined ||
      field === null ||
      field === '' ||
      (typeof field === 'number' && isNaN(field)) ||
      (Array.isArray(field) && field.length === 0) ||
      (typeof field === 'object' && Object.keys(field).length === 0),
  );
}
