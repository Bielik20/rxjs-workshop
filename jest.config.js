module.exports = {
  roots: ['<rootDir>/spec'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  collectCoverageFrom: [
    'spec/**/*.ts',
    '!spec/__helpers/**/*.ts',
  ],
};
