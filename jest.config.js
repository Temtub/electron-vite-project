module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '^@/(.*)$': '<rootDir>/src/$1',
        '^/restApi/(.*)$': '<rootDir>/restApi/$1',
        '^Components/(.*)$': '<rootDir>/src/Components/$1'
    },
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
    },
};
