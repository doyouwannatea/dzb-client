// Сравнивает два массива в три шага
// 1. Сортировка
// 2. Превращение в JSON
// 3. сравнение строк
export function compareArrays(array1?: unknown[], array2?: unknown[]): boolean {
  if (!array1 && !array2) return true;
  if (!array1 || !array2) return false;
  return JSON.stringify(array1.sort()) === JSON.stringify(array2.sort());
}

export function removeDuplicates<T>(array: T[]): T[] {
  return [...new Set(array)];
}
