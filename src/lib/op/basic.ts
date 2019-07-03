import {
  Validator,
  SomeObject,
  ShapeValidation,
  ExactValidation,
} from '../definition';
import {
  enhancedObjectEntries,
  haveSameObjectKeys,
  isShapeOrExactValidation,
} from '../utils';
import {
  falsyValidator,
} from '../validators';

/**
 * Pass the validator.
 */
export const so = <T>(validator: Validator<T>): Validator<T> => (
  val => validator(val)
);

/**
 * Not pass the validator.
 */
export const not = <T>(validator: Validator<T>): Validator<T> => (
  val => !validator(val)
);

/**
 * Pass all validators.
 */
export const and = <T>(...validators: Validator<T>[]): Validator<T> => (
  val => validators.every(validator => validator(val))
);

/**
 * Pass any validators.
 */
export const or = <T>(...validators: Validator<T>[]): Validator<T> => (
  val => validators.some(validator => validator(val))
);

/**
 * Pass the validator on all elements in an array.
 */
export const every = <T>(validator: Validator<T>): Validator<T[]> => (
  list => (Array.isArray(list) && list.every(item => validator(item)))
);

/**
 * Pass the validator on any elements in an array.
 */
export const some = <T>(validator: Validator<T>): Validator<T[]> => (
  list => (Array.isArray(list) && list.some(item => validator(item)))
);

/**
 * Pass all validators for each properties of an object.
 */
export const shape = (
  /* eslint-disable-next-line arrow-parens */
  <T extends SomeObject>(shapeValidation: ShapeValidation<T>): Validator<T & SomeObject> => {
    if (!isShapeOrExactValidation(shapeValidation)) {
      return falsyValidator;
    }
    return (
      obj => (true
        && (typeof obj === 'object')
        && (obj !== null)
        && enhancedObjectEntries(shapeValidation).every(([key, validator]) => validator(obj[key]))
      )
    );
  }
);

/**
 * Pass all validators for each properties of an exact object.
 */
export const exact = (
  /* eslint-disable-next-line arrow-parens */
  <T extends SomeObject>(exactValidation: ExactValidation<T>): Validator<T> => {
    if (!isShapeOrExactValidation(exactValidation)) {
      return falsyValidator;
    }
    return (
      obj => (true
        && (typeof obj === 'object')
        && (obj !== null)
        && haveSameObjectKeys(obj, exactValidation)
        && enhancedObjectEntries(exactValidation).every(([key, validator]) => validator(obj[key]))
      )
    );
  }
);
