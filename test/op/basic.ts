import {
  so,
  not,
  and,
  or,
  every,
  some,
  shape,
  exact,
} from 'semantic-validator/lib/op/basic';

describe('basic validator operators', () => {
  describe('op: so', () => {
    const is = {
      same: (target: string) => (val: string) => (target === val),
    };
    it('should return true when the validator returns true', () => {
      expect(so(is.same('hello'))('hello')).toBe(true);
    });
    it('should return false when the validator not returns true', () => {
      expect(so(is.same('hello'))('bye')).toBe(false);
    });
  });

  describe('op: not', () => {
    const is = {
      same: (target: string) => (val: string) => (target === val),
    };
    it('should return true when the validator returns false', () => {
      expect(not(is.same('hello'))('bye')).toBe(true);
    });
    it('should return false when the validator not returns false', () => {
      expect(not(is.same('hello'))('hello')).toBe(false);
    });
  });

  describe('op: and', () => {
    const is = {
      integer: () => (val: any) => Number.isInteger(val),
      greaterThan: (num: number) => (val: any) => (val > num),
    };
    it('should return true when all validators return true', () => {
      expect(and(is.integer(), is.greaterThan(100))(120)).toBe(true);
    });
    it('should return false when not all validators return true', () => {
      expect(and(is.integer(), is.greaterThan(100))(80)).toBe(false);
      expect(and(is.integer(), is.greaterThan(100))(123.456)).toBe(false);
    });
  });

  describe('op: or', () => {
    const is = {
      nul: () => (val: any) => (val === null),
      integer: () => (val: any) => Number.isInteger(val),
    };
    it('should return true when any validators return true', () => {
      expect(or(is.nul(), is.integer())(null)).toBe(true);
      expect(or(is.nul(), is.integer())(123)).toBe(true);
    });
    it('should return false when not any validators return true', () => {
      expect(or(is.nul(), is.integer())('abc')).toBe(false);
    });
  });

  describe('op: every', () => {
    const is = {
      integer: () => (val: any) => Number.isInteger(val),
    };
    it('should return true when the validator returns true on all elements', () => {
      expect(every(is.integer())([1, 2, 3])).toBe(true);
    });
    it('should return false when the validator not returns true on all elements', () => {
      expect(every(is.integer())([1, 2.22, 3])).toBe(false);
    });
  });

  describe('op: some', () => {
    const is = {
      integer: () => (val: any) => Number.isInteger(val),
    };
    it('should return true when the validator returns true on all elements', () => {
      expect(some(is.integer())([1, 2, 3])).toBe(true);
      expect(some(is.integer())([1.11, 2, 3.33])).toBe(true);
    });
    it('should return false when the validator not returns true on all elements', () => {
      expect(some(is.integer())([1.11, 2.22, 3.33])).toBe(false);
    });
  });

  describe('op: shape', () => {
    const is = {
      integer: () => (val: any) => Number.isInteger(val),
      string: () => (val: any) => (typeof val === 'string'),
    };
    it('should return true when all key validators returns true', () => {
      expect(
        shape({
          id: is.integer(),
          name: is.string(),
        })({
          id: 123,
          name: 'Mr. Sandman',
        }),
      ).toBe(true);
      expect(
        shape({
          id: is.integer(),
          name: is.string(),
        })({
          id: 123,
          name: 'Mr. Sandman',
          active: true,
        }),
      ).toBe(true);
    });
    it('should return false when not all key validators returns true', () => {
      expect(
        shape(123 as any)({
          id: 123,
          name: 'Mr. Sandman',
        }),
      ).toBe(false);
      expect(
        shape({
          id: is.integer(),
          name: is.string(),
        })({
          id: 123,
        } as any),
      ).toBe(false);
      expect(
        shape({
          id: is.integer(),
          name: is.string(),
        })({
          id: 123,
          name: 456,
        } as any),
      ).toBe(false);
    });
  });

  describe('op: exact', () => {
    const is = {
      integer: () => (val: any) => Number.isInteger(val),
      string: () => (val: any) => (typeof val === 'string'),
    };
    it('should return true when all key validators returns true on exact object', () => {
      expect(
        exact({
          id: is.integer(),
          name: is.string(),
        })({
          id: 123,
          name: 'Mr. Sandman',
        }),
      ).toBe(true);
    });
    it('should return false when not all key validators returns true on exact object', () => {
      expect(
        exact(123 as any)({
          id: 123,
          name: 'Mr. Sandman',
        }),
      ).toBe(false);
      expect(
        exact({
          id: is.integer(),
          name: is.string(),
        })({
          id: 123,
          name: 'Mr. Sandman',
          active: true,
        } as any),
      ).toBe(false);
      expect(
        exact({
          id: is.integer(),
          name: is.string(),
        })({
          id: 123,
        } as any),
      ).toBe(false);
      expect(
        exact({
          id: is.integer(),
          name: is.string(),
        })({
          id: 123,
          name: 456,
        } as any),
      ).toBe(false);
    });
  });
});
