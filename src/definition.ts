/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export type Validator<T = any> = (val: T) => boolean;

export type SomeObject = {
  [K in string]: any;
};

export type ShapeValidation<T extends SomeObject> = {
  [K in keyof Partial<T>]: Validator<T[K]>;
}

export type ExactValidation<T extends SomeObject> = {
  [K in keyof T]: Validator<T[K]>;
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export type SomeFunction = (args: any[]) => any;
