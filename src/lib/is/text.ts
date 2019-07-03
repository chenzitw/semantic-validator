import {
  Validator,
} from '../definition';
import {
  falsyValidator,
} from '../validators';

/**
 * Is the string match the regular expression?
 */
export const match = (regExp: RegExp): Validator<string> => {
  if (!(regExp instanceof RegExp)) {
    return falsyValidator;
  }
  return (
    text => ((typeof text === 'string') && regExp.test(text))
  );
};

/**
 * Is the string starts with the wording?
 */
export const startsWith = (wording: string): Validator<string> => {
  if (typeof wording !== 'string') {
    return falsyValidator;
  }
  return (
    text => ((typeof text === 'string') && text.startsWith(wording))
  );
};

/**
 * Is the string ends with the wording?
 */
export const endsWith = (wording: string): Validator<string> => {
  if (typeof wording !== 'string') {
    return falsyValidator;
  }
  return (
    text => ((typeof text === 'string') && text.endsWith(wording))
  );
};

/**
 * Is the string contains the wording?
 */
export const contains = (wording: string): Validator<string> => {
  if (typeof wording !== 'string') {
    return falsyValidator;
  }
  return (
    text => ((typeof text === 'string') && text.includes(wording))
  );
};
