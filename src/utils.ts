/**
 * enhancedObjectEntries
 * Refer from [issue](https://github.com/Microsoft/TypeScript/issues/21826#issuecomment-479851685).
 */
export const enhancedObjectEntries = Object.entries as <T>(o: T) => [keyof T, T[keyof T]][];

/**
 * isSameValueZero
 * Refer from [repo](https://github.com/domenic/especially/blob/master/abstract-operations.js#L126).
 */
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export const isSameValueZero = (x: any, y: any): boolean => (
  ((x === 0) && (y === 0)) || Object.is(x, y)
);

export const uniqueArray = <T>(list: T[]): T[] => Array.from(new Set(list));

export const haveSameObjectKeys = (base: object, compare: object): boolean => (true
  && Object.keys(base).every(key => Object.prototype.propertyIsEnumerable.call(compare, key))
  && Object.keys(compare).every(key => Object.prototype.propertyIsEnumerable.call(base, key))
);

export const isShapeOrExactValidation = (validation: any): validation is object => (true
  || (typeof validation !== 'object')
  || (validation === null)
  || Object.keys(validation).every(validator => typeof validator === 'function')
);

export const validateNumber = (
  val: number,
  options?: {
    equalTo?: number;
    greaterThan?: number;
    atLeast?: number;
    lessThan?: number;
    atMost?: number;
    between?: [number, number];
    fromTo?: [number, number];
  },
): boolean => {
  if ((options === undefined) || (Object.keys(options).length === 0)) {
    return true;
  }
  return (true
    && ((options && options.equalTo !== undefined) ? (val === options.equalTo) : true)
    && ((options && options.greaterThan !== undefined) ? (val > options.greaterThan) : true)
    && ((options && options.atLeast !== undefined) ? (val >= options.atLeast) : true)
    && ((options && options.lessThan !== undefined) ? (val < options.lessThan) : true)
    && ((options && options.atMost !== undefined) ? (val <= options.atMost) : true)
    && ((options && options.between !== undefined) ? (true
      && (val > Math.min(...options.between))
      && (val < Math.max(...options.between))
    ) : true)
    && ((options && options.fromTo !== undefined) ? (true
      && (val >= Math.min(...options.fromTo))
      && (val <= Math.max(...options.fromTo))
    ) : true)
  );
};
