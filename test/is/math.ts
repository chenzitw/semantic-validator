import {
  equalTo,
  greaterThan,
  atLeast,
  lessThan,
  atMost,
  between,
  fromTo,
} from 'semantic-validator/lib/is/math';

describe('math validator creators', () => {
  describe('is: equal to', () => {
    it('should return true when the value is equal to the number', () => {
      expect(equalTo(100)(100)).toBe(true);
    });
    it('should return false when the value is not equal to the number', () => {
      expect(equalTo(Infinity)(100)).toBe(false);
      expect(equalTo(100)(200)).toBe(false);
      expect(equalTo(100)(-100)).toBe(false);
    });
  });

  describe('is: greater than', () => {
    it('should return true when the value is greater than the number', () => {
      expect(greaterThan(100)(101)).toBe(true);
    });
    it('should return false when the value is not greater than the number', () => {
      expect(greaterThan(Infinity)(100)).toBe(false);
      expect(greaterThan(100)(100)).toBe(false);
      expect(greaterThan(100)(99)).toBe(false);
    });
  });

  describe('is: at least', () => {
    it('should return true when the value is at least the number', () => {
      expect(atLeast(100)(101)).toBe(true);
      expect(atLeast(100)(100)).toBe(true);
    });
    it('should return false when the value is not at least the number', () => {
      expect(atLeast(Infinity)(100)).toBe(false);
      expect(atLeast(100)(99)).toBe(false);
    });
  });

  describe('is: less than', () => {
    it('should return true when the value is less than the number', () => {
      expect(lessThan(200)(199)).toBe(true);
    });
    it('should return false when the value is not less than the number', () => {
      expect(lessThan(Infinity)(100)).toBe(false);
      expect(lessThan(200)(200)).toBe(false);
      expect(lessThan(200)(201)).toBe(false);
    });
  });

  describe('is: at most', () => {
    it('should return true when the value is at most the number', () => {
      expect(atMost(200)(199)).toBe(true);
      expect(atMost(200)(200)).toBe(true);
    });
    it('should return false when the value is not at most the number', () => {
      expect(atMost(Infinity)(100)).toBe(false);
      expect(atMost(200)(201)).toBe(false);
    });
  });

  describe('is: between', () => {
    it('should return true when the value is between the numbers', () => {
      expect(between(1, 10)(5)).toBe(true);
    });
    it('should return false when the value is not between the numbers', () => {
      expect(between(1, Infinity)(100)).toBe(false);
      expect(between(1, 10)(0)).toBe(false);
      expect(between(1, 10)(1)).toBe(false);
      expect(between(1, 10)(10)).toBe(false);
      expect(between(1, 10)(11)).toBe(false);
    });
  });

  describe('is: from to', () => {
    it('should return true when the value is from to the numbers', () => {
      expect(fromTo(1, 10)(1)).toBe(true);
      expect(fromTo(0, 10)(5)).toBe(true);
      expect(fromTo(1, 10)(10)).toBe(true);
    });
    it('should return false when the value is not from to the numbers', () => {
      expect(fromTo(1, Infinity)(100)).toBe(false);
      expect(fromTo(1, 10)(0)).toBe(false);
      expect(fromTo(1, 10)(11)).toBe(false);
    });
  });
});
