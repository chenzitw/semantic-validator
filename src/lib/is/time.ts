import {
  Validator,
} from '../definition';
import {
  falsyValidator,
} from '../validators';

const isValidDate = (date: Date): boolean => (
  (date instanceof Date) && !Number.isNaN(date.getTime())
);

/**
 * Is the date object at the moment of the base date object?
 */
export const moment = (base: Date): Validator<Date> => {
  if (!isValidDate(base)) {
    return falsyValidator;
  }
  return (
    time => (isValidDate(time) && (time.getTime() === base.getTime()))
  );
};

/**
 * Is the date object later than the base date object?
 */
export const laterThan = (base: Date): Validator<Date> => {
  if (!isValidDate(base)) {
    return falsyValidator;
  }
  return (
    time => (isValidDate(time) && (time.getTime() > base.getTime()))
  );
};

/**
 * Is the date object at earliest the base date object?
 */
export const atEarliest = (base: Date): Validator<Date> => {
  if (!isValidDate(base)) {
    return falsyValidator;
  }
  return (
    time => (isValidDate(time) && (time.getTime() >= base.getTime()))
  );
};

/**
 * Is the date object earlier than the base date object?
 */
export const earlierThan = (base: Date): Validator<Date> => {
  if (!isValidDate(base)) {
    return falsyValidator;
  }
  return (
    time => (isValidDate(time) && (time.getTime() < base.getTime()))
  );
};

/**
 * Is the date object at latest the base date object?
 */
export const atLatest = (base: Date): Validator<Date> => {
  if (!isValidDate(base)) {
    return falsyValidator;
  }
  return (
    time => (isValidDate(time) && (time.getTime() <= base.getTime()))
  );
};
