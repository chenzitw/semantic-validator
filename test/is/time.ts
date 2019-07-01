import {
  moment,
  laterThan,
  atEarliest,
  earlierThan,
  atLatest,
} from 'semantic-validator/lib/is/time';

describe('time validator creators', () => {
  describe('is: moment', () => {
    it('should return true when the date object is at the moment of the base', () => {
      expect(moment(new Date(1500000000000))(new Date(1500000000000))).toBe(true);
    });
    it('should return false when the date object is not at the moment of the base', () => {
      expect(moment(new Date(1500000000000))(new Date(1400000000000))).toBe(false);
      expect(moment(new Date('invalid date'))(new Date(1500000000000))).toBe(false);
      expect(moment(new Date(1500000000000))(new Date('invalid date'))).toBe(false);
      expect(moment(123 as any)(new Date(1500000000000))).toBe(false);
      expect(moment(new Date(1500000000000))(123 as any)).toBe(false);
    });
  });

  describe('is: later than', () => {
    it('should return true when the date object is later than the base', () => {
      expect(laterThan(new Date(1500000000000))(new Date(1500000000001))).toBe(true);
    });
    it('should return false when the date object is not later than the base', () => {
      expect(laterThan(new Date(1500000000000))(new Date(1500000000000))).toBe(false);
      expect(laterThan(new Date(1500000000000))(new Date(1499999999999))).toBe(false);
      expect(laterThan(new Date(1500000000000))(new Date('invalid date'))).toBe(false);
      expect(laterThan(new Date(1500000000000))(123 as any)).toBe(false);
    });
  });

  describe('is: at earliest', () => {
    it('should return true when the date object is at earliest the base', () => {
      expect(atEarliest(new Date(1500000000000))(new Date(1500000000000))).toBe(true);
      expect(atEarliest(new Date(1500000000000))(new Date(1500000000001))).toBe(true);
    });
    it('should return false when the date object is not at earliest the base', () => {
      expect(atEarliest(new Date(1500000000000))(new Date(1499999999999))).toBe(false);
      expect(atEarliest(new Date(1500000000000))(new Date('invalid date'))).toBe(false);
      expect(atEarliest(new Date(1500000000000))(123 as any)).toBe(false);
    });
  });

  describe('is: earlier than', () => {
    it('should return true when the date object is earlier than the base', () => {
      expect(earlierThan(new Date(1500000000000))(new Date(1499999999999))).toBe(true);
    });
    it('should return false when the date object is not earlier than the base', () => {
      expect(earlierThan(new Date(1500000000000))(new Date(1500000000000))).toBe(false);
      expect(earlierThan(new Date(1500000000000))(new Date(1500000000001))).toBe(false);
      expect(earlierThan(new Date(1500000000000))(new Date('invalid date'))).toBe(false);
      expect(earlierThan(new Date(1500000000000))(123 as any)).toBe(false);
    });
  });

  describe('is: at latest', () => {
    it('should return true when the date object is at latest the base', () => {
      expect(atLatest(new Date(1500000000000))(new Date(1500000000000))).toBe(true);
      expect(atLatest(new Date(1500000000000))(new Date(1499999999999))).toBe(true);
    });
    it('should return false when the date object is not at latest the base', () => {
      expect(atLatest(new Date(1500000000000))(new Date(1500000000001))).toBe(false);
      expect(atLatest(new Date(1500000000000))(new Date('invalid date'))).toBe(false);
      expect(atLatest(new Date(1500000000000))(123 as any)).toBe(false);
    });
  });
});
