import {
  SomeFunction,
} from './definition';
import {
  uniqueArray,
} from './utils';

export const trulyValidator = (
  (): boolean => true
);

export const falsyValidator = (
  (): boolean => false
);

export const definedValidator = (
  (val: any): val is undefined => (typeof val !== 'undefined')
);

export const notDefinedValidator = (
  (val: any): boolean => (typeof val === 'undefined')
);

export const nilValidator = (
  (val: any): val is null => (val === null)
);

export const booleanValidator = (
  (val: any): val is boolean => (typeof val === 'boolean')
);

export const numberValidator = (
  (val: any): val is number => (typeof val === 'number')
);

export const stringValidator = (
  (val: any): val is string => (typeof val === 'string')
);

export const objectValidator = (
  (val: any): val is object => ((typeof val === 'object') && (val !== null))
);

export const functionValidator = (
  (val: any): val is SomeFunction => (typeof val === 'function')
);

export const symbolValidator = (
  (val: any): val is symbol => (typeof val === 'symbol')
);

export const floatValidator = (
  (val: any): val is number => Number.isFinite(val)
);

export const integerValidator = (
  (val: any): val is number => Number.isInteger(val)
);

export const arrayValidator = (
  (val: any): val is any[] => (Array.isArray(val))
);

export const dateValidator = (
  (val: any): val is Date => ((val instanceof Date) && !Number.isNaN(val.getTime()))
);

export const distinctValidator = (
  (val: any[]): val is any[] => (Array.isArray(val) && (val.length === uniqueArray(val).length))
);
