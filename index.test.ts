import configs from "./index.ts";
import eslintrc from "./dist/index.json" with {type: "json"};

test("flat", () => {
  expect(Array.isArray(configs)).toEqual(true);
  for (const config of configs) {
    expect(Array.isArray(config.files)).toEqual(true);
  }
});

test("eslintrc", () => {
  expect(Array.isArray(eslintrc.plugins)).toEqual(true);
});
