import {
  same,
  oneOf,
  defined,
  notDefined,
  nul,
  bool,
  number,
  string,
  object,
  func,
  symbol,
  instanceOf,
  float,
  integer,
  array,
  date,
} from 'semantic-validator/is/basic';

describe('basic validator creators', () => {
  describe('is: same', () => {
    it('should return true when values are the same', () => {
      expect(same(undefined)(undefined)).toBe(true);
      expect(same(null)(null)).toBe(true);
      expect(same(true)(true)).toBe(true);
      expect(same(123)(123)).toBe(true);
      expect(same(123.456)(123.456)).toBe(true);
      expect(same(NaN)(NaN)).toBe(true);
      expect(same(+0)(-0)).toBe(true);
      expect(same('abc')('abc')).toBe(true);
      const list = [1, 2, 3];
      expect(same(list)(list)).toBe(true);
      const obj = { key: 'value' };
      expect(same(obj)(obj)).toBe(true);
    });
    it('should return false when values are not the same', () => {
      expect(same(undefined)(null)).toBe(false);
      expect(same(true)(false)).toBe(false);
      expect(same(123)(123.456)).toBe(false);
      expect(same('abc')('def')).toBe(false);
      expect(same([1, 2, 3])([1, 2, 3])).toBe(false);
      expect(same({ key: 'value' })({ key: 'value' })).toBe(false);
    });
  });

  describe('is: one of', () => {
    it('should return true when the value is one of target', () => {
      expect(oneOf(1, 2, 3)(2)).toBe(true);
      expect(oneOf('a', 'b', 'c')('b')).toBe(true);
    });
    it('should return false when the value is not one of target', () => {
      expect(oneOf(1, 2, 3)(4)).toBe(false);
      expect(oneOf('a', 'b', 'c')('d')).toBe(false);
    });
  });

  describe('is: defined', () => {
    it('should return true when the value is defined', () => {
      expect(defined()(null)).toBe(true);
      expect(defined()(true)).toBe(true);
      expect(defined()(123)).toBe(true);
      expect(defined()('abc')).toBe(true);
    });
    it('should return false when the value is not defined', () => {
      expect(defined()(undefined)).toBe(false);
    });
  });

  describe('is: not defined', () => {
    it('should return true when the value is not defined', () => {
      expect(notDefined()(undefined)).toBe(true);
    });
    it('should return false when the value is defined', () => {
      expect(notDefined()(null)).toBe(false);
      expect(notDefined()(true)).toBe(false);
      expect(notDefined()(123)).toBe(false);
      expect(notDefined()('abc')).toBe(false);
    });
  });

  describe('is: nul', () => {
    it('should return true when the value is nul', () => {
      expect(nul()(null)).toBe(true);
    });
    it('should return false when the value is not nul', () => {
      expect(nul()(undefined)).toBe(false);
      expect(nul()(true)).toBe(false);
    });
  });

  describe('is: bool', () => {
    it('should return true when the value is a bool', () => {
      expect(bool()(false)).toBe(true);
    });
    it('should return false when the value is not a bool', () => {
      expect(bool()(123)).toBe(false);
    });
  });

  describe('is: number', () => {
    it('should return true when the value is a number', () => {
      expect(number()(123)).toBe(true);
    });
    it('should return false when the value is not a number', () => {
      expect(number()('abc')).toBe(false);
    });
  });

  describe('is: string', () => {
    it('should return true when the value is a string', () => {
      expect(string()('abc')).toBe(true);
    });
    it('should return false when the value is not a string', () => {
      expect(string()(123)).toBe(false);
    });
  });

  describe('is: object', () => {
    it('should return true when the value is a object', () => {
      expect(object()({ key: 'value' })).toBe(true);
      expect(object()({})).toBe(true);
    });
    it('should return false when the value is not a object', () => {
      expect(object()(null)).toBe(false);
      expect(object()(123)).toBe(false);
    });
  });

  describe('is: func', () => {
    it('should return true when the value is a func', () => {
      expect(func()(() => {})).toBe(true);
    });
    it('should return false when the value is not a func', () => {
      expect(func()(123)).toBe(false);
    });
  });

  describe('is: symbol', () => {
    it('should return true when the value is a symbol', () => {
      expect(symbol()(Symbol('abc'))).toBe(true);
    });
    it('should return false when the value is not a symbol', () => {
      expect(symbol()('abc')).toBe(false);
    });
  });

  describe('is: instance of', () => {
    it('should return true when the value is the instance of a constructor', () => {
      expect(instanceOf(Date)(new Date())).toBe(true);
    });
    it('should return false when the value is not the instance of a constructor', () => {
      expect(instanceOf(Date)(123)).toBe(false);
    });
  });

  describe('is: float', () => {
    it('should return true when the value is a float', () => {
      expect(float()(123.456)).toBe(true);
      expect(float()(123)).toBe(true);
    });
    it('should return false when the value is not a float', () => {
      expect(float()('123')).toBe(false);
    });
  });

  describe('is: integer', () => {
    it('should return true when the value is a integer', () => {
      expect(integer()(123)).toBe(true);
    });
    it('should return false when the value is not a integer', () => {
      expect(integer()(123.456)).toBe(false);
    });
  });

  describe('is: array', () => {
    it('should return true when the value is an array', () => {
      expect(array()([1, 2, 3])).toBe(true);
    });
    it('should return false when the value is not an array', () => {
      expect(array()({})).toBe(false);
    });
  });

  describe('is: date', () => {
    it('should return true when the value is a valid date object', () => {
      expect(date()(new Date())).toBe(true);
    });
    it('should return false when the value is not a valid date object', () => {
      expect(date()(new Date('invalid date'))).toBe(false);
      expect(date()(new Date('invalid date'))).toBe(false);
    });
  });
});
