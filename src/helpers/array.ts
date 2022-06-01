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

export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

export async function asyncFilter<T>(
  arr: T[],
  callback: (item: T) => Promise<boolean>,
) {
  const fail = Symbol();
  return (
    await Promise.all(
      arr.map(async (item) => ((await callback(item)) ? item : fail)),
    )
  ).filter((i) => i !== fail);
}
