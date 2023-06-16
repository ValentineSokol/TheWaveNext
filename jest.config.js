const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig');
const config = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
    moduleNameMapper: {
        ...pathsToModuleNameMapper(compilerOptions.paths , { prefix: compilerOptions.baseUrl } ),
        '\\.(css|less|scss|sass)': 'identity-obj-proxy',
    },
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
        '^.+\\.(ts|tsx)?$': ['ts-jest',  { tsConfig: "tsconfig-jest.json" }],
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
    verbose: true,
    collectCoverage: true,
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80,
        },
    },
};

module.exports = config;
