// jest.config.js
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '@components/(.*)': '<rootDir>/components/$1',
    '@context/(.*)': '<rootDir>/context/$1',
    '@models/(.*)': '<rootDir>/models/$1',
    '@pages/(.*)': '<rootDir>/pages/$1',
    '@styles/(.*)': '<rootDir>/styles/$1',
    '@utils/(.*)': '<rootDir>/utils/$1',
    'd3-scale': '<rootDir>/node_modules/d3-scale/dist/d3-scale.min.js',
    'd3-array': '<rootDir>/node_modules/d3-array/dist/d3-array.min.js',
    'd3-interpolate':
      '<rootDir>/node_modules/d3-interpolate/dist/d3-interpolate.min.js',
    'd3-format': '<rootDir>/node_modules/d3-format/dist/d3-format.min.js',
    'd3-scale': '<rootDir>/node_modules/d3-scale/dist/d3-scale.min.js',
    'd3-time': '<rootDir>/node_modules/d3-time/dist/d3-time.min.js',
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
