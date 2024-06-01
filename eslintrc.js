import {restrictedGlobals, restrictedWorkerGlobals} from "./globals.ts";

export default {
  "root": true,
  "reportUnusedDisableDirectives": true,
  "plugins": [
    "@eslint-community/eslint-plugin-eslint-comments",
    "@stylistic/eslint-plugin-js",
    "eslint-plugin-array-func",
    "eslint-plugin-i",
    "eslint-plugin-no-use-extend-native",
    "eslint-plugin-regexp",
    "eslint-plugin-sonarjs",
    "eslint-plugin-unicorn",
    "eslint-plugin-vitest",
    "eslint-plugin-vitest-globals",
  ],
  "parserOptions": {
    "sourceType": "module",
    "ecmaVersion": "latest",
  },
  "env": {
    "browser": true,
    "es2024": true,
    "node": true,
  },
  "settings": {
    "import/extensions": [".js", ".jsx", ".ts", ".tsx"],
    "import/parsers": {
      "@typescript-eslint/parser": [".js", ".jsx", ".ts", ".tsx"],
    },
    "import/resolver": {
      "typescript": true,
    },
  },
  "ignorePatterns": [
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
  "overrides": [
    {
      "files": ["**/*worker.*"],
      "env": {
        "worker": true,
      },
      "rules": {
        "no-restricted-globals": [2, ...restrictedWorkerGlobals],
      },
    },
    {
      "files": [
        "**/*.test.*",
        "vitest.setup.*",
      ],
      "env": {
        "vitest-globals/env": true,
      },
      "rules": {
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
    },
    {
      "files": ["**/*.config.*", "**/*.stories.*", "vitest.global.*"],
      "rules": {
        "i/no-unused-modules": [2, {"missingExports": true, "unusedExports": false}],
      },
    },
    {
      "files": ["**/.storybook/**", "**/*.config.test.*", "**/*.d.ts"],
      "rules": {
        "i/no-unused-modules": [0],
      },
    },
    {
      "files": ["tests/**"],
      "extends": "plugin:playwright/recommended",
      "rules": {
        "playwright/expect-expect": [0],
      },
    },
  ],
  "rules": {
    "@eslint-community/eslint-comments/disable-enable-pair": [2, {"allowWholeFile": true}],
    "@eslint-community/eslint-comments/no-aggregating-enable": [2],
    "@eslint-community/eslint-comments/no-duplicate-disable": [2],
    "@eslint-community/eslint-comments/no-restricted-disable": [0],
    "@eslint-community/eslint-comments/no-unlimited-disable": [2],
    "@eslint-community/eslint-comments/no-unused-disable": [2],
    "@eslint-community/eslint-comments/no-unused-enable": [2],
    "@eslint-community/eslint-comments/no-use": [0],
    "@eslint-community/eslint-comments/require-description": [0],
    "@stylistic/js/array-bracket-newline": [0],
    "@stylistic/js/array-bracket-spacing": [2, "never"],
    "@stylistic/js/array-element-newline": [0],
    "@stylistic/js/arrow-parens": [0],
    "@stylistic/js/arrow-spacing": [2, {"before": true, "after": true}],
    "@stylistic/js/block-spacing": [0],
    "@stylistic/js/brace-style": [2, "1tbs", {"allowSingleLine": true}],
    "@stylistic/js/comma-dangle": [2, "only-multiline"],
    "@stylistic/js/comma-spacing": [2, {"before": false, "after": true}],
    "@stylistic/js/comma-style": [2, "last"],
    "@stylistic/js/computed-property-spacing": [2, "never"],
    "@stylistic/js/dot-location": [2, "property"],
    "@stylistic/js/eol-last": [2],
    "@stylistic/js/function-call-argument-newline": [0],
    "@stylistic/js/function-call-spacing": [2, "never"],
    "@stylistic/js/function-paren-newline": [0],
    "@stylistic/js/generator-star-spacing": [0],
    "@stylistic/js/implicit-arrow-linebreak": [0],
    "@stylistic/js/indent": [2, 2, {"ignoreComments": true, "SwitchCase": 1}],
    "@stylistic/js/key-spacing": [2],
    "@stylistic/js/keyword-spacing": [2],
    "@stylistic/js/line-comment-position": [0],
    "@stylistic/js/linebreak-style": [2, "unix"],
    "@stylistic/js/lines-around-comment": [0],
    "@stylistic/js/lines-between-class-members": [0],
    "@stylistic/js/max-len": [0],
    "@stylistic/js/max-statements-per-line": [0],
    "@stylistic/js/multiline-comment-style": [0],
    "@stylistic/js/multiline-ternary": [0],
    "@stylistic/js/new-parens": [2],
    "@stylistic/js/newline-per-chained-call": [0],
    "@stylistic/js/no-confusing-arrow": [0],
    "@stylistic/js/no-extra-parens": [0],
    "@stylistic/js/no-extra-semi": [2],
    "@stylistic/js/no-floating-decimal": [0],
    "@stylistic/js/no-mixed-operators": [0],
    "@stylistic/js/no-mixed-spaces-and-tabs": [2],
    "@stylistic/js/no-multi-spaces": [2, {"ignoreEOLComments": true, "exceptions": {"Property": true}}],
    "@stylistic/js/no-multiple-empty-lines": [2, {"max": 1, "maxEOF": 0, "maxBOF": 0}],
    "@stylistic/js/no-tabs": [2],
    "@stylistic/js/no-trailing-spaces": [2],
    "@stylistic/js/no-whitespace-before-property": [2],
    "@stylistic/js/nonblock-statement-body-position": [2],
    "@stylistic/js/object-curly-newline": [0],
    "@stylistic/js/object-curly-spacing": [2, "never"],
    "@stylistic/js/object-property-newline": [0],
    "@stylistic/js/one-var-declaration-per-line": [0],
    "@stylistic/js/operator-linebreak": [2, "after"],
    "@stylistic/js/padded-blocks": [2, "never"],
    "@stylistic/js/padding-line-between-statements": [0],
    "@stylistic/js/quote-props": [0],
    "@stylistic/js/quotes": [2, "double", {"avoidEscape": true, "allowTemplateLiterals": true}],
    "@stylistic/js/rest-spread-spacing": [2, "never"],
    "@stylistic/js/semi": [2, "always"],
    "@stylistic/js/semi-spacing": [2, {"before": false, "after": true}],
    "@stylistic/js/semi-style": [2, "last"],
    "@stylistic/js/space-before-blocks": [2, "always"],
    "@stylistic/js/space-before-function-paren": [2, {"anonymous": "never", "named": "never", "asyncArrow": "always"}],
    "@stylistic/js/space-in-parens": [2, "never"],
    "@stylistic/js/space-infix-ops": [2],
    "@stylistic/js/space-unary-ops": [2],
    "@stylistic/js/spaced-comment": [0],
    "@stylistic/js/switch-colon-spacing": [2],
    "@stylistic/js/template-curly-spacing": [2, "never"],
    "@stylistic/js/template-tag-spacing": [2, "never"],
    "@stylistic/js/wrap-iife": [2, "inside"],
    "@stylistic/js/wrap-regex": [0],
    "@stylistic/js/yield-star-spacing": [2, "after"],
    "accessor-pairs": [2],
    "array-callback-return": [2, {"checkForEach": true}],
    "array-func/avoid-reverse": [2],
    "array-func/from-map": [2],
    "array-func/no-unnecessary-this-arg": [2],
    "array-func/prefer-array-from": [2],
    "array-func/prefer-flat-map": [0],
    "array-func/prefer-flat": [0],
    "arrow-body-style": [0],
    "block-scoped-var": [2],
    "camelcase": [0],
    "capitalized-comments": [0],
    "class-methods-use-this": [0],
    "complexity": [0],
    "consistent-return": [0],
    "consistent-this": [0],
    "constructor-super": [2],
    "curly": [0],
    "default-case-last": [2],
    "default-case": [0],
    "default-param-last": [0],
    "dot-notation": [0],
    "eqeqeq": [2],
    "for-direction": [2],
    "func-name-matching": [2],
    "func-names": [0],
    "func-style": [0],
    "getter-return": [2],
    "grouped-accessor-pairs": [2],
    "guard-for-in": [0],
    "i/consistent-type-specifier-style": [0],
    "i/default": [2],
    "i/dynamic-import-chunkname": [0],
    "i/export": [2],
    "i/exports-last": [0],
    "i/extensions": [2, "ignorePackages"],
    "i/first": [2],
    "i/group-exports": [0],
    "i/max-dependencies": [0],
    "i/named": [2],
    "i/namespace": [0],
    "i/newline-after-import": [0],
    "i/no-absolute-path": [2],
    "i/no-amd": [2],
    "i/no-anonymous-default-export": [0],
    "i/no-commonjs": [2, {"allowConditionalRequire": false}],
    "i/no-cycle": [2, {"ignoreExternal": true, "maxDepth": 1}],
    "i/no-default-export": [0],
    "i/no-deprecated": [0],
    "i/no-duplicates": [2],
    "i/no-dynamic-require": [0],
    "i/no-empty-named-blocks": [2],
    "i/no-extraneous-dependencies": [2],
    "i/no-import-module-exports": [0],
    "i/no-internal-modules": [0],
    "i/no-mutable-exports": [0],
    "i/no-named-as-default-member": [0],
    "i/no-named-as-default": [0],
    "i/no-named-default": [0],
    "i/no-named-export": [0],
    "i/no-namespace": [0],
    "i/no-nodejs-modules": [0],
    "i/no-relative-packages": [0],
    "i/no-relative-parent-imports": [0],
    "i/no-restricted-paths": [0],
    "i/no-self-import": [2],
    "i/no-unassigned-import": [0],
    "i/no-unresolved": [2, {"commonjs": true, "ignore": ["\\?.+$", "^vitest/"]}],
    "i/no-unused-modules": [2, {"unusedExports": true}],
    "i/no-useless-path-segments": [2, {"commonjs": true}],
    "i/no-webpack-loader-syntax": [2],
    "i/order": [0],
    "i/prefer-default-export": [0],
    "i/unambiguous": [0],
    "id-blacklist": [0],
    "id-denylist": [0],
    "id-length": [0],
    "id-match": [0],
    "init-declarations": [0],
    "line-comment-position": [0],
    "logical-assignment-operators": [0],
    "max-classes-per-file": [0],
    "max-depth": [0],
    "max-lines-per-function": [0],
    "max-lines": [0],
    "max-nested-callbacks": [0],
    "max-params": [0],
    "max-statements": [0],
    "multiline-comment-style": [0],
    "new-cap": [0],
    "no-alert": [0],
    "no-array-constructor": [2],
    "no-async-promise-executor": [0],
    "no-await-in-loop": [0],
    "no-bitwise": [0],
    "no-buffer-constructor": [0],
    "no-caller": [2],
    "no-case-declarations": [2],
    "no-class-assign": [2],
    "no-compare-neg-zero": [2],
    "no-cond-assign": [2, "except-parens"],
    "no-console": [1, {"allow": ["debug", "info", "warn", "error"]}],
    "no-const-assign": [2],
    "no-constant-binary-expression": [2],
    "no-constant-condition": [0],
    "no-constructor-return": [2],
    "no-continue": [0],
    "no-control-regex": [0],
    "no-debugger": [1],
    "no-delete-var": [2],
    "no-div-regex": [0],
    "no-dupe-args": [2],
    "no-dupe-class-members": [2],
    "no-dupe-else-if": [2],
    "no-dupe-keys": [2],
    "no-duplicate-case": [2],
    "no-duplicate-imports": [0],
    "no-else-return": [0],
    "no-empty-character-class": [2],
    "no-empty-function": [0],
    "no-empty-pattern": [2],
    "no-empty-static-block": [2],
    "no-empty": [2, {"allowEmptyCatch": true}],
    "no-eq-null": [2],
    "no-eval": [2],
    "no-ex-assign": [2],
    "no-extend-native": [2],
    "no-extra-bind": [2],
    "no-extra-boolean-cast": [2],
    "no-extra-label": [0],
    "no-fallthrough": [2],
    "no-func-assign": [2],
    "no-global-assign": [2],
    "no-implicit-coercion": [2],
    "no-implicit-globals": [0],
    "no-implied-eval": [2],
    "no-import-assign": [2],
    "no-inline-comments": [0],
    "no-inner-declarations": [2],
    "no-invalid-regexp": [2],
    "no-invalid-this": [0],
    "no-irregular-whitespace": [2],
    "no-iterator": [2],
    "no-label-var": [2],
    "no-labels": [0],
    "no-lone-blocks": [2],
    "no-lonely-if": [0],
    "no-loop-func": [0],
    "no-loss-of-precision": [2],
    "no-magic-numbers": [0],
    "no-misleading-character-class": [2],
    "no-multi-assign": [0],
    "no-multi-str": [2],
    "no-negated-condition": [0],
    "no-nested-ternary": [0],
    "no-new-func": [2],
    "no-new-native-nonconstructor": [2],
    "no-new-symbol": [2],
    "no-new-wrappers": [2],
    "no-new": [0],
    "no-nonoctal-decimal-escape": [2],
    "no-obj-calls": [2],
    "no-object-constructor": [2],
    "no-octal-escape": [2],
    "no-octal": [2],
    "no-param-reassign": [0],
    "no-plusplus": [0],
    "no-promise-executor-return": [0],
    "no-proto": [2],
    "no-prototype-builtins": [2],
    "no-redeclare": [2],
    "no-regex-spaces": [2],
    "no-restricted-exports": [0],
    "no-restricted-globals": [2, restrictedGlobals],
    "no-restricted-imports": [2, "punycode", "assert"],
    "no-restricted-properties": [0],
    "no-restricted-syntax": [2, "WithStatement", "ForInStatement", "LabeledStatement", "SequenceExpression"],
    "no-return-assign": [0],
    "no-script-url": [2],
    "no-self-assign": [2, {"props": true}],
    "no-self-compare": [2],
    "no-sequences": [2],
    "no-setter-return": [2],
    "no-shadow-restricted-names": [2],
    "no-shadow": [0],
    "no-sparse-arrays": [2],
    "no-template-curly-in-string": [2],
    "no-ternary": [0],
    "no-this-before-super": [2],
    "no-throw-literal": [2],
    "no-undef-init": [2],
    "no-undef": [2, {"typeof": true}],
    "no-undefined": [0],
    "no-underscore-dangle": [0],
    "no-unexpected-multiline": [2],
    "no-unmodified-loop-condition": [2],
    "no-unneeded-ternary": [0],
    "no-unreachable-loop": [2],
    "no-unreachable": [2],
    "no-unsafe-finally": [2],
    "no-unsafe-negation": [2],
    "no-unsafe-optional-chaining": [2],
    "no-unused-expressions": [2],
    "no-unused-labels": [2],
    "no-unused-private-class-members": [2],
    "no-unused-vars": [2, {"vars": "all", "args": "all", "caughtErrors": "all", "ignoreRestSiblings": false, "argsIgnorePattern": "^_", "varsIgnorePattern": "^_[^_]*$", "caughtErrorsIgnorePattern": "^_", "destructuredArrayIgnorePattern": "^_"}
    ],
    "no-use-before-define": [2, {"functions": false, "classes": true, "variables": true, "allowNamedExports": true}],
    "no-use-extend-native/no-use-extend-native": [2],
    "no-useless-backreference": [2],
    "no-useless-call": [2],
    "no-useless-catch": [2],
    "no-useless-computed-key": [2],
    "no-useless-concat": [2],
    "no-useless-constructor": [2],
    "no-useless-escape": [2],
    "no-useless-rename": [2],
    "no-useless-return": [0],
    "no-var": [2],
    "no-void": [2],
    "no-warning-comments": [0],
    "no-with": [0],
    "object-shorthand": [2, "always"],
    "one-var": [0],
    "operator-assignment": [2, "always"],
    "prefer-arrow-callback": [2, {"allowNamedFunctions": true, "allowUnboundThis": true}],
    "prefer-const": [2, {"destructuring": "all", "ignoreReadBeforeAssign": true}],
    "prefer-destructuring": [0],
    "prefer-exponentiation-operator": [2],
    "prefer-named-capture-group": [0],
    "prefer-numeric-literals": [2],
    "prefer-object-has-own": [2],
    "prefer-object-spread": [2],
    "prefer-promise-reject-errors": [2, {"allowEmptyReject": false}],
    "prefer-regex-literals": [2],
    "prefer-rest-params": [2],
    "prefer-spread": [2],
    "prefer-template": [2],
    "radix": [2, "as-needed"],
    "regexp/confusing-quantifier": [2],
    "regexp/control-character-escape": [2],
    "regexp/hexadecimal-escape": [0],
    "regexp/letter-case": [0],
    "regexp/match-any": [0],
    "regexp/negation": [2],
    "regexp/no-contradiction-with-assertion": [0],
    "regexp/no-control-character": [0],
    "regexp/no-dupe-characters-character-class": [2],
    "regexp/no-dupe-disjunctions": [2],
    "regexp/no-empty-alternative": [2],
    "regexp/no-empty-capturing-group": [2],
    "regexp/no-empty-character-class": [0],
    "regexp/no-empty-group": [2],
    "regexp/no-empty-lookarounds-assertion": [2],
    "regexp/no-empty-string-literal": [2],
    "regexp/no-escape-backspace": [2],
    "regexp/no-extra-lookaround-assertions": [0],
    "regexp/no-invalid-regexp": [2],
    "regexp/no-invisible-character": [2],
    "regexp/no-lazy-ends": [2],
    "regexp/no-legacy-features": [2],
    "regexp/no-misleading-capturing-group": [0],
    "regexp/no-misleading-unicode-character": [0],
    "regexp/no-missing-g-flag": [2],
    "regexp/no-non-standard-flag": [2],
    "regexp/no-obscure-range": [2],
    "regexp/no-octal": [2],
    "regexp/no-optional-assertion": [2],
    "regexp/no-potentially-useless-backreference": [2],
    "regexp/no-standalone-backslash": [2],
    "regexp/no-super-linear-backtracking": [0],
    "regexp/no-super-linear-move": [0],
    "regexp/no-trivially-nested-assertion": [2],
    "regexp/no-trivially-nested-quantifier": [2],
    "regexp/no-unused-capturing-group": [0],
    "regexp/no-useless-assertions": [2],
    "regexp/no-useless-backreference": [2],
    "regexp/no-useless-character-class": [0],
    "regexp/no-useless-dollar-replacements": [2],
    "regexp/no-useless-escape": [2],
    "regexp/no-useless-flag": [2],
    "regexp/no-useless-lazy": [2],
    "regexp/no-useless-non-capturing-group": [2],
    "regexp/no-useless-quantifier": [2],
    "regexp/no-useless-range": [2],
    "regexp/no-useless-set-operand": [2],
    "regexp/no-useless-string-literal": [2],
    "regexp/no-useless-two-nums-quantifier": [2],
    "regexp/no-zero-quantifier": [2],
    "regexp/optimal-lookaround-quantifier": [2],
    "regexp/optimal-quantifier-concatenation": [0],
    "regexp/prefer-character-class": [0],
    "regexp/prefer-d": [0],
    "regexp/prefer-escape-replacement-dollar-char": [0],
    "regexp/prefer-lookaround": [0],
    "regexp/prefer-named-backreference": [0],
    "regexp/prefer-named-capture-group": [0],
    "regexp/prefer-named-replacement": [0],
    "regexp/prefer-plus-quantifier": [2],
    "regexp/prefer-predefined-assertion": [2],
    "regexp/prefer-quantifier": [0],
    "regexp/prefer-question-quantifier": [2],
    "regexp/prefer-range": [2],
    "regexp/prefer-regexp-exec": [2],
    "regexp/prefer-regexp-test": [2],
    "regexp/prefer-result-array-groups": [0],
    "regexp/prefer-set-operation": [2],
    "regexp/prefer-star-quantifier": [2],
    "regexp/prefer-unicode-codepoint-escapes": [2],
    "regexp/prefer-w": [0],
    "regexp/require-unicode-regexp": [0],
    "regexp/simplify-set-operations": [2],
    "regexp/sort-alternatives": [0],
    "regexp/sort-character-class-elements": [0],
    "regexp/sort-flags": [0],
    "regexp/strict": [0],
    "regexp/unicode-escape": [0],
    "regexp/unicode-property": [0],
    "regexp/use-ignore-case": [0],
    "require-atomic-updates": [0],
    "require-await": [0],
    "require-unicode-regexp": [0],
    "require-yield": [2],
    "sonarjs/cognitive-complexity": [0],
    "sonarjs/elseif-without-else": [0],
    "sonarjs/max-switch-cases": [0],
    "sonarjs/no-all-duplicated-branches": [2],
    "sonarjs/no-collapsible-if": [0],
    "sonarjs/no-collection-size-mischeck": [2],
    "sonarjs/no-duplicate-string": [0],
    "sonarjs/no-duplicated-branches": [0],
    "sonarjs/no-element-overwrite": [2],
    "sonarjs/no-empty-collection": [2],
    "sonarjs/no-extra-arguments": [2],
    "sonarjs/no-gratuitous-expressions": [2],
    "sonarjs/no-identical-conditions": [2],
    "sonarjs/no-identical-expressions": [2],
    "sonarjs/no-identical-functions": [2, 5],
    "sonarjs/no-ignored-return": [2],
    "sonarjs/no-inverted-boolean-check": [2],
    "sonarjs/no-nested-switch": [0],
    "sonarjs/no-nested-template-literals": [0],
    "sonarjs/no-one-iteration-loop": [2],
    "sonarjs/no-redundant-boolean": [2],
    "sonarjs/no-redundant-jump": [0],
    "sonarjs/no-same-line-conditional": [2],
    "sonarjs/no-small-switch": [0],
    "sonarjs/no-unused-collection": [2],
    "sonarjs/no-use-of-empty-return-value": [2],
    "sonarjs/no-useless-catch": [2],
    "sonarjs/non-existent-operator": [2],
    "sonarjs/prefer-immediate-return": [0],
    "sonarjs/prefer-object-literal": [0],
    "sonarjs/prefer-single-boolean-return": [0],
    "sonarjs/prefer-while": [2],
    "sort-imports": [0],
    "sort-keys": [0],
    "sort-vars": [0],
    "strict": [0],
    "symbol-description": [2],
    "unicode-bom": [2, "never"],
    "unicorn/better-regex": [0],
    "unicorn/catch-error-name": [0],
    "unicorn/consistent-destructuring": [2],
    "unicorn/consistent-empty-array-spread": [2],
    "unicorn/consistent-function-scoping": [2],
    "unicorn/custom-error-definition": [0],
    "unicorn/empty-brace-spaces": [2],
    "unicorn/error-message": [0],
    "unicorn/escape-case": [0],
    "unicorn/expiring-todo-comments": [0],
    "unicorn/explicit-length-check": [0],
    "unicorn/filename-case": [0],
    "unicorn/import-index": [0],
    "unicorn/import-style": [0],
    "unicorn/new-for-builtins": [2],
    "unicorn/no-abusive-eslint-disable": [0],
    "unicorn/no-anonymous-default-export": [0],
    "unicorn/no-array-callback-reference": [0],
    "unicorn/no-array-for-each": [2],
    "unicorn/no-array-method-this-argument": [2],
    "unicorn/no-array-push-push": [2],
    "unicorn/no-array-reduce": [0],
    "unicorn/no-await-expression-member": [0],
    "unicorn/no-await-in-promise-methods": [2],
    "unicorn/no-console-spaces": [0],
    "unicorn/no-document-cookie": [2],
    "unicorn/no-empty-file": [0],
    "unicorn/no-for-loop": [0],
    "unicorn/no-hex-escape": [0],
    "unicorn/no-instanceof-array": [0],
    "unicorn/no-invalid-fetch-options": [2],
    "unicorn/no-invalid-remove-event-listener": [2],
    "unicorn/no-keyword-prefix": [0],
    "unicorn/no-lonely-if": [2],
    "unicorn/no-magic-array-flat-depth": [0],
    "unicorn/no-negated-condition": [0],
    "unicorn/no-nested-ternary": [0],
    "unicorn/no-new-array": [0],
    "unicorn/no-new-buffer": [0],
    "unicorn/no-null": [0],
    "unicorn/no-object-as-default-parameter": [0],
    "unicorn/no-process-exit": [0],
    "unicorn/no-single-promise-in-promise-methods": [2],
    "unicorn/no-static-only-class": [2],
    "unicorn/no-thenable": [0],
    "unicorn/no-this-assignment": [2],
    "unicorn/no-typeof-undefined": [2],
    "unicorn/no-unnecessary-await": [2],
    "unicorn/no-unnecessary-polyfills": [2],
    "unicorn/no-unreadable-array-destructuring": [0],
    "unicorn/no-unreadable-iife": [2],
    "unicorn/no-unused-properties": [2],
    "unicorn/no-useless-fallback-in-spread": [2],
    "unicorn/no-useless-length-check": [2],
    "unicorn/no-useless-promise-resolve-reject": [2],
    "unicorn/no-useless-spread": [2],
    "unicorn/no-useless-switch-case": [2],
    "unicorn/no-useless-undefined": [0],
    "unicorn/no-zero-fractions": [2],
    "unicorn/number-literal-case": [0],
    "unicorn/numeric-separators-style": [0],
    "unicorn/prefer-add-event-listener": [2],
    "unicorn/prefer-array-find": [2],
    "unicorn/prefer-array-flat-map": [2],
    "unicorn/prefer-array-flat": [2],
    "unicorn/prefer-array-index-of": [2],
    "unicorn/prefer-array-some": [2],
    "unicorn/prefer-at": [0],
    "unicorn/prefer-blob-reading-methods": [2],
    "unicorn/prefer-code-point": [0],
    "unicorn/prefer-date-now": [2],
    "unicorn/prefer-default-parameters": [0],
    "unicorn/prefer-dom-node-append": [2],
    "unicorn/prefer-dom-node-dataset": [0],
    "unicorn/prefer-dom-node-remove": [2],
    "unicorn/prefer-dom-node-text-content": [2],
    "unicorn/prefer-event-target": [2],
    "unicorn/prefer-export-from": [0],
    "unicorn/prefer-includes": [2],
    "unicorn/prefer-json-parse-buffer": [0],
    "unicorn/prefer-keyboard-event-key": [2],
    "unicorn/prefer-logical-operator-over-ternary": [2],
    "unicorn/prefer-math-trunc": [2],
    "unicorn/prefer-modern-dom-apis": [0],
    "unicorn/prefer-modern-math-apis": [2],
    "unicorn/prefer-module": [0],
    "unicorn/prefer-native-coercion-functions": [2],
    "unicorn/prefer-negative-index": [2],
    "unicorn/prefer-node-protocol": [2],
    "unicorn/prefer-number-properties": [0],
    "unicorn/prefer-object-from-entries": [2],
    "unicorn/prefer-object-has-own": [0],
    "unicorn/prefer-optional-catch-binding": [2],
    "unicorn/prefer-prototype-methods": [2],
    "unicorn/prefer-query-selector": [0],
    "unicorn/prefer-reflect-apply": [0],
    "unicorn/prefer-regexp-test": [2],
    "unicorn/prefer-set-has": [0],
    "unicorn/prefer-set-size": [2],
    "unicorn/prefer-spread": [0],
    "unicorn/prefer-string-raw": [0],
    "unicorn/prefer-string-replace-all": [0],
    "unicorn/prefer-string-slice": [0],
    "unicorn/prefer-string-starts-ends-with": [2],
    "unicorn/prefer-string-trim-start-end": [2],
    "unicorn/prefer-structured-clone": [2],
    "unicorn/prefer-switch": [0],
    "unicorn/prefer-ternary": [0],
    "unicorn/prefer-top-level-await": [0],
    "unicorn/prefer-type-error": [0],
    "unicorn/prevent-abbreviations": [0],
    "unicorn/relative-url-style": [2],
    "unicorn/require-array-join-separator": [2],
    "unicorn/require-number-to-fixed-digits-argument": [2],
    "unicorn/require-post-message-target-origin": [0],
    "unicorn/string-content": [0],
    "unicorn/switch-case-braces": [0],
    "unicorn/template-indent": [2],
    "unicorn/text-encoding-identifier-case": [0],
    "unicorn/throw-new-error": [2],
    "use-isnan": [2],
    "valid-typeof": [2, {"requireStringLiterals": true}],
    "vars-on-top": [0],
    "yoda": [2, "never"],
  },
};