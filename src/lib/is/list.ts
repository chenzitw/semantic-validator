import {
  Validator,
} from '../definition';
import {
  distinctValidator,
} from '../validators';

export const includes = (...includings: any[]): Validator<any[]> => (
  list => (Array.isArray(list) && includings.every(including => list.includes(including)))
);

export const excludes = (...excludings: any[]): Validator<any[]> => (
  list => (Array.isArray(list) && excludings.every(excluding => !list.includes(excluding)))
);

export const restrictedBy = (...whitelist: any[]): Validator<any[]> => (
  list => (Array.isArray(list) && list.every(item => whitelist.includes(item)))
);

export const distinct = (): Validator<any[]> => distinctValidator;
