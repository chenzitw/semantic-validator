import {
  Validator,
} from '../definition';
import {
  isSameValueZero,
} from '../utils';
import {
  definedValidator,
  notDefinedValidator,
  nulValidator,
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

export const nul = (): Validator => nulValidator;

export const nil = (): Validator => nilValidator;

export const bool = (): Validator => booleanValidator;

export const number = (): Validator => numberValidator;

export const string = (): Validator => stringValidator;

export const object = (): Validator => objectValidator;

export const func = (): Validator => functionValidator;

export const symbol = (): Validator => symbolValidator;

export const instanceOf = (constructor: any): Validator => val => (val instanceof constructor);

export const float = (): Validator => floatValidator;

export const integer = (): Validator => integerValidator;

export const array = (): Validator => arrayValidator;

export const date = (): Validator => dateValidator;
