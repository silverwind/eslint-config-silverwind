import comments from "@eslint-community/eslint-plugin-eslint-comments";
import js from "@stylistic/eslint-plugin-js";
import antfu from "eslint-plugin-antfu";
import arrayFunc from "eslint-plugin-array-func";
import i from "eslint-plugin-i";
import noUseExtendNative from "eslint-plugin-no-use-extend-native";
import regexp from "eslint-plugin-regexp";
import sonarjs from "eslint-plugin-sonarjs";
import unicorn from "eslint-plugin-unicorn";
import vitest from "eslint-plugin-vitest";
import globals from "globals";
import {load} from "js-yaml";
import {readFileSync} from "node:fs";
import {deepMerge} from "deepie-merge";
import confusingBrowserGlobals from "confusing-browser-globals";
import vitestGlobalsPlugin from "eslint-plugin-vitest-globals";

const eslintrc = load(readFileSync(new URL(".eslintrc.yaml", import.meta.url), "utf8"));
const vitestGlobals = vitestGlobalsPlugin.environments.env.globals;

const common = {
  ignores: [
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
  },
  linterOptions: {
    reportUnusedDisableDirectives: "warn"
  },
  plugins: {
    comments,
    js,
    antfu,
    arrayFunc,
    i,
    noUseExtendNative,
    regexp,
    sonarjs,
    unicorn,
    vitest,
    vitestGlobals,
    globals,
  },
  settings: {
    "import/extensions": [".js", ".jsx", ".ts", ".tsx"],
  },
};

const confs = [];
for (const {files, rules} of eslintrc.overrides) {
  const conf = deepMerge(common, {files, rules});

  if (files.some(file => file.includes("worker"))) {
    conf.languageOptions.globals = {...conf.languageOptions.globals, ...globals.worker};
    conf.rules["no-restricted-globals"] = [...confusingBrowserGlobals, "__dirname", "__filename"];
  } else if (files.some(file => file.includes("test"))) {
    conf.languageOptions.globals = {...conf.languageOptions.globals, ...vitestGlobals};
  } else if (files.some(file => file.includes("config"))) {
    conf.rules["i/no-unused-modules"] = [2, {missingExports: true, unusedExports: false}];
  } else if (files.some(file => file.includes("storybook"))) {
    conf.rules["i/no-unused-modules"] = [0, {missingExports: true, unusedExports: false}];
  }

  confs.push(conf);
}

export default [
  deepMerge(common, {
    files: [
      "**/*.js",
      "**/*.jsx",
      "**/*.ts",
      "**/*.tsx",
    ],
    rules: eslintrc.rules,
  }),
  ...confs,
];
