// Сравнивает два массива в три шага
// 1. Сортировка
// 2. Превращение в JSON
// 3. сравнение строк
export function compareArrays(array1?: any[], array2?: any[]): boolean {
  if (!array1 && !array2) return true;
  if (!array1 || !array2) return false;
  return JSON.stringify(array1.sort()) === JSON.stringify(array2.sort());
}
