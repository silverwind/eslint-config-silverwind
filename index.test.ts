import configs from "./index.ts";

test("config", () => {
  expect(Array.isArray(configs)).toEqual(true);
});
