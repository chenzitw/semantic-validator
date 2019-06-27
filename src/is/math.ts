import {
  Validator,
} from '../definition';
import {
  falsyValidator,
} from '../validators';

export const equalTo = (target: number): Validator<number> => {
  if (!Number.isFinite(target)) {
    return falsyValidator;
  }
  return (
    num => (Number.isFinite(num) && (num === target))
  );
};

export const greaterThan = (target: number): Validator<number> => {
  if (!Number.isFinite(target)) {
    return falsyValidator;
  }
  return (
    num => (Number.isFinite(num) && (num > target))
  );
};

export const atLeast = (target: number): Validator<number> => {
  if (!Number.isFinite(target)) {
    return falsyValidator;
  }
  return (
    num => (Number.isFinite(num) && (num >= target))
  );
};

export const lessThan = (target: number): Validator<number> => {
  if (!Number.isFinite(target)) {
    return falsyValidator;
  }
  return (
    num => (Number.isFinite(num) && (num < target))
  );
};

export const atMost = (target: number): Validator<number> => {
  if (!Number.isFinite(target)) {
    return falsyValidator;
  }
  return (
    num => (Number.isFinite(num) && (num <= target))
  );
};

export const between = (min: number, max: number): Validator<number> => {
  if (!Number.isFinite(min) || !Number.isFinite(max)) {
    return falsyValidator;
  }
  return (
    num => (Number.isFinite(num) && (num > Math.min(min, max)) && (num < Math.max(min, max)))
  );
};

/* eslint-disable-next-line arrow-parens */
export const fromTo = (min: number, max: number): Validator<number> => {
  if (!Number.isFinite(min) || !Number.isFinite(max)) {
    return falsyValidator;
  }
  return (
    num => (Number.isFinite(num) && (num >= Math.min(min, max)) && (num <= Math.max(min, max)))
  );
};
