export function immutableSort<T>(
  arr: T[],
  sortBy?: 'ASC' | 'DESC',
  key?: keyof T,
): T[] {
  return [...arr].sort((a, b) => {
    let aVal: number;
    let bVal: number;
    if (key) {
      aVal = Number(a[key]);
      bVal = Number(b[key]);
    } else {
      aVal = Number(a);
      bVal = Number(b);
    }

    return sortBy === 'ASC' ? aVal - bVal : bVal - aVal;
  });
}
