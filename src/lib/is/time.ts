import {
  Validator,
} from '../definition';
import {
  falsyValidator,
} from '../validators';

const isValidDate = (date: Date): boolean => (
  (date instanceof Date) && !Number.isNaN(date.getTime())
);

export const moment = (base: Date): Validator<Date> => {
  if (!isValidDate(base)) {
    return falsyValidator;
  }
  return (
    time => (isValidDate(time) && (time.getTime() === base.getTime()))
  );
};

export const laterThan = (base: Date): Validator<Date> => {
  if (!isValidDate(base)) {
    return falsyValidator;
  }
  return (
    time => (isValidDate(time) && (time.getTime() > base.getTime()))
  );
};

export const atEarliest = (base: Date): Validator<Date> => {
  if (!isValidDate(base)) {
    return falsyValidator;
  }
  return (
    time => (isValidDate(time) && (time.getTime() >= base.getTime()))
  );
};

export const earlierThan = (base: Date): Validator<Date> => {
  if (!isValidDate(base)) {
    return falsyValidator;
  }
  return (
    time => (isValidDate(time) && (time.getTime() < base.getTime()))
  );
};

export const atLatest = (base: Date): Validator<Date> => {
  if (!isValidDate(base)) {
    return falsyValidator;
  }
  return (
    time => (isValidDate(time) && (time.getTime() <= base.getTime()))
  );
};
