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

export const so = <T>(validator: Validator<T>): Validator<T> => (
  val => validator(val)
);

export const not = <T>(validator: Validator<T>): Validator<T> => (
  val => !validator(val)
);

export const and = <T>(...validators: Validator<T>[]): Validator<T> => (
  val => validators.every(validator => validator(val))
);

export const or = <T>(...validators: Validator<T>[]): Validator<T> => (
  val => validators.some(validator => validator(val))
);

export const every = <T>(validator: Validator<T>): Validator<T[]> => (
  list => (Array.isArray(list) && list.every(item => validator(item)))
);

export const some = <T>(validator: Validator<T>): Validator<T[]> => (
  list => (Array.isArray(list) && list.some(item => validator(item)))
);

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
