// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

/** @type {import('jest').Config} */
const customJestConfig = {
  setupFilesAfterEnv: ["jest-extended/all", "<rootDir>/jest.setup.ts"],
  moduleDirectories: ["node_modules", "<rootDir>/"],
  moduleNameMapper: {
    "^@styles/(.*)$": "src/styles/$1",
    "^@modeling/(.*)$": "src/modeling/$1",
    "^@components/(.*)$": "src/components/$1",
    "^@db/(.*)$": "db/$1",
    "^@lib/(.*)$": "src/lib/$1",
    "^@pages/(.*)$": "src/pages/$1",
    "^@api/(.*)$": "src/pages/api/$1",
    "^@hooks/(.*)$": "src/hooks/$1",
  },
  testEnvironment: "jest-environment-jsdom",
  clearMocks: true,
  preset: "ts-jest",
};

const asyncConfig = createJestConfig(customJestConfig);

module.exports = async () => {
  const config = await asyncConfig();
  config.transformIgnorePatterns = [
    // ...your ignore patterns
  ];
  return config;
};
