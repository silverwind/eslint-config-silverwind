export default {
  types: [
    "dependencies",
    "devDependencies",
  ],
  exclude: [
    "eslint-plugin-array-func", // needs flat config
    // "eslint-plugin-vitest", // needs flat config
    "eslint-plugin-no-use-extend-native", // needs flat config
  ],
};
