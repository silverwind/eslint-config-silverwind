export default {
  exclude: [
    "eslint", // needs flat config
    "eslint-plugin-array-func", // needs flat config
    "eslint-plugin-vitest", // needs flat config
    "eslint-plugin-no-use-extend-native", // needs flat config
    "eslint-plugin-sonarjs", // TODO: review new rules from v2
    "@eslint/compat", // >= 1.2.0 needs eslint 9
  ],
};
