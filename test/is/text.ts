import {
  match,
  startsWith,
  endsWith,
  contains,
} from 'semantic-validator/is/text';

describe('text validator creators', () => {
  describe('is: match', () => {
    it('should return true when the string value matches the regular expression', () => {
      expect(match(/^b[aeiou]t$/)('bat')).toBe(true);
    });
    it('should return false when the string value not matches the regular expression', () => {
      expect(match(/^b[aeiou]t$/)('brt')).toBe(false);
      expect(match(/^b[aeiou]t$/)(123 as any)).toBe(false);
    });
  });

  describe('is: starts with', () => {
    it('should return true when the string value starts with the wording', () => {
      expect(startsWith('net')('network')).toBe(true);
    });
    it('should return false when the string value not starts with the wording', () => {
      expect(startsWith('net')('artwork')).toBe(false);
      expect(startsWith('net')(123 as any)).toBe(false);
    });
  });

  describe('is: ends with', () => {
    it('should return true when the string value ends with the wording', () => {
      expect(endsWith('fox')('firefox')).toBe(true);
    });
    it('should return false when the string value not ends with the wording', () => {
      expect(endsWith('fox')('firewall')).toBe(false);
      expect(endsWith('fox')(123 as any)).toBe(false);
    });
  });

  describe('is: contains', () => {
    it('should return true when the string value contains the wording', () => {
      expect(contains('lie')('believe')).toBe(true);
    });
    it('should return false when the string value not contains the wording', () => {
      expect(contains('lie')('behave')).toBe(false);
      expect(contains('lie')(123 as any)).toBe(false);
    });
  });
});
