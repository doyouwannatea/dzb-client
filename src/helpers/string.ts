// https://realadmin.ru/coding/sklonenie-na-javascript.html
// Функция для получения правильной формы падежа
export function declOfNum(number: number, words: [string, string, string]) {
  return words[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : [2, 0, 1, 1, 1, 2][number % 10 < 5 ? Math.abs(number) % 10 : 5]
  ];
}

// https://overcoder.net/q/2504/%D0%BA%D0%B0%D0%BA-%D0%BE%D1%82%D1%84%D0%BE%D1%80%D0%BC%D0%B0%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D1%82%D1%8C-%D0%B4%D0%B0%D1%82%D1%83-%D0%B2-javascript
// преобразует дату в правильный формат для <input type="date" />
export function toJSONLocal(date: Date) {
  const local = new Date(date);
  local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return local.toJSON().slice(0, 10);
}

export function formatDate(date: Date) {
  return date.toLocaleDateString('ru-RU');
}

export function toString(val: unknown): string {
  if (val === undefined || val === null) return '';
  if (Array.isArray(val)) return JSON.stringify(val);
  return String(val);
}

export function capitalizeFirstLetter(str: string) {
  const arr = str.split(' ');
  arr[0] = arr[0].slice(0, 1).toUpperCase() + arr[0].slice(1);
  return arr.join(' ');
}

export function compareString(str1: string, str2: string): number {
  if (str1 < str2) return -1;
  if (str1 > str2) return 1;
  return 0;
}

export function intToRoman(num: number): string {
  const map: Record<string, number> = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
  };
  let result = '';

  for (const key in map) {
    const repeatCounter = Math.floor(num / map[key]);

    if (repeatCounter !== 0) {
      result += key.repeat(repeatCounter);
    }

    num %= map[key];

    if (num === 0) return result;
  }

  return result;
}
