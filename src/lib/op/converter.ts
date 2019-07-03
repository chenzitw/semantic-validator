import {
  Validator,
} from '../definition';
import {
  floatConverter,
  integerConverter,
  lengthConverter,
  keysConverter,
  valuesConverter,
  dateConverter,
} from '../converters';

/**
 * Pass the validator after converted.
 */
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

/**
 * Pass the validator after converted to a float.
 */
export const toFloat = (validator?: Validator<number>): Validator => (
  convert(floatConverter, validator)
);

/**
 * Pass the validator after converted to an integer.
 */
export const toInteger = (validator?: Validator<number>): Validator => (
  convert(integerConverter, validator)
);

/**
 * Pass the validator after converted to the length.
 */
export const toLength = (validator?: Validator<number>): Validator => (
  convert(lengthConverter, validator)
);

/**
 * Pass the validator after splitted the string as an array.
 */
export const toSplit = (
  separator: string,
  validator?: Validator<string[]>,
): Validator => (
  convert((val: string) => val.split(separator), validator)
);

/**
 * Pass the validator after converted to keys of an object.
 */
export const toKeys = <T extends object>(validator?: Validator<(keyof T)[]>): Validator<T> => (
  convert(keysConverter, validator)
);

/**
 * Pass the validator after converted to values of an object.
 */
export const toValues = <T extends object>(validator?: Validator<(T[keyof T])[]>): Validator<T> => (
  convert(valuesConverter, validator)
);

/**
 * Pass the validator after converted to a date object.
 */
export const toDate = (validator?: Validator<Date>): Validator => (
  convert(dateConverter, validator)
);
