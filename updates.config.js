export default {
  types: [
    "dependencies",
    "devDependencies",
  ],
  exclude: [
    "eslint",
    "eslint-plugin-array-func", // needs flat config
    // "eslint-plugin-vitest", // needs flat config
    "eslint-plugin-no-use-extend-native", // needs flat config
    "@stylistic/eslint-plugin-js", // needs eslint 9
    "@stylistic/eslint-plugin-jsx", // needs eslint 9
    "@stylistic/eslint-plugin-ts", // needs eslint 9
    "eslint-plugin-unicorn" // needs flat config and eslint 9
  ],
};
