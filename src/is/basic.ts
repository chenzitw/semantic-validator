import {
  Validator,
} from '../definition';
import {
  isSameValueZero,
  validateNumber,
} from '../utils';
import {
  definedValidator,
  notDefinedValidator,
  nilValidator,
  booleanValidator,
  numberValidator,
  stringValidator,
  objectValidator,
  functionValidator,
  symbolValidator,
  floatValidator,
  integerValidator,
  arrayValidator,
  dateValidator,
} from '../validators';

/**
 * Compare value by using the SameValueZero algorithm
 * @param target - base value
 */
export const same = (target: any): Validator => (
  val => isSameValueZero(target, val)
);

export const oneOf = (...list: any[]): Validator => (
  val => list.some(item => isSameValueZero(item, val))
);

export const defined = (): Validator => definedValidator;

export const notDefined = (): Validator => notDefinedValidator;

export const nil = (): Validator => nilValidator;

export const bool = (): Validator => booleanValidator;

export const number = (): Validator => numberValidator;

export const string = (): Validator => stringValidator;

export const object = (): Validator => objectValidator;

export const func = (): Validator => functionValidator;

export const symbol = (): Validator => symbolValidator;

export const instanceOf = (constructor: any): Validator => val => (val instanceof constructor);

export const float = (
  options?: {
    equalTo?: number;
    greaterThan?: number;
    atLeast?: number;
    lessThan?: number;
    atMost?: number;
    between?: [number, number];
    fromTo?: [number, number];
  },
): Validator => {
  if ((options === undefined) || (Object.keys(options).length === 0)) {
    return floatValidator;
  }
  return (val: any) => (Number.isFinite(val) && validateNumber(val, options));
};

export const integer = (
  options?: {
    equalTo?: number;
    greaterThan?: number;
    atLeast?: number;
    lessThan?: number;
    atMost?: number;
    between?: [number, number];
    fromTo?: [number, number];
  },
): Validator => {
  if ((options === undefined) || (Object.keys(options).length === 0)) {
    return integerValidator;
  }
  return (val: any) => (Number.isInteger(val) && validateNumber(val, options));
};

export const array = (): Validator => arrayValidator;

export const date = (): Validator => dateValidator;
