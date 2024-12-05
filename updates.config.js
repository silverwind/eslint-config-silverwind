export default {
  exclude: [
    "eslint", // needs flat config
    "eslint-plugin-array-func", // needs flat config
    "eslint-plugin-vitest", // needs flat config
    "eslint-plugin-no-use-extend-native", // needs flat config
    "@eslint/compat", // >= 1.2.0 needs eslint 9
  ],
};
