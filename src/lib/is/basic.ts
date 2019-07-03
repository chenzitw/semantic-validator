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
 * Is the same as the base value?
 */
export const same = (target: any): Validator => (
  val => isSameValueZero(target, val)
);

/**
 * Is the same as any base values?
 */
export const oneOf = (...list: any[]): Validator => (
  val => list.some(item => isSameValueZero(item, val))
);

/**
 * Is defined (not undefined)?
 */
export const defined = (): Validator => definedValidator;

/**
 * Is undefined?
 */
export const notDefined = (): Validator => notDefinedValidator;

/**
 * Is null?
 */
export const nul = (): Validator => nulValidator;

/**
 * Is undefined or null?
 */
export const nil = (): Validator => nilValidator;

/**
 * Is a boolean?
 */
export const bool = (): Validator => booleanValidator;

/**
 * Is a number?
 */
export const number = (): Validator => numberValidator;

/**
 * Is a string?
 */
export const string = (): Validator => stringValidator;

/**
 * Is a non null object?
 */
export const object = (): Validator => objectValidator;

/**
 * Is a function?
 */
export const func = (): Validator => functionValidator;

/**
 * Is a symbol?
 */
export const symbol = (): Validator => symbolValidator;

/**
 * Is an instance of the constructor (class)?
 */
export const instanceOf = (constructor: any): Validator => val => (val instanceof constructor);

/**
 * Is a valid (not `NaN` or `Infinity`) float?
 */
export const float = (): Validator => floatValidator;

/**
 * Is a valid (not `NaN` or `Infinity`) integer?
 */
export const integer = (): Validator => integerValidator;

/**
 * Is an array?
 */
export const array = (): Validator => arrayValidator;

/**
 * Is a valid (not `Invalid Date`) date object?
 */
export const date = (): Validator => dateValidator;
