
module.exports = {
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules', '/dist/'],
  testRegex: '/test/.*\\.(test|spec)?\\.js$',
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  modulePaths: [
    "<rootDir>/src"
  ]
};