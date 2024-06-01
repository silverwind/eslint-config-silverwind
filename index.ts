import comments from "@eslint-community/eslint-plugin-eslint-comments";
import stylisticJs from "@stylistic/eslint-plugin-js";
import arrayFunc from "eslint-plugin-array-func";
import importPlugin from "eslint-plugin-i";
import noUseExtendNative from "eslint-plugin-no-use-extend-native";
import * as regexp from "eslint-plugin-regexp";
import * as sonarjs from "eslint-plugin-sonarjs";
import unicorn from "eslint-plugin-unicorn";
import vitest from "eslint-plugin-vitest";
import playwright from "eslint-plugin-playwright";
import globals from "globals";
import {deepMerge} from "deepie-merge";
import vitestGlobalsPlugin from "eslint-plugin-vitest-globals";
import eslintrc from "./eslintrc.js";
import {restrictedWorkerGlobals} from "./globals.ts";
import type {Linter} from "eslint";

const baseRules: Linter.RulesRecord = eslintrc.rules;

const common: Linter.FlatConfig = {
  ignores: [
    "**/.git/**",
    "**/.venv/**",
    "**/dist/**",
    "**/node_modules/**",
    "**/persistent/**",
    "**/ui/build/**",
    "**/vendor/**",
    "**/*.snap",
    "!.storybook",
  ],
  languageOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    globals: {...globals.browser, ...globals.node},
  },
  linterOptions: {
    reportUnusedDisableDirectives: "warn",
  },
  plugins: {
    "@stylistic/js": stylisticJs,
    "@eslint-community/eslint-comments": comments,
    "array-func": arrayFunc,
    "i": importPlugin,
    "no-use-extend-native": noUseExtendNative,
    "regexp": regexp,
    "sonarjs": sonarjs,
    "unicorn": unicorn,
  },
  settings: {
    "import/extensions": [".js", ".jsx", ".ts", ".tsx"],
  },
};

export default [
  deepMerge(common, {
    files: [
      "**/*.js",
      "**/*.jsx",
      "**/*.ts",
      "**/*.tsx",
    ],
    rules: baseRules,
  } as Linter.FlatConfig),
  deepMerge(common, {
    files: [
      "**/*worker.*"
    ],
    languageOptions: {globals: {...globals.worker}},
    rules: {
      ...baseRules,
      "no-restricted-globals": [2, ...restrictedWorkerGlobals],
    },
  } as Linter.FlatConfig),
  // @ts-ignore
  deepMerge(common, {
    "files": [
      "**/*.test.*",
      "vitest.setup.*",
    ],
    plugins: {
      "vitest": vitest,
    },
    languageOptions: {
      globals: {
        ...vitestGlobalsPlugin.environments.env.globals
      }
    },
    rules: {
      ...baseRules,
      "unicorn/consistent-function-scoping": [0],
      "vitest/consistent-test-filename": [0],
      "vitest/consistent-test-it": [0],
      "vitest/expect-expect": [0],
      "vitest/max-expects": [0],
      "vitest/max-nested-describe": [0],
      "vitest/no-alias-methods": [0],
      "vitest/no-commented-out-tests": [0],
      "vitest/no-conditional-expect": [0],
      "vitest/no-conditional-in-test": [0],
      "vitest/no-conditional-tests": [0],
      "vitest/no-disabled-tests": [0],
      "vitest/no-done-callback": [0],
      "vitest/no-duplicate-hooks": [0],
      "vitest/no-focused-tests": [0],
      "vitest/no-hooks": [0],
      "vitest/no-identical-title": [2],
      "vitest/no-interpolation-in-snapshots": [0],
      "vitest/no-large-snapshots": [0],
      "vitest/no-mocks-import": [0],
      "vitest/no-restricted-matchers": [0],
      "vitest/no-restricted-vi-methods": [0],
      "vitest/no-standalone-expect": [0],
      "vitest/no-test-prefixes": [0],
      "vitest/no-test-return-statement": [0],
      "vitest/prefer-called-with": [0],
      "vitest/prefer-comparison-matcher": [0],
      "vitest/prefer-each": [0],
      "vitest/prefer-equality-matcher": [0],
      "vitest/prefer-expect-resolves": [0],
      "vitest/prefer-hooks-in-order": [0],
      "vitest/prefer-hooks-on-top": [2],
      "vitest/prefer-lowercase-title": [0],
      "vitest/prefer-mock-promise-shorthand": [0],
      "vitest/prefer-snapshot-hint": [0],
      "vitest/prefer-spy-on": [0],
      "vitest/prefer-strict-equal": [0],
      "vitest/prefer-to-be": [0],
      "vitest/prefer-to-be-falsy": [0],
      "vitest/prefer-to-be-object": [0],
      "vitest/prefer-to-be-truthy": [0],
      "vitest/prefer-to-contain": [0],
      "vitest/prefer-to-have-length": [0],
      "vitest/prefer-todo": [0],
      "vitest/require-hook": [0],
      "vitest/require-to-throw-message": [0],
      "vitest/require-top-level-describe": [0],
      "vitest/valid-describe-callback": [2],
      "vitest/valid-expect": [2],
      "vitest/valid-title": [2],
    },
  } as Linter.FlatConfig),
  deepMerge(common, {
    files: [
      "**/*.config.*",
      "**/*.stories.*",
      "vitest.global.*",
    ],
    rules: {
      ...baseRules,
      "i/no-unused-modules": [2, {"missingExports": true, "unusedExports": false}],
    },
  } as Linter.FlatConfig),
  deepMerge(common, {
    files: [
      "**/.storybook/**",
      "**/*.config.test.*",
      "**/*.d.ts",
    ],
    rules: {
      ...baseRules,
      "i/no-unused-modules": [0],
    },
  } as Linter.FlatConfig),
  // @ts-ignore
  deepMerge(common, {
    ...playwright.configs['flat/recommended'],
    files: [
      "tests/**",
    ],
    "plugins": {
      "playwright": playwright.configs['flat/recommended'].plugins.playwright,
    },
    rules: {
      ...baseRules,
      ...playwright.configs['flat/recommended'].rules,
      "playwright/expect-expect": [0],
    },
  } as Linter.FlatConfig),
] as Linter.FlatConfig[];
