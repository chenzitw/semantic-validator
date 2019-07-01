import {
  Validator,
} from '../definition';
import {
  falsyValidator,
} from '../validators';

export const match = (regExp: RegExp): Validator<string> => {
  if (!(regExp instanceof RegExp)) {
    return falsyValidator;
  }
  return (
    text => ((typeof text === 'string') && regExp.test(text))
  );
};

export const startsWith = (wording: string): Validator<string> => {
  if (typeof wording !== 'string') {
    return falsyValidator;
  }
  return (
    text => ((typeof text === 'string') && text.startsWith(wording))
  );
};

export const endsWith = (wording: string): Validator<string> => {
  if (typeof wording !== 'string') {
    return falsyValidator;
  }
  return (
    text => ((typeof text === 'string') && text.endsWith(wording))
  );
};

export const contains = (wording: string): Validator<string> => {
  if (typeof wording !== 'string') {
    return falsyValidator;
  }
  return (
    text => ((typeof text === 'string') && text.includes(wording))
  );
};
