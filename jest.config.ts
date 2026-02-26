import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({ dir: "./" });

const config: Config = {
  testMatch: [
    "<rootDir>/__tests__/unit/**/*.test.ts",
    "<rootDir>/__tests__/unit/**/*.test.tsx",
    "<rootDir>/__tests__/components/**/*.test.tsx",
    "<rootDir>/__tests__/integration/**/*.test.tsx",
  ],
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};

export default createJestConfig(config);
