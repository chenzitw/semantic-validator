import {
  Validator,
} from '../definition';
import {
  distinctValidator,
} from '../validators';

/**
 * Is the array includes all includings?
 */
export const includes = (...includings: any[]): Validator<any[]> => (
  list => (Array.isArray(list) && includings.every(including => list.includes(including)))
);

/**
 * Is the array excludes all excludings?
 */
export const excludes = (...excludings: any[]): Validator<any[]> => (
  list => (Array.isArray(list) && excludings.every(excluding => !list.includes(excluding)))
);

/**
 * Is the array only includes allowed items?
 */
export const restrictedBy = (...whitelist: any[]): Validator<any[]> => (
  list => (Array.isArray(list) && list.every(item => whitelist.includes(item)))
);

/**
 * Is items of the array are all different?
 */
export const distinct = (): Validator<any[]> => distinctValidator;
