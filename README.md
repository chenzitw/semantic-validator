# Semantic Validator

A functional semantic validator tool for validation of several types and rich content, 
inspired by prop-types from React.  

[![npm version](https://badge.fury.io/js/semantic-validator.svg)](https://badge.fury.io/js/semantic-validator)
[![Build Status](https://travis-ci.com/chenzitw/semantic-validator.svg?branch=master)](https://travis-ci.com/chenzitw/semantic-validator)
[![Coverage Status](https://coveralls.io/repos/github/chenzitw/semantic-validator/badge.svg?branch=master)](https://coveralls.io/github/chenzitw/semantic-validator?branch=master)


## Get started

First, install it via npm.  
```sh
npm i semantic-validator
```
Then, import it from dependencies and enjoy it.  
```javascript
import { op, is } from 'semantic-validator';

const validate = op.shape({
  id: is.integer(),
  tags: op.every(is.string()),
});
```


## Usage

The base unit of semantic validator is a function which accepts the value as an argument for validation. We defines it in TypeScript:  
```typescript
type Validator<T = any> = (val: T) => boolean;
```

This validator tool have several methods in two types: validator operator (op) and validator creator (is).  

For example, we can call a validator creator such as `is.integer()` to create a validator which expects the number should be an integer. We can also call `is.greaterThan(100)` to create a validator which expects the number is greater than 100.  
If we want to match both conditions, we can use a validator operator like `op.and(validator1, validator2)` to combine two validators.  

```javascript
import { op, is } from 'semantic-validator';

const isInt = is.integer();
isInt(12); // => true;
isInt(12.34); // => false;

const isGt100 = is.greaterThan(100);
isGt100(150); // => true;
isGt100(50); // => false;

const isIntGt100 = op.and(
  is.integer(),
  is.greaterThan(100),
);
isIntGt100(123); // => true;
isIntGt100(123.456); // => false;
isIntGt100(12); // => false;
```

You can also integrate other validation tools together. Just follow the validator pattern.  

For example, there is a method `isUUID(str, version)` for validating a string. We can make a validator like `val => isUUID(val, 5)` and compose with other validator operators.  

```javascript
import { op, is } from 'semantic-validator';

const validate = op.shape({
  id: (val => isUUID(val, 5)),
  name: is.string(),
});
validate({ id: '6fad3a7b-161b-5e10-b265-8d522f3f35b5', name: 'Agent K' }); // => true;
validate({ id: 'abc', name: 'Agent K' }); // => false;
```

### Validator operators

#### Basic

**op: so**  
Will be valid when the validator returns true. It is usually not necessary.  
```javascript
op.so(validator)
```
Example:   
```javascript
const validate = op.so(is.same('hello'));
validate('hello'); // => true
validate('bye'); // => false
```

**op: not**  
Will be valid when the validator returns false.  
```javascript
op.not(validator)
```
Example:   
```javascript
const validate = op.not(is.same('hello'));
validate('bye'); // => true
validate('hello'); // => false
```

**op: and**  
Will be valid when all validators return true.  
```javascript
op.and(validator1, validator2, ...validators)
```
Example:   
```javascript
const validate = op.and(is.integer(), is.greaterThan(100));
validate(120); // => true
validate(80); // => false
validate(123.456); // => false
```

**op: or**  
Will be valid when any validator returns true.  
```javascript
op.or(validator1, validator2, ...validators)
```
Example:   
```javascript
const validate = op.or(is.nul(), is.integer());
validate(null); // => true
validate(123); // => true
validate('abc'); // => false
```

**op: every**  
Will be valid when validator returns true on all elements in the array.  
```javascript
op.every(validator)
```
Example:   
```javascript
const validate = op.every(is.integer());
validate([1, 2, 3]); // => true
validate([1, 2.22, 3]); // => false
```

**op: some**  
Will be valid when validator returns true on any element in the array.  
```javascript
op.some(validator)
```
Example:   
```javascript
const validate = op.some(is.integer());
validate([1, 2, 3]); // => true
validate([1.11, 2, 3.33]); // => true
validate([1.11, 2.22, 3.33]); // => false
```

**op: shape**  
Will be valid when value is an object and all validator returns true on each key.  
```javascript
op.shape({
  [key1]: validator1,
  [key2]: validator2,
  ...keysWithValidator,
})
```
Example:   
```javascript
const validate = op.shape({
  id: is.integer(),
  name: is.string(),
});
validate({ id: 123, name: 'Mr. Sandman' }); // => true
validate({ id: 123, name: 'Mr. Sandman', active: true }); // => true
validate({ id: 123 }); // => false
validate({ id: 123, name: 456 }); // => false
```

**op: exact**  
Will be valid when value is an object with specific keys and all validator returns true on each key.  
```javascript
op.exact({
  [key1]: validator1,
  [key2]: validator2,
  ...keysWithValidator,
})
```
Example:   
```javascript
const validate = op.exact({
  id: is.integer(),
  name: is.string(),
});
validate({ id: 123, name: 'Mr. Sandman' }); // => true
validate({ id: 123, name: 'Mr. Sandman', active: true }); // => false
validate({ id: 123 }); // => false
validate({ id: 123, name: 456 }); // => false
```


#### Converter

**op: convert**  
Will be valid when successfully converts the value and the validation is success.  
```javascript
op.convert(converter, validator)
```
Example:   
```javascript
const validate = op.convert(
  numeric => parseFloat(numeric),
  is.greaterThan(100)
);
validate('150'); // => true
validate('50'); // => false
```

**op: to float**  
Will be valid when successfully converts to a float and the validation is success.  
```javascript
op.toFloat(validator)
```
Example:   
```javascript
const validate = op.toFloat(is.greaterThan(1.2));
validate('1.5'); // => true
validate('two'); // => false
validate('0.8'); // => false
```

**op: to integer**  
Will be valid when successfully converts to an integer and the validation is success.  
```javascript
op.toInteger(validator)
```
Example:   
```javascript
const validate = op.toInteger(is.greaterThan(100));
validate('150'); // => true
validate('two'); // => false
validate('123.456'); // => false
validate('50'); // => false
```

**op: to length**  
Will be valid when successfully get the length of an array or string and the validation is success.  
```javascript
op.toLength(validator)
```
Example:   
```javascript
const validate = op.toLength(is.atLeast(3));
validate(['a', 'b', 'c']); // => true
validate('abc'); // => true
validate(['a', 'b']); // => false
validate('ab'); // => false
validate(3); // => false
```

**op: to split**  
Will be valid when successfully split to the array and the validation is success.  
```javascript
op.toSplit(separator, validator)
```
Example:   
```javascript
const validate = op.toSplit(',', op.every(is.startsWith('c')));
validate('candy,cookie,coffee'); // => true
validate('candy,cookie,tea'); // => false
validate(123); // => false
```

**op: to keys**  
Will be valid when successfully get keys of an object and the validation is success.  
```javascript
op.toKeys(validator)
```
Example:   
```javascript
const validate = op.toKeys(op.every(is.oneOf('id', 'name')));
validate({ id: 123, name: 'Mario' }); // => true
validate({ id: 123, name: 'Mario', age: 20 }); // => false
```

**op: to values**  
Will be valid when successfully get values of an object and the validation is success.  
```javascript
op.toValues(validator)
```
Example:   
```javascript
const validate = op.toValues(op.every(is.integer()));
validate({ people: 64, seats: 80 }); // => true
validate({ people: 640, seats: 'many' }); // => false
```

### Validator creators

#### Basic

**is: same**  
Will be valid when base value and compare value are the same by using the SameValueZero algorithm.  
```javascript
is.same(baseValue)
```
Example:   
```javascript
const validate = is.same('hello');
validate('hello'); // => true
```

**is: one of**  
Will be valid when one of base values and compare value are the same by using the SameValueZero algorithm.  
```javascript
is.oneOf(...baseValues)
```
Example:   
```javascript
const validate = is.oneOf(100, '100', 'one hundred');
validate('100'); // => true
```

**is: defined**  
Will be valid when the value is defined (not undefined).  
```javascript
is.defined()
```
Example:   
```javascript
const validate = is.defined();
validate(123); // => true
validate(undefined); // => false
```

**is: not defined**  
Will be valid when the value is not defined (undefined).  
```javascript
is.notDefined()
```
Example:   
```javascript
const validate = is.notDefined();
validate(undefined); // => true
validate(123); // => false
```

**is: nul**  
Will be valid when the value is null.  
```javascript
is.nul()
```
Example:   
```javascript
const validate = is.nul();
validate(null); // => true
validate(123); // => false
```

**is: nil**  
Will be valid when the value is undefined or null.  
```javascript
is.nil()
```
Example:   
```javascript
const validate = is.nil();
validate(undefined); // => true
validate(null); // => true
validate(123); // => false
```

**is: bool**  
Will be valid when the value is a boolean.  
```javascript
is.bool()
```
Example:   
```javascript
const validate = is.bool();
validate(false); // => true
validate(123); // => false
```

**is: number**  
Will be valid when the value is a number.  
```javascript
is.number()
```
Example:   
```javascript
const validate = is.number();
validate(123); // => true
validate('abc'); // => false
```

**is: string**  
Will be valid when the value is a string.  
```javascript
is.string()
```
Example:   
```javascript
const validate = is.string();
validate('abc'); // => true
validate(123); // => false
```

**is: object**  
Will be valid when the value is a non null object.  
```javascript
is.object()
```
Example:   
```javascript
const validate = is.object();
validate({ key: 'value' }); // => true
validate({}); // => true
validate(null); // => false
validate(123); // => false
```

**is: func**  
Will be valid when the value is a function.  
```javascript
is.func()
```
Example:   
```javascript
const validate = is.func();
validate(() => {}); // => true
validate(123); // => false
```

**is: symbol**  
Will be valid when the value is a symbol.  
```javascript
is.symbol()
```
Example:   
```javascript
const validate = is.symbol();
validate(Symbol('abc')); // => true
validate('abc'); // => false
```

**is: instance of**  
Will be valid when the value is the instance of a constructor.  
```javascript
is.instanceOf(constructor)
```
Example:   
```javascript
const validate = is.instanceOf(Date);
validate(new Date()); // => true
validate(123); // => false
```

**is: float**  
Will be valid when the value is a float and not NaN or infinity.  
```javascript
is.float()
```
Example:   
```javascript
const validate = is.float();
validate(123.456); // => true
validate(123); // => true
validate('123'); // => false
```

**is: integer**  
Will be valid when the value is a integer and not NaN or infinity.  
```javascript
is.integer()
```
Example:   
```javascript
const validate = is.integer();
validate(123); // => true
validate(123.456); // => false
```

**is: array**  
Will be valid when the value is an array object.  
```javascript
is.array()
```
Example:   
```javascript
const validate = is.array();
validate([1, 2, 3]); // => true
```

**is: date**  
Will be valid when the value is a valid date object.  
```javascript
is.date()
```
Example:   
```javascript
const validate = is.date();
validate(new Date()); // => true
validate(new Date('invalid date')); // => false
validate('invalid date'); // => false
```


#### Math

**is: equal to**  
Will be valid when the value is equal to the number.  
```javascript
is.equalTo(num)
```
Example:   
```javascript
const validate = is.equalTo(100);
validate(100); // true
validate(200); // false
```

**is: greater than**  
Will be valid when the value is greater than the number.  
```javascript
is.greaterThan(num)
```
Example:   
```javascript
const validate = is.greaterThan(100);
validate(101); // => true
validate(100); // => false
```

**is: at least**  
Will be valid when the value is at least the number.  
```javascript
is.atLeast(num)
```
Example:   
```javascript
const validate = is.atLeast(100);
validate(100); // => true
validate(99); // => false
```

**is: less than**  
Will be valid when the value is less than the number.  
```javascript
is.lessThan(num)
```
Example:   
```javascript
const validate = is.lessThan(200);
validate(199); // => true
validate(200); // => false
```

**is: at most**  
Will be valid when the value is at most the number.  
```javascript
is.atMost(num)
```
Example:   
```javascript
const validate = is.atMost(200);
validate(200); // => true
validate(201); // => false
```

**is: between**  
Will be valid when the value is between the numbers.  
```javascript
is.between(min, max)
```
Example:   
```javascript
const validate = is.between(0, 10);
validate(5); // => true
validate(0); // => false
validate(10); // => false
```

**is: from to**  
Will be valid when the value is from and to the numbers.  
```javascript
is.fromTo(min, max)
```
Example:   
```javascript
const validate = is.fromTo(1, 9);
validate(1); // => true
validate(9); // => true
validate(0); // => false
validate(10); // => false
```


#### Text

**is: match**  
Will be valid when the value matches the regular expression.  
```javascript
is.match(regexp)
```
Example:   
```javascript
const validate = is.match(/^b[aeiou]t$/);
validate('bat'); // => true
validate('brt'); // => false
```

**is: starts with**  
Will be valid when the value starts with the wording.  
```javascript
is.startsWith(wording)
```
Example:   
```javascript
const validate = is.startsWith('net');
validate('network'); // => true
validate('artwork'); // => false
```

**is: ends with**  
Will be valid when the value ends with the wording.  
```javascript
is.endsWith(wording)
```
Example:   
```javascript
const validate = is.endsWith('fox');
validate('firefox'); // => true
validate('firewall'); // => false
```

**is: contains**  
Will be valid when the value contains the wording.  
```javascript
is.contains(wording)
```
Example:   
```javascript
const validate = is.contains('lie');
validate('believe'); // => true
validate('behave'); // => false
```


#### List

**is: includes**  
Will be valid when the array value includes all includings.  
```javascript
is.includes(including1, including2, ...includings)
```
Example:   
```javascript
const validate = is.includes(10, 20, 30);
validate([0, 10, 20, 30, 40]); // => true
validate([0, 20, 40]); // => false
```

**is: excludes**  
Will be valid when the array value excludes all excludings.  
```javascript
is.excludes(excluding1, excluding2, ...excludings)
```
Example:   
```javascript
const validate = is.excludes(5, 15, 25);
validate([0, 10, 20, 30]); // => true
validate([5, 10]); // => false
```

**is: restricted by**  
Will be valid when the array value is restricted by allowed items.  
```javascript
is.restrictedBy(allowedItem1, allowedItem2, ...allowedItems)
```
Example:   
```javascript
const validate = is.restrictedBy(5, 10, 15, 20);
validate([10, 20]); // => true
validate([5, 10, 15, 20, 25, 30]); // => false
```

**is: distinct**  
Will be valid when items of array value are all different.  
```javascript
is.distinct()
```
Example:   
```javascript
const validate = is.distinct();
validate([1, 2, 3]); // => true
validate([1, 2, 3, 3]]); // => false
```
