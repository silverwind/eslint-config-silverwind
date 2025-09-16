import configs from "./eslint.config.ts";

test("config", () => {
  expect(Array.isArray(configs)).toEqual(true);
});
