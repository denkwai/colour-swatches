module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom', // or 'jsdom' if you're testing browser-specific code
    moduleFileExtensions: ['ts', 'js', 'json', 'node'], // File extensions to be tested
    testMatch: ['**/__tests__/**/*.test.ts', '**/?(*.)+(spec|test).ts'], // Patterns to find test files
};
