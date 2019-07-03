import {
  Validator,
} from '../definition';
import {
  falsyValidator,
} from '../validators';

/**
 * Is the number equal to the base number?
 */
export const equalTo = (target: number): Validator<number> => {
  if (!Number.isFinite(target)) {
    return falsyValidator;
  }
  return (
    num => (Number.isFinite(num) && (num === target))
  );
};

/**
 * Is the number greater than the base number?
 */
export const greaterThan = (target: number): Validator<number> => {
  if (!Number.isFinite(target)) {
    return falsyValidator;
  }
  return (
    num => (Number.isFinite(num) && (num > target))
  );
};

/**
 * Is the number at least the base number?
 */
export const atLeast = (target: number): Validator<number> => {
  if (!Number.isFinite(target)) {
    return falsyValidator;
  }
  return (
    num => (Number.isFinite(num) && (num >= target))
  );
};

/**
 * Is the number less than the base number?
 */
export const lessThan = (target: number): Validator<number> => {
  if (!Number.isFinite(target)) {
    return falsyValidator;
  }
  return (
    num => (Number.isFinite(num) && (num < target))
  );
};

/**
 * Is the number at most the base number?
 */
export const atMost = (target: number): Validator<number> => {
  if (!Number.isFinite(target)) {
    return falsyValidator;
  }
  return (
    num => (Number.isFinite(num) && (num <= target))
  );
};

/**
 * Is the number between the base numbers?
 */
export const between = (min: number, max: number): Validator<number> => {
  if (!Number.isFinite(min) || !Number.isFinite(max)) {
    return falsyValidator;
  }
  return (
    num => (Number.isFinite(num) && (num > Math.min(min, max)) && (num < Math.max(min, max)))
  );
};

/**
 * Is the number from and to the base numbers?
 */
export const fromTo = (min: number, max: number): Validator<number> => {
  if (!Number.isFinite(min) || !Number.isFinite(max)) {
    return falsyValidator;
  }
  return (
    num => (Number.isFinite(num) && (num >= Math.min(min, max)) && (num <= Math.max(min, max)))
  );
};
