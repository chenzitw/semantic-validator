module.exports = {
  preset: 'ts-jest',
  moduleNameMapper: {
    '^semantic-validator$': '<rootDir>/src',
    '^semantic-validator/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: ['<rootDir>/test/**/*.ts'],
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/test/tsconfig.json'
    }
  }
};
