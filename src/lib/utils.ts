/**
 * enhancedObjectEntries
 * Refer from [issue](https://github.com/Microsoft/TypeScript/issues/21826#issuecomment-479851685).
 */
export const enhancedObjectEntries = Object.entries as <T>(o: T) => [keyof T, T[keyof T]][];

/**
 * isSameValueZero
 * Refer from [repo](https://github.com/domenic/especially/blob/master/abstract-operations.js#L126).
 */
export const isSameValueZero = (x: any, y: any): boolean => (
  ((x === 0) && (y === 0)) || Object.is(x, y)
);

export const uniqueArray = <T>(list: T[]): T[] => Array.from(new Set(list));

export const haveSameObjectKeys = (base: object, compare: object): boolean => (true
  && Object.keys(base).every(key => Object.prototype.propertyIsEnumerable.call(compare, key))
  && Object.keys(compare).every(key => Object.prototype.propertyIsEnumerable.call(base, key))
);

export const isShapeOrExactValidation = (validation: any): validation is object => (true
  && (typeof validation === 'object')
  && (validation !== null)
  && Object.values(validation).every(validator => typeof validator === 'function')
);
