const convertAnyToNumber = (value: boolean | number | string): (undefined | number) => {
  switch (typeof value) {
    case 'boolean': return Number(value);
    case 'number': return (Number.isFinite(value)) ? value : undefined;
    case 'string': return (/^[-+]?[0-9]*\.?[0-9]+$/.test(value)) ? Number(value) : undefined;
    default: return undefined;
  }
};

export const floatConverter = (val: boolean | number | string): number => {
  const numericVal = convertAnyToNumber(val);
  if (numericVal === undefined) {
    throw new Error();
  }
  if (!Number.isFinite(numericVal)) {
    throw new Error();
  }
  return numericVal;
};

export const integerConverter = (val: boolean | number | string): number => {
  const numericVal = convertAnyToNumber(val);
  if (numericVal === undefined) {
    throw new Error();
  }
  if (!Number.isInteger(numericVal)) {
    throw new Error();
  }
  return numericVal;
};

export const lengthConverter = (val: string | any[]): number => {
  const length = val.length;
  if (length === undefined) {
    throw new Error();
  }
  return length;
};

export const keysConverter = Object.keys as (<T extends object>(val: T) => (keyof T)[]);

export const valuesConverter = Object.values as (<T extends object>(val: T) => T[keyof T][]);
