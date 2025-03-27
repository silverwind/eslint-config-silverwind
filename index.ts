import comments from "@eslint-community/eslint-plugin-eslint-comments";
import stylisticJs from "@stylistic/eslint-plugin-js";
import stylisticJsx from "@stylistic/eslint-plugin-jsx";
import arrayFunc from "eslint-plugin-array-func";
import importPlugin from "eslint-plugin-import-x";
import noUseExtendNative from "eslint-plugin-no-use-extend-native";
import regexp from "eslint-plugin-regexp";
import sonarjs from "eslint-plugin-sonarjs";
import unicorn from "eslint-plugin-unicorn";
import vitest from "@vitest/eslint-plugin";
import playwright from "eslint-plugin-playwright";
import tsdoc from "eslint-plugin-tsdoc";
// import storybook from "eslint-plugin-storybook";
// import github from "eslint-plugin-github";
import globals from "globals";
import {deepMerge} from "deepie-merge";
import eslintrc from "./eslintrc.js";
import jsxA11y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import validateJsxNesting from "eslint-plugin-validate-jsx-nesting";
import typescriptPlugin from "typescript-eslint";
import typescriptParser from "@typescript-eslint/parser";
import type {Linter} from "eslint";

type Rules = Record<string, any>;
type Overrides = Array<{
  rules?: Rules,
  [prop: string]: any,
}>;

const baseRules: Rules = {
  ...eslintrc.rules,
  "no-use-extend-native/no-use-extend-native": [2],
  "array-func/avoid-reverse": [2],
  "array-func/from-map": [2],
  "array-func/no-unnecessary-this-arg": [2],
  "array-func/prefer-array-from": [2],
};

const overrides: Overrides = eslintrc.overrides;

const jsExts = [".js", ".jsx", ".mjs", ".cjs"] as const;
const tsExts = [".ts", ".tsx", ".mts", ".cts"] as const;
const otherExts = [".html", ".vue", ".md"] as const;

const common: Linter.Config = {
  ignores: [
    "**/.git/**",
    "**/.venv/**",
    "**/dist/**",
    "**/node_modules/**",
    "**/persistent/**",
    "**/build/**",
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
    reportUnusedDisableDirectives: 2,
  },
  plugins: {
    "@eslint-community/eslint-comments": comments,
    "@stylistic/js": stylisticJs,
    "@typescript-eslint": typescriptPlugin.plugin,
    "array-func": arrayFunc,
    // @ts-expect-error - https://github.com/un-ts/eslint-plugin-import-x/issues/203
    "import-x": importPlugin,
    "no-use-extend-native": noUseExtendNative,
    react,
    "react-hooks": reactHooks,
    "react-refresh": reactRefresh,
    regexp,
    tsdoc,
    sonarjs,
    unicorn,
    // github, // causes peerDependency error with eslint 8 - https://github.com/github/eslint-plugin-github/issues/585
  },
  settings: {
    "import-x/extensions": [...jsExts, tsExts],
    "import-x/parsers": {"@typescript-eslint/parser": [...jsExts, tsExts]},
    "linkComponents": [{name: "Link", linkAttribute: "href"}],
    "react": {version: "detect"},
  },
};

const [
  dtsOverride,
  workerOverride,
  testOverride,
  configOverride,
  playwrightOverride,
  _storybookOverride,
  jsxOverride,
] = overrides;

export default [
  deepMerge(common, {
    files: [...jsExts, ...tsExts].map(ext => `**/*${ext}`),
    rules: baseRules,
  } satisfies Linter.Config, {arrayExtend: true}),
  deepMerge(common, {
    files: dtsOverride.files,
    rules: dtsOverride.rules,
  } satisfies Linter.Config, {arrayExtend: true}),
  deepMerge(common, {
    files: workerOverride.files,
    languageOptions: {globals: {...globals.worker}},
    rules: workerOverride.rules,
  } satisfies Linter.Config, {arrayExtend: true}),
  deepMerge(common, {
    plugins: {vitest},
    files: testOverride.files,
    languageOptions: {globals: {...globals.vitest}},
    rules: testOverride.files,
  } satisfies Linter.Config, {arrayExtend: true}),
  deepMerge(common, {
    files: configOverride.files,
    rules: configOverride.rules,
  } satisfies Linter.Config, {arrayExtend: true}),
  deepMerge(common, {
    ...playwright.configs["flat/recommended"],
    files: playwrightOverride.files,
    rules: playwrightOverride.rules,
  } satisfies Linter.Config, {arrayExtend: true}),
  // deepMerge(common, {
  //   plugins: {storybook},
  //   files: storybookOverride.files,
  //   rules: storybookOverride.rules,
  // } satisfies Linter.Config, {arrayExtend: true}),
  deepMerge(common, {
    plugins: {
      "@stylistic/jsx": stylisticJsx,
      "jsx-a11y": jsxA11y,
      "validate-jsx-nesting": validateJsxNesting,
    },
    files: jsxOverride.files,
    rules: jsxOverride.rules,
  } satisfies Linter.Config, {arrayExtend: true}),
] satisfies Linter.Config[];
