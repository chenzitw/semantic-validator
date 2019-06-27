import {
  Validator,
} from '../definition';
import {
  floatConverter,
  integerConverter,
  lengthConverter,
  keysConverter,
  valuesConverter,
} from '../converters';

export const convert = <T1, T2>(
  converter: (original: T1) => T2,
  validator?: Validator<T2>,
): Validator<T1> => (
  (val: T1): boolean => {
    let convertedVal;
    try {
      convertedVal = converter(val);
    } catch (error) {
      return false;
    }
    return (validator !== undefined) ? validator(convertedVal) : true;
  }
);

export const toFloat = (validator?: Validator<number>): Validator => (
  convert(floatConverter, validator)
);

export const toInteger = (validator?: Validator<number>): Validator => (
  convert(integerConverter, validator)
);

export const toLength = (validator?: Validator<number>): Validator => (
  convert(lengthConverter, validator)
);

export const toSplit = (
  separator: string,
  validator?: Validator<string[]>,
): Validator => (
  convert((val: string) => val.split(separator), validator)
);

export const toKeys = <T extends object>(validator?: Validator<(keyof T)[]>): Validator<T> => (
  convert(keysConverter, validator)
);

export const toValues = <T extends object>(validator?: Validator<(T[keyof T])[]>): Validator<T> => (
  convert(valuesConverter, validator)
);
