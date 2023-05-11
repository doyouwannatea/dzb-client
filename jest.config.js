/** @type {import('ts-jest').ProjectConfigTsJest} */
module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transformIgnorePatterns: ['node_modules/(?!ky)'],
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
  },
  testEnvironment: 'jsdom',
  setupFiles: ['<rootDir>/tests/setupTests.ts'],
};
