import comments from "@eslint-community/eslint-plugin-eslint-comments";
import stylisticJs from "@stylistic/eslint-plugin-js";
import stylisticJsx from "@stylistic/eslint-plugin-jsx";
import arrayFunc from "eslint-plugin-array-func";
import importPlugin from "eslint-plugin-i";
import noUseExtendNative from "eslint-plugin-no-use-extend-native";
import regexp from "eslint-plugin-regexp";
import sonarjs from "eslint-plugin-sonarjs";
import unicorn from "eslint-plugin-unicorn";
import vitest from "eslint-plugin-vitest";
import playwright from "eslint-plugin-playwright";
import globals from "globals";
import {deepMerge} from "deepie-merge";
import vitestGlobalsPlugin from "eslint-plugin-vitest-globals";
import eslintrc from "./eslintrc.js";
import {restrictedWorkerGlobals} from "./globals.js";
import jsxA11y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import validateJsxNesting from "eslint-plugin-validate-jsx-nesting";
import reactConfig from "eslint-config-silverwind-react";
import typescriptConfig from "eslint-config-silverwind-typescript";
import typescriptPlugin from "typescript-eslint";
import typescriptParser from "@typescript-eslint/parser";
import etc from "eslint-plugin-etc";
import type {Linter} from "eslint";

const baseRules: Record<string, any> = eslintrc.rules;

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
    parser: typescriptParser,
    parserOptions: {
      sourceType: "module",
      ecmaFeatures: {
        jsx: true,
        impliedStrict: true,
      },
      project: true,
      extraFileExtensions: [".html", ".vue", ".md"],
    },
  },
  linterOptions: {
    reportUnusedDisableDirectives: "warn",
  },
  plugins: {
    "@eslint-community/eslint-comments": comments,
    "@stylistic/js": stylisticJs,
    "@stylistic/jsx": stylisticJsx,
    "@typescript-eslint": typescriptPlugin.plugin,
    "array-func": arrayFunc,
    etc,
    "i": importPlugin,
    "jsx-a11y": jsxA11y,
    "no-use-extend-native": noUseExtendNative,
    react,
    "react-hooks": reactHooks,
    "react-refresh": reactRefresh,
    regexp,
    sonarjs,
    unicorn,
    "validate-jsx-nesting": validateJsxNesting,
  },
  settings: {
    "import/extensions": [".js", ".jsx", ".ts", ".tsx"],
    "import/parsers": {"@typescript-eslint/parser": [".js", ".jsx", ".ts", ".tsx"]},
    "import/resolver": "typescript",
    "linkComponents": [{name: "Link", linkAttribute: "href"}],
    "react": {version: "detect"},
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
    rules: {
      ...baseRules,
      ...reactConfig.rules,
      ...typescriptConfig.rules,
    },
  } as Linter.FlatConfig, {arrayExtend: true}),
  deepMerge(common, {
    files: [
      "**/*worker.*"
    ],
    languageOptions: {globals: {...globals.worker}},
    rules: {
      ...baseRules,
      "no-restricted-globals": [2, ...restrictedWorkerGlobals],
    },
  } as Linter.FlatConfig, {arrayExtend: true}),
  // @ts-ignore
  deepMerge(common, {
    "files": [
      "**/*.test.*",
      "vitest.setup.*",
    ],
    plugins: {
      vitest,
    },
    languageOptions: {
      globals: {
        ...vitestGlobalsPlugin.environments.env.globals,
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
  } as Linter.FlatConfig, {arrayExtend: true}),
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
  } as Linter.FlatConfig, {arrayExtend: true}),
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
  } as Linter.FlatConfig, {arrayExtend: true}),
  // @ts-ignore
  deepMerge(common, {
    ...playwright.configs["flat/recommended"],
    files: [
      "tests/**",
    ],
    "plugins": {
      "playwright": playwright.configs["flat/recommended"].plugins.playwright,
    },
    rules: {
      ...baseRules,
      ...playwright.configs["flat/recommended"].rules,
      "playwright/expect-expect": [0],
    },
  } as Linter.FlatConfig, {arrayExtend: true}),
] as Linter.FlatConfig[];
