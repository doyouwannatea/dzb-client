import {
  capitalizeFirstLetter,
  compareString,
  declOfNum,
  formatDate,
  intToRoman,
  stringIncludes,
  stringsAreEqual,
  toJSONLocal,
  toString,
} from '../string';

describe('string.ts', () => {
  it('capitalizeFirstLetter()', () => {
    expect(capitalizeFirstLetter('слово')).toBe('Слово');
    expect(capitalizeFirstLetter('')).toBe('');
  });
  it('compareString()', () => {
    expect(compareString('А', 'Б')).toBe(-1);
    expect(compareString('Б', 'А')).toBe(1);
    expect(compareString('А', 'А')).toBe(0);
  });
  it('declOfNum()', () => {
    const words: [string, string, string] = ['слово', 'слова', 'слов'];
    expect(declOfNum(1, words)).toBe('слово');
    expect(declOfNum(2, words)).toBe('слова');
    expect(declOfNum(5, words)).toBe('слов');
  });
  it('formatDate()', () => {
    expect(formatDate('2023-20-05')).toBe('2023-20-05');
  });
  it('intToRoman()', () => {
    expect(intToRoman(1)).toBe('I');
    expect(intToRoman(10)).toBe('X');
    expect(intToRoman(51)).toBe('LI');
    expect(intToRoman(314)).toBe('CCCXIV');
  });
  it('stringIncludes()', () => {
    expect(stringIncludes('маленькая строка', 'стр')).toBeTruthy();
  });
  it('stringsAreEqual()', () => {
    expect(
      stringsAreEqual('маленькая СТРОКА', 'маленькая строка'),
    ).toBeTruthy();
    expect(stringsAreEqual('маленькая СТРОКА', 'маленькая')).toBeFalsy();
  });
  it('toJSONLocal()', () => {
    expect(toJSONLocal(new Date('2023/05/20'))).toBe('2023-05-20');
  });
  it('toString()', () => {
    expect(toString([1, 2, 3])).toBe('[1,2,3]');
    expect(toString({ a: 1 })).toBe('[object Object]');
    expect(toString(3)).toBe('3');
  });
});
