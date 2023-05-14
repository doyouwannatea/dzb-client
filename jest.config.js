/** @type {import('ts-jest').ProjectConfigTsJest} */
module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  moduleNameMapper: {
    '\\.svg': '<rootDir>/tests/svgMock.ts',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transformIgnorePatterns: ['node_modules/(?!ky)'],
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
  },
  testEnvironment: 'jsdom',
  setupFiles: ['<rootDir>/tests/setupTests.ts'],
};
