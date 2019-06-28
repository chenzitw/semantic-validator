import {
  convert,
  toFloat,
  toInteger,
  toLength,
  toSplit,
  toKeys,
  toValues,
} from 'semantic-validator/op/converter';

describe('converter validator operators', () => {
  describe('op: convert', () => {
    const is = {
      greaterThan: (num: number) => (val: any) => (val > num),
    };
    it('should return true when successfully convert the value and validate.', () => {
      expect(
        convert(
          (numeric: string) => parseFloat(numeric),
          is.greaterThan(100),
        )('150'),
      ).toBe(true);
    });
    it('should return true when not successfully convert the value and validate', () => {
      expect(
        convert(
          (numeric: string) => parseFloat(numeric),
          is.greaterThan(100),
        )('50'),
      ).toBe(false);
    });
  });

  describe('op: to float', () => {
    const is = {
      greaterThan: (num: number) => (val: any) => (val > num),
    };
    it('should return true when successfully convert to a float and validate', () => {
      expect(toFloat(is.greaterThan(1.2))('1.5')).toBe(true);
    });
    it('should return true when not successfully convert to a float and validate', () => {
      expect(toFloat(is.greaterThan(1.2))('two')).toBe(false);
      expect(toFloat(is.greaterThan(1.2))('0.8')).toBe(false);
    });
  });

  describe('op: to integer', () => {
    const is = {
      greaterThan: (num: number) => (val: any) => (val > num),
    };
    it('should return true when successfully convert to an integer and validate', () => {
      expect(toInteger(is.greaterThan(100))('150')).toBe(true);
    });
    it('should return true when not successfully convert to an integer and validate', () => {
      expect(toInteger(is.greaterThan(100))('two')).toBe(false);
      expect(toInteger(is.greaterThan(100))('123.456')).toBe(false);
      expect(toInteger(is.greaterThan(100))('50')).toBe(false);
    });
  });

  describe('op: to length', () => {
    const is = {
      atLeast: (num: number) => (val: any) => (val >= num),
    };
    it('should return true when successfully get the length and validate', () => {
      expect(toLength(is.atLeast(3))(['a', 'b', 'c'])).toBe(true);
      expect(toLength(is.atLeast(3))('abc')).toBe(true);
    });
    it('should return true when not successfully get the length and validate', () => {
      expect(toLength(is.atLeast(3))(['a', 'b'])).toBe(false);
      expect(toLength(is.atLeast(3))('ab')).toBe(false);
      expect(toLength(is.atLeast(3))(3)).toBe(false);
    });
  });

  describe('op: to split', () => {
    const every = (validator: (val: any) => boolean): (list: any[]) => boolean => (
      (list: any[]) => (Array.isArray(list) && list.every(item => validator(item)))
    );
    const is = {
      startsWith: (wording: string) => (val: string) => (val.startsWith(wording)),
    };
    it('should return true when successfully split to the array and validate', () => {
      expect(
        toSplit(
          ',',
          every(is.startsWith('c')),
        )('candy,cookie,coffee'),
      ).toBe(true);
    });
    it('should return true when not successfully split to the array and validate', () => {
      expect(
        toSplit(
          ',',
          every(is.startsWith('c')),
        )('candy,cookie,tea'),
      ).toBe(false);
      expect(
        toSplit(
          ',',
          every(is.startsWith('c')),
        )(123),
      ).toBe(false);
    });
  });

  describe('op: to keys', () => {
    const every = (validator: (val: any) => boolean): (list: any[]) => boolean => (
      (list: any[]) => (Array.isArray(list) && list.every(item => validator(item)))
    );
    const is = {
      oneOf: (...items: any[]) => (val: any) => (items.includes(val)),
    };
    it('should return true when successfully get keys of an object and validate', () => {
      expect(
        toKeys(
          every(is.oneOf('id', 'name')),
        )({ id: 123, name: 'Mario' }),
      ).toBe(true);
    });
    it('should return true when not successfully get keys of an object and validate', () => {
      expect(
        toKeys(
          every(is.oneOf('id', 'name')),
        )({ id: 123, name: 'Mario', age: 20 }),
      ).toBe(false);
    });
  });

  describe('op: to values', () => {
    const every = (validator: (val: any) => boolean): (list: any[]) => boolean => (
      (list: any[]) => (Array.isArray(list) && list.every(item => validator(item)))
    );
    const is = {
      integer: () => (val: any) => Number.isInteger(val),
    };
    it('should return true when successfully get values of an object and validate', () => {
      expect(
        toValues(
          every(is.integer()),
        )({ people: 64, seats: 80 }),
      ).toBe(true);
    });
    it('should return true when not successfully get values of an object and validate', () => {
      expect(
        toValues(
          every(is.integer()),
        )({ people: 640, seats: 'many' }),
      ).toBe(false);
    });
  });
});
