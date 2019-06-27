import {
  includes,
  excludes,
  restrictedBy,
  distinct,
} from 'semantic-validator/is/list';

describe('list validator creators', () => {
  describe('is: includes', () => {
    it('should return true when the array value includes all includings', () => {
      expect(includes(10, 20, 30)([0, 10, 20, 30, 40])).toBe(true);
    });
    it('should return false when the array value not includes all includings', () => {
      expect(includes(10, 20, 30)([0, 20, 40])).toBe(false);
      expect(includes(10, 20, 30)(123 as any)).toBe(false);
    });
  });

  describe('is: excludes', () => {
    it('should return true when the array value excludes all includings', () => {
      expect(excludes(5, 15, 25)([0, 10, 20, 30])).toBe(true);
    });
    it('should return false when the array value not excludes all includings', () => {
      expect(excludes(5, 15, 25)([5, 10])).toBe(false);
      expect(excludes(5, 15, 25)(123 as any)).toBe(false);
    });
  });

  describe('is: restricted by', () => {
    it('should return true when the array value is restricted by allowed items', () => {
      expect(restrictedBy(5, 10, 15, 20)([10, 20])).toBe(true);
    });
    it('should return false when the array value is not restricted by allowed items', () => {
      expect(restrictedBy(5, 10, 15, 20)([5, 10, 15, 20, 25, 30])).toBe(false);
      expect(restrictedBy(5, 10, 15, 20)(123 as any)).toBe(false);
    });
  });

  describe('is: distinct', () => {
    it('should return true when the array value are all different', () => {
      expect(distinct()([1, 2, 3])).toBe(true);
    });
    it('should return false when the array value are not all different', () => {
      expect(distinct()([1, 2, 3, 3])).toBe(false);
      expect(distinct()(123 as any)).toBe(false);
    });
  });
});
