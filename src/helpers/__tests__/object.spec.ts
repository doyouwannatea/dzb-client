import { deepClone, immutableArraySort, isEmptyObject } from '../object';

describe('object.ts', () => {
  describe('immutableArraySort()', () => {
    it('правильно сортирует массив', () => {
      const array = [1, 5, 2, 5, 8, 2];
      const expectedArray = [1, 2, 2, 5, 5, 8];
      expect(immutableArraySort(array, (item) => item, 'ASC')).toEqual(
        expectedArray,
      );
      class TestObject {
        value: number;
        constructor(value: number) {
          this.value = value;
        }
      }
      const objectArray = [
        new TestObject(2),
        new TestObject(10),
        new TestObject(5),
      ];
      let expectedObjectArray = [
        new TestObject(2),
        new TestObject(5),
        new TestObject(10),
      ];
      expect(
        immutableArraySort(objectArray, (item) => item.value, 'ASC'),
      ).toEqual(expectedObjectArray);
      expectedObjectArray = [
        new TestObject(10),
        new TestObject(5),
        new TestObject(2),
      ];
      expect(
        immutableArraySort(objectArray, (item) => item.value, 'DESC'),
      ).toEqual(expectedObjectArray);
    });

    it('не мутирует исходный объект', () => {
      const array = [1, 5, 2, 5, 8, 2];
      immutableArraySort(array, (item) => item, 'ASC');
      expect(array).toEqual([1, 5, 2, 5, 8, 2]);
    });
  });

  it('deepClone()', () => {
    const object = {
      a: 1,
      b: 2,
      c: {
        d: 1,
        e: 2,
      },
      f: ['1', '2', '3'],
      no: undefined,
    };
    expect(deepClone(object)).toEqual(object);
  });

  it('isEmptyObject()', () => {
    const object: any = {
      a: 1,
      b: 2,
      f: ['1', '2', '3'],
      no: undefined,
    };
    expect(isEmptyObject(object)).toBeFalsy();
    object.a = null;
    object.b = null;
    object.f = [];
    expect(isEmptyObject(object)).toBeTruthy();
  });
});
