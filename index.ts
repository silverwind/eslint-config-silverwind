import comments from "@eslint-community/eslint-plugin-eslint-comments";
import stylisticJs from "@stylistic/eslint-plugin-js";
import stylisticJsx from "@stylistic/eslint-plugin-jsx";
import arrayFunc from "eslint-plugin-array-func";
import importPlugin from "eslint-plugin-import";
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
import reactConfig from "eslint-config-silverwind-react" with {type: "json"};
import typescriptConfig from "eslint-config-silverwind-typescript" with {type: "json"};
import typescriptPlugin from "typescript-eslint";
import typescriptParser from "@typescript-eslint/parser";
import deprecation from "eslint-plugin-deprecation";
import {fixupPluginRules} from "@eslint/compat";
import type {Linter} from "eslint";

type Rules = Record<string, any>;
type Overrides = {
  rules?: Rules,
  [prop: string]: any,
};

const baseRules: Rules = eslintrc.rules;
const overrides: Overrides = eslintrc.overrides;

const jsExts = [".js", ".jsx", ".mjs", ".cjs"] as const;
const tsExts = [".ts", ".tsx", ".mts", ".cts"] as const;
const otherExts = [".html", ".vue", ".md"] as const;

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
    globals: {
      ...globals.browser,
      ...globals.node,
    },
    parser: typescriptParser,
    parserOptions: {
      sourceType: "module",
      ecmaFeatures: {
        jsx: true,
        impliedStrict: true,
      },
      project: true,
      extraFileExtensions: otherExts,
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
    deprecation: fixupPluginRules(deprecation), // https://github.com/gund/eslint-plugin-deprecation/issues/78
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
    "import/extensions": [...jsExts, tsExts],
    "import/parsers": {"@typescript-eslint/parser": [...jsExts, tsExts]},
    "import/resolver": "typescript",
    "linkComponents": [{name: "Link", linkAttribute: "href"}],
    "react": {version: "detect"},
  },
};

// TODOs:
// - storybook: https://github.com/storybookjs/eslint-plugin-storybook/pull/156
export default [
  deepMerge(common, {
    files: jsExts.map(ext => `**/*${ext}`),
    rules: {
      ...baseRules,
      ...reactConfig.rules,
      // no typescript rules for js, maybe remove later if it works - https://github.com/gund/eslint-plugin-deprecation/issues/78#issuecomment-2153190684
    },
  } satisfies Linter.FlatConfig, {arrayExtend: true}),
  deepMerge(common, {
    files: tsExts.map(ext => `**/*${ext}`),
    rules: {
      ...baseRules,
      ...reactConfig.rules,
      ...typescriptConfig.rules,
    },
  } satisfies Linter.FlatConfig, {arrayExtend: true}),
  deepMerge(common, {
    files: [
      "**/*.worker.*"
    ],
    languageOptions: {globals: {...globals.worker}},
    rules: {
      ...baseRules,
      "no-restricted-globals": [2, ...restrictedWorkerGlobals],
    },
  } satisfies Linter.FlatConfig, {arrayExtend: true}),
  deepMerge(common, {
    "files": [
      "**/*.test.*",
      "vitest.setup.*",
      "integration/**",
    ],
    plugins: {
      vitest,
    },
    languageOptions: {
      globals: {
        ...vitestGlobalsPlugin.environments.env.globals,
      },
    },
    rules: {
      ...baseRules,
      ...overrides[1].rules,
    },
  } satisfies Linter.FlatConfig, {arrayExtend: true}),
  deepMerge(common, {
    files: [
      "**/*.config.*",
      "**/*.stories.*",
      "vitest.global.*",
    ],
    rules: {
      ...baseRules,
      "import/no-unused-modules": [2, {"missingExports": true, "unusedExports": false}],
    },
  } satisfies Linter.FlatConfig, {arrayExtend: true}),
  deepMerge(common, {
    files: [
      "**/.storybook/**",
      "**/*.config.test.*",
      "**/*.d.ts",
    ],
    rules: {
      ...baseRules,
      "import/no-unused-modules": [0],
    },
  } satisfies Linter.FlatConfig, {arrayExtend: true}),
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
  } satisfies Linter.FlatConfig, {arrayExtend: true}),
] satisfies Linter.FlatConfig[];
