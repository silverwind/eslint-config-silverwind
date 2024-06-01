import comments from "@eslint-community/eslint-plugin-eslint-comments";
import js from "@stylistic/eslint-plugin-js";
import arrayFunc from "eslint-plugin-array-func";
import i from "eslint-plugin-i";
import noUseExtendNative from "eslint-plugin-no-use-extend-native";
import * as regexp from "eslint-plugin-regexp";
import * as sonarjs from "eslint-plugin-sonarjs";
import unicorn from "eslint-plugin-unicorn";
import vitest from "eslint-plugin-vitest";
import globals from "globals";
import {deepMerge} from "deepie-merge";
import vitestGlobalsPlugin from "eslint-plugin-vitest-globals";
import eslintrc from "./index.cjs";

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
  } else if (files.some(file => file.includes("test"))) {
    conf.languageOptions.globals = {...conf.languageOptions.globals, ...vitestGlobals};
  } else if (files.some(file => file.includes("config") || file.includes("storybook"))) {
    conf.rules["i/no-unused-modules"] = [0, {missingExports: true, unusedExports: false}];
  }

  confs.push(conf);
}

// const baseDirectory = dirname(fileURLToPath(import.meta.url));
// export default (new FlatCompat({baseDirectory})).extends("eslint-config-silverwind");

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
